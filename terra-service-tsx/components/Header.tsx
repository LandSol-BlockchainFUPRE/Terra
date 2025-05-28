import React from 'react';
import { useEffect, useState } from 'react';
import {
  Koios,
  Lucid,
  LucidEvolution,
  WalletApi,
  Address,
} from '@lucid-evolution/lucid';

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

    setAddress(address);

    console.log(address);
  }

  function shortenAddress(address: string): string {
    return address.length > 12
      ? `${address.slice(0, 6)}...${address.slice(-4)}`
      : address;
  }

  const [address, setAddress] = useState<Address>('');

  return (
    <div className="w-[80%] mx-auto text-white flex justify-between items-center p-2">
      <h1 className="text-4xl font-bold">
        Terra<span className="text-blue-300">Registry</span>
      </h1>
      <div className="flex gap-4">
        <button className="py-2 px-8 bg-white text-black rounded-md">
          Sign Up
        </button>
        <button
          className="py-2 px-8 bg-blue-300 text-white rounded-md"
          onClick={() => setShowWallets(!showWallets)}
        >
          {address ? shortenAddress(address) : 'Connect Wallet'}
        </button>
        {showWallets && (
          <div className="relative bottom-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
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
  );
}

export default Header;
