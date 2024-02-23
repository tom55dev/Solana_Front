import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import SimpleBar from "simplebar-react";
import { BarLoader } from "react-spinners";
import { errorAlert, successAlert } from "../components/ToastGroup";
import { depositOldTx, getGlobalInfo, getTokenBalance, redeem } from "../lib/scripts";
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

  const getBalance = async() => {    
    if(anchorWallet)
     {   let result =  await getTokenBalance(anchorWallet, oldToken, newToken);
          setOldTokenAmount(result.oldTokenBalance);
          setNewTokenAmount(result.newTokenBalance);
      }
  }

  useEffect( () => {
    if (wallet.connected !== null) {
      sign();
    }

    if(anchorWallet)
     { 
      getBalance(); 
     }
    // sign();
  }, [wallet.publicKey, wallet.connected]);

  const depositBtn = async () => {
    if (wallet.publicKey === null || !anchorWallet) {
      return;
    }
    const message = `To avoid digital dognappers, sign below to authenticate with Elementals`;
    const encodedMessage = new TextEncoder().encode(message);
    if (amount !== 0 && amount !== undefined) {
      setLoading(true);
      const conf = await depositOldTx(
        anchorWallet,
        oldToken,
        newToken,
        amount
      );
      if (conf) {
        successAlert("Tx successfully.");
      } else {
        errorAlert("Operation failed.");
      }
      setLoading(false);

      await getBalance();
    }
  };

  const handleRedeem = async () => {
    if (wallet.publicKey === null || !anchorWallet) {
      return;
    }
    const message = `To avoid digital dognappers, sign below to authenticate with Elementals`;
    const encodedMessage = new TextEncoder().encode(message);
    if (amount !== 0 && amount !== undefined) {
      setLoading(true);
      const conf = await redeem(
        anchorWallet,
        oldToken,
        newToken,
        amount
      );
      if (conf) {
        successAlert("Tx successfully.");
      } else {
        errorAlert("Operation failed.");
      }
      setLoading(false);

      await getBalance();
    }
  };

  return (
    <SimpleBar forceVisible="x" autoHide={true} className="w-full h-screen">
      <main className="z-40 w-full h-full min-h-screen bg-[url(/img/bg.jpg)] bg-cover">
        <div className="mx-auto">
          <div className="w-full text-center py-[50px] container">
            <div className="relative flex flex-col items-center justify-start mt-32">
              {wallet.connected == true ? (
                <div className=" w-full flex  items-center h-screen flex-col gap-5">
                  {/* <ClaimTag nftDatas={allNfts} totalStakedNFT={totalStakedNFT} setLoading={setLoading} />
                  <StakingTable nftDatas={allNfts} sign={() => sign()} setLoading={setLoading} /> */}
                  <div className="flex w-full flex-row gap-4 justify-center text-[20px]">
                    <span>{`Old Token: ${oldToken}`}</span>
                    <span>{`New Token: ${newToken}`}</span>
                  </div>
                  <div className="flex w-full flex-row gap-4 justify-center text-[20px]">
                    <span>{`Old Token Amount: ${oldTokenAmount}`}</span>
                    <span>{`New Token Amount: ${newTokenAmount}`}</span>
                  </div>
                  <input
                    type="text"
                    className="w-[250px] h-[40px]"
                    value={amount}
                    onChange={(e) => {
                      setAmount(
                        Number(e.target.value)
                      );
                    }}
                  />
                  <div
                    onClick={() => {
                      depositBtn();
                    }}
                    className="font-bold mx-auto w-[300px] h-[50px] items-center justify-center flex flex-col bg-text_y text-white py-1 px-10 text-[18px] rounded-full cursor-pointer font-IT hover:bg-[#661d02]"
                  >
                    Deposit and Receive
                  </div>
                  <input
                    type="text"
                    className="w-[250px] h-[40px]"
                    value={redeemAmount}
                    onChange={(e) => {
                      setRedeemAmount(
                        Number(e.target.value)
                      );
                    }}
                  />
                  <div
                    onClick={handleRedeem}
                    className="font-bold mx-auto w-[300px] h-[50px] items-center justify-center flex flex-col bg-text_y text-white py-1 px-10 text-[18px] rounded-full cursor-pointer font-IT hover:bg-[#661d02]"
                  >
                    Redeem
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
