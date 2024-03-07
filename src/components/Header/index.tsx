import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import Link from "next/link";

export default function Header() {
  const [isTop, setIsTop] = useState(false);

  const wallet = useWallet();
  const handleScroll = () => {
    console.log(window.scrollY);
    if (window.scrollY > 0) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    setIsTop(true);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      className={`w-full flex justify-between items-center px-12 py-8 z-50 header-style gap-4 text-white fixed`}
    >
      <div className="flex gap-4 text-white pl-4">
        <Link href="/">Home</Link>
        <a
          href="https://portalbridge.com/advanced-tools/#/transfer"
          target="_blank"
        >
          Bridge
        </a>
      </div>
      <div className="rounded-lg h-12 w-[200px] flex justify-center items-center bg-main_r">
        <WalletModalProvider>
          <WalletMultiButton className="text-white" />
        </WalletModalProvider>
      </div>
    </div>
  );
}
