import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import SimpleBar from "simplebar-react";
import { BarLoader } from "react-spinners";
import { DocumentDuplicateIcon, WalletIcon } from "@heroicons/react/24/outline";
import { errorAlert, successAlert } from "../components/ToastGroup";
import {
  depositOldTx,
  getGlobalInfo,
  getTokenBalance,
  redeem,
} from "../lib/scripts";
import { OLD_TOKEN, NEW_TOKEN } from "../lib/constant";

import { GlobalPool } from "../lib/types";

export interface NftItem {
  mint: string;
  image: string;
  staked: boolean;
  time: Date | null;
  halo: boolean;
}

const Home: NextPage = () => {
  const wallet = useWallet();
  const anchorWallet = useAnchorWallet();

  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [redeemAmount, setRedeemAmount] = useState(0);
  const [oldToken, setOldToken] = useState(OLD_TOKEN);
  const [newToken, setNewToken] = useState(NEW_TOKEN);
  const [oldTokenAmount, setOldTokenAmount] = useState("0");
  const [newTokenAmount, setNewTokenAmount] = useState("0");
  const [isDeposit, setIsDeposit] = useState(true);

  const sign = async () => {
    try {
      if (wallet.connected && anchorWallet) {
        setLoading(true);
        // let allData: GlobalPool = await getGlobalInfo(anchorWallet);

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      errorAlert(
        "An error occurred during the connection process or the user rejected it."
      );
    }
  };

  const getBalance = async () => {
    if (anchorWallet) {
      let result = await getTokenBalance(anchorWallet, oldToken, newToken);
      setOldTokenAmount(result.oldTokenBalance);
      setNewTokenAmount(result.newTokenBalance);
    }
  };

  useEffect(() => {
    if (wallet.connected !== null) {
      sign();
    }

    if (anchorWallet) {
      getBalance();
    }
    // sign();
  }, [wallet.publicKey, wallet.connected]);

  const handleTransaction = async () => {
    if (wallet.publicKey === null || !anchorWallet) {
      return;
    }

    if(isDeposit) { 
      const message = `To avoid digital dognappers, sign below to authenticate with Elementals`;
      const encodedMessage = new TextEncoder().encode(message);
      if (amount !== 0 && amount !== undefined) {
        setLoading(true);
        const conf = await depositOldTx(anchorWallet, oldToken, newToken, amount);
        if (conf) {
          successAlert("Tx successfully.");
        } else {
          errorAlert("Operation failed.");
        }
        setLoading(false);

        await getBalance();
      }} else {
        const message = `To avoid digital dognappers, sign below to authenticate with Elementals`;
        const encodedMessage = new TextEncoder().encode(message);
        if (amount !== 0 && amount !== undefined) {
          setLoading(true);
          const conf = await redeem(anchorWallet, oldToken, newToken, amount);
          if (conf) {
            successAlert("Tx successfully.");
          } else {
            errorAlert("Operation failed.");
          }
          setLoading(false);
    
          await getBalance();
        }
    }
  };


  return (
    <SimpleBar forceVisible="x" autoHide={true} className="w-full h-screen">
      <main className="z-40 w-full h-full min-h-screen bg-[#0C0B0E] text-white">
        <div className="mx-auto">
          <div className="w-full text-center py-[50px] container">
            <div className="relative flex flex-col items-center justify-start mt-32">
              {wallet.connected == true ? (
                <div className=" w-1/2 flex items-start h-fit flex-col gap-5 bg-[#121015] px-8 py-10 rounded-lg">
                  <div className="flex gap-4">
                    <button
                      className={`rounded-lg w-[100px] h-10 px-4 py-3 flex justify-center items-center ${
                        !isDeposit ? "bg-main_rb" : "bg-main_r"
                      }`}
                      onClick={() => setIsDeposit(true)}
                    >
                      Deposit
                    </button>
                    <button
                      className={`rounded-lg w-[100px] h-10 px-4 py-3 flex justify-center items-center ${
                        isDeposit ? "bg-main_rb" : "bg-main_r"
                      }`}
                      onClick={() => setIsDeposit(false)}
                    >
                      Redeem
                    </button>
                  </div>
                  <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center gap-2">
                        {isDeposit ? (
                          <>
                            <img
                              src="/img/USDEBT1.png"
                              className="rounded-full w-6 h-6 bg-[#3373BD]"
                            />
                            <span>
                              <b>USDEBT</b>(Wormhole)
                            </span>
                          </>
                        ) : (
                          <>
                            <img
                              src="/img/USDEBT2.png"
                              className="w-6 h-6 rounded-full"
                            />
                            <span>
                              <b>USDEBT</b>
                            </span>
                          </>
                        )}
                        <DocumentDuplicateIcon className="w-4 h-4 text-[#46424C]" />
                      </div>
                      <div className="flex flex-col items-end justify-center gap-2">
                        <div className="text-[#46424C]">My Balance</div>
                        <div className="flex items-center justify-center gap-1">
                          <WalletIcon className="w-4 h-4 text-[#46424C]" />
                          <span>${oldTokenAmount}</span>
                        </div>
                      </div>
                    </div>
                    <input
                      className="bg-[#0C0B0E] text-[#66626E] h-[100px] rounded-lg p-4"
                      placeholder="Enter the amount"
                      value={amount}
                      onChange={(e) => {
                        setAmount(Number(e.target.value));
                      }}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center justify-center gap-2">
                      {!isDeposit ? (
                          <>
                            <img
                              src="/img/USDEBT1.png"
                              className="rounded-full w-6 h-6 bg-[#3373BD]"
                            />
                            <span>
                              <b>USDEBT</b>(Wormhole)
                            </span>
                          </>
                        ) : (
                          <>
                            <img
                              src="/img/USDEBT2.png"
                              className="w-6 h-6 rounded-full"
                            />
                            <span>
                              <b>USDEBT</b>
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col items-end justify-center gap-2">
                        <div className="text-[#46424C]">My Balance</div>
                        <div className="flex items-center justify-center gap-1">
                          <WalletIcon className="w-4 h-4 text-[#46424C]" />
                          <span>${newTokenAmount}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="bg-gradient-to-b from-main_r to-main_rb border border-[#FF5A5A] w-full rounded-lg h-[60px] font-bold text-lg"
                    onClick={handleTransaction}
                  >
                    Deposit
                  </button>
                  <div className="flex flex-col items-start justify-center w-full gap-2">
                    <div>
                      <b>USDEBT</b>&nbsp;Solana details
                    </div>
                    <div className="flex flex-col w-full gap-2 bg-[#19171E] rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span>
                          <b>Total USDEBT</b>(Wormhole):
                        </span>
                        <b>0</b>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>
                          <b>Total USDEBT SPL minted:</b>
                        </span>
                        <b>0</b>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <span className="text-[40px] font-extrabold text-white flex flex-col w-full items-center justify-center text-outline font-IT">
                  Connect Wallet
                </span>
              )}
            </div>
          </div>
        </div>
        {loading && (
          <div
            className="fixed top-0 left-0 right-0 bottom-0 items-center justify-center bg-black flex
      bg-opacity-10 backdrop-blur-md z-[51] h-full"
          >
            <BarLoader color="black" />
          </div>
        )}
      </main>
    </SimpleBar>
  );
};

export default Home;
