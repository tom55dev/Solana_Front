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
    window.addEventListener('scroll', handleScroll);
    setIsTop(true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <div className={`w-full flex justify-between items-center px-[25px] sm:px-[39px] py-[15px] z-50 fixed header-style`}>
      {/* <a href="/" className="flex flex-row w-full cursor-pointer gap-2 items-center">
        <img src="/img/logo.png" alt="Logo" className="w-[80px] h-[80px]" />
        <span className="sm:flex hidden uppercase text-text_y text-[34px] font-bold text-[#661d02]">Elementals</span>
      </a> */}
      <div className="w-[220px] flex items-center sm:pr-[35px]">
        <div className="mx-auto border border-white rounded-full bg-text_y">
          <WalletModalProvider>
            <WalletMultiButton className="text-white" />
          </WalletModalProvider>
        </div>
      </div>
    </div>
  );
}
