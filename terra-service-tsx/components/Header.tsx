import React from 'react';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
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
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-gray-100 transition-colors"
      >
        <span className="editable-text">Login</span>
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-gray-100 transition-colors"
      >
        <span className="editable-text">Sign Up</span>
      </motion.button>

      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onClick={() => setShowWallets(!showWallets)}
        className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-opacity-90 transition-colors"
      >
        <span className="editable-text">{address ? shortenAddress(address) : 'Connect Wallet'}</span>
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

    {/* Mobile Menu */}
    {/* <MobileMenu onSignUpClick={() => {}} onConnectWalletClick={() => {}} /> */}
  </div>
</header>
  );
}

export default Header;
