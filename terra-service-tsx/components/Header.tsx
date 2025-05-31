'use client';
import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Koios,
  Lucid,
  LucidEvolution,
  WalletApi,
  Address,
  applyDoubleCborEncoding,
  Constr,
  Data,
  applyParamsToScript,
  MintingPolicy,
  mintingPolicyToId,
  fromText,
  toUnit,
} from '@lucid-evolution/lucid';
import { useRouter } from 'next/navigation';

const script = applyDoubleCborEncoding(
  '590190010100229800aba2aba1aba0aab9faab9eaab9dab9a488888896600264653001300800198041804800cdc3a400130080024888966002600460106ea800e266446644b300130060018acc004c034dd5004400a2c80722b300130030018acc004c034dd5004400a2c80722c805900b0992cc004c014c02cdd5003c4c9660020050018acc004c04400a2b30013003375a601a60200051323300100137586022601c6ea8018896600200314a115980099baf3012300f3754602400202b14a3133002002301300140348082294100b400500e201c14a11598009808000c4cdc39bad300c300f001480062c806900a192cc004c008c02cdd5000c52f5bded8c113756601e60186ea800500a19198008009bab300f3010301030103010300c375400844b30010018a6103d87a8000899192cc004cdc8803000c56600266e3c018006266e95200033011300f0024bd7045300103d87a80004035133004004301300340346eb8c034004c04000500e18051baa006375c601860126ea800cdc3a400516401c300800130033754011149a26cac8009',
);

const docDataUrl = '';

function Header() {
  type Wallet = {
    name: string;
    icon: string;
    apiVersion: string;
    enable(): Promise<WalletApi>;
    isEnabled(): Promise<boolean>;
  };

  function getWallets() {
    const wallets: Wallet[] = [];
    for (const c in window.cardano) {
      const wallet = window.cardano[c];
      if (wallet.apiVersion) wallets.push(wallet);
    }
    return wallets.sort((l, r) => {
      return l.name.toUpperCase() > r.name.toUpperCase() ? 1 : -1;
    });
  }

  const [showWallets, setShowWallets] = useState(false);

  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMinting, setIsMinting] = useState(false);

  const [lucid, setLucid] = useState<LucidEvolution>();

  useEffect(() => {
    Lucid(new Koios('/koios'), 'Preview').then(setLucid).catch(console.error);
  }, []);

  const wallets = getWallets();

  async function connectWallet(wallet: Wallet) {
    if (!lucid) throw 'Uninitialized Lucid';

    const api = await wallet.enable();

    lucid.selectWallet.fromAPI(api);

    const address = await lucid.wallet().address();
    if (!address || address.length === 0) {
      throw new Error('Failed to get wallet address');
    }

    setAddress(address);

    console.log(address);
  }

  function shortenAddress(address: string): string {
    return address.length > 12
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;
  }

  const [address, setAddress] = useState<Address>('');
  const router = useRouter();

  async function mint() {
    if (!lucid) throw 'Uninitialized Lucid';

    setIsMinting(true);
    setError(null);
    setTxHash(null);

    const utxos = await lucid.wallet().getUtxos();

    if (!utxos.length) throw 'Empty Wallet';

    const nonce = utxos[0];

    const outputReference = new Constr(0, [
      nonce.txHash,
      BigInt(nonce.outputIndex),
    ]);

    const cbor = Data.to(outputReference);
    const mintingScript = applyParamsToScript(script, [outputReference]);

    const mintingPolicy: MintingPolicy = {
      type: 'PlutusV3',
      script: mintingScript,
    };

    const policyID = mintingPolicyToId(mintingPolicy);

    //fetch nft metadata from api
    let apiMetadata;
    try {
      console.log(`Fetching metadata from: ${docDataUrl}`);
      const response = await fetch(docDataUrl);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API request failed: ${response.status} ${response.statusText}. Response: ${errorText}`,
        );
      }
      apiMetadata = await response.json();
      console.log('Fetched metadata:', apiMetadata);
    } catch (fetchError: any) {
      console.error('Failed to fetch or parse metadata:', fetchError);
      throw new Error(`Metadata fetch/parse error: ${fetchError.message}`);
    }

    const tokenName = 'Terra NFT';
    const assetName = fromText(tokenName);
    const token = toUnit(policyID, assetName);

    const metadataPayload = {
      [policyID]: {
        [tokenName]: {
          name: tokenName,
          image: '',
          ...apiMetadata,
        },
      },
    };

    const mintAction = new Constr(0, []);
    const redeemer = Data.to(mintAction);

    const tx = await lucid
      .newTx()
      .mintAssets({ [token]: 1n }, redeemer)
      .attach.MintingPolicy(mintingPolicy)
      .attachMetadata(721, metadataPayload)
      .complete();

    console.log('Transaction built. Signing...');
    const txSign = await tx.sign.withWallet().complete();

    console.log('Transaction signed. Submitting...');
    const submittedTxHash = await txSign.submit();

    setTxHash(submittedTxHash);
    console.log('Successfully Minted! Transaction Hash:', submittedTxHash);

    // } catch (e: any) {
    //   console.error("Minting with API metadata failed:", e);
    //   if (e.info) { // Lucid often provides more detailed info
    //     console.error("Lucid error info:", e.info);
    //     setError(`Minting error: ${e.message} - ${e.info}`);
    //   } else {
    //     setError(`Minting error: ${e.message || String(e)}`);
    //   }
    // } finally {
    //   setIsMinting(false);
    // }
  }

  return (
    <header className="sticky top-0 z-50 w-full py-4 md:py-6 px-4 md:px-8 bg-black/30 backdrop-blur-sm">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-white">
              Terra<span className="text-blue-500">Registry</span>
            </h1>
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="hidden md:flex space-x-4">
          {/* <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onClick={() => router.push('/auth/login/')}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-gray-100 transition-colors"
      >
        <span className="editable-text">Login</span>
      </motion.button> */}

          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-colors"
          >
            <span className="editable-text">Sign Up</span>
          </motion.button>
          {/* <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onClick={() => router.push('/auth/signup/')}
        className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-colors"
      >
        <span className="editable-text">Sign Up</span>
      </motion.button> */}

          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onClick={() => setShowWallets(!showWallets)}
            className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-opacity-90 transition-colors"
          >
            <span className="editable-text">
              {address ? shortenAddress(address) : 'Connect Wallet'}
            </span>
          </motion.button>
          {showWallets && (
            <div className="block bg-green-300">
              {wallets.length === 0 ? (
                <div className="p-2 text-sm text-black">No wallets found</div>
              ) : (
                wallets.map((wallet) => (
                  <button
                    key={wallet.name}
                    onClick={() => {
                      connectWallet(wallet);
                      setShowWallets(false);
                    }}
                    className="w-full px-4 py-2 text-left text-black text-sm hover:bg-gray-100"
                  >
                    {wallet.name}
                  </button>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
