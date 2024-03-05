import React, { useState, useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";

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
      className={`w-full flex justify-end items-center px-12 py-8 z-50 fixed header-style`}
    >
      <div className="rounded-lg h-12 w-[200px] flex justify-center items-center bg-main_r">
        <WalletModalProvider>
          <WalletMultiButton className="text-white" />
        </WalletModalProvider>
      </div>
    </div>
  );
}
