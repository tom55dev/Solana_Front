
import * as anchor from "@project-serum/anchor";
import {
  PublicKey,Commitment
} from "@solana/web3.js";
import { IDL } from "./idl";

export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const VAULT_SEED = "vault";


export const PROGRAM_ID = new PublicKey("7vfAZgrKyYV2e3XTKuwisXfVcdSY7vMZ7N5m6ppNMboP");


export const OLD_TOKEN = new PublicKey("Fm22RbypFLJeR3tjUKK2EGERj78PZVoNwE5wiDYqPHvN");
export const NEW_TOKEN = new PublicKey("FxiQg645pMgnyebiVS9D2h2eo5vnQPA7Au43JNm8kToU");

// export const solConnection = new anchor.web3.Connection(
//   "https://solana-mainnet.g.alchemy.com/v2/rOf-NrWf8l6Rk5aOJJ8CdqKbpLGxChQk"
// );

const commitment: Commitment = "confirmed";
  

export const solConnection = new anchor.web3.Connection(
  "https://cosmological-fabled-sheet.solana-mainnet.quiknode.pro/a0a7b0adf05e423a896ec51e2604e8a47d2fe254/", {
    commitment,
    // wsEndpoint: "wss://api.devnet.solana.com/",
  }
);

