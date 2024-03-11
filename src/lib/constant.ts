import * as anchor from "@project-serum/anchor";
import { PublicKey, Commitment } from "@solana/web3.js";
import { IDL } from "./idl";

export const GLOBAL_AUTHORITY_SEED = "global-authority";
export const VAULT_SEED = "vault";

export const PROGRAM_ID = new PublicKey(
  "HC1N8TUkT4AcGKTbfHBwu1E6VdXifHLAb6mCCxpHUKt3"
);

export const OLD_TOKEN = new PublicKey(
  "Fm22RbypFLJeR3tjUKK2EGERj78PZVoNwE5wiDYqPHvN"
);
export const NEW_TOKEN = new PublicKey(
  "5gAfJFu2nDUjceQJ4uKnkNEN94xEiF6JW3XyaEdyFd9p"
);

// export const solConnection = new anchor.web3.Connection(
//   "https://solana-mainnet.g.alchemy.com/v2/rOf-NrWf8l6Rk5aOJJ8CdqKbpLGxChQk"
// );

const commitment: Commitment = "confirmed";

export const solConnection = new anchor.web3.Connection(
  "https://muddy-white-cloud.solana-mainnet.quiknode.pro/f8d48034d6daea037245a3b685a96cff9f4e9c83/",
  {
    commitment,
    // wsEndpoint: "wss://api.devnet.solana.com/",
  }
);
