import { useState } from "react";

import Wallet from "../components/wallet/Wallet";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
// import PageLoading from "../components/PageLoading";
import "simplebar-react/dist/simplebar.min.css";
import "../styles/globals.css";
import Footer from "../components/Footer";
import Head from "next/head";

function SimpleJackpot({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  return (
    <>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>USDEBT Solana Mint</title>
      </Head>
      <Wallet>
        <Header />
        <Component
          {...pageProps}
          startLoading={() => setLoading(true)}
          closeLoading={() => setLoading(false)}
        />
        <ToastContainer style={{ fontSize: 14 }} />
        <Footer />
      </Wallet>
    </>
  );
}

export default SimpleJackpot;
