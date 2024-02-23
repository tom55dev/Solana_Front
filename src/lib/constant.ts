
import * as anchor from "@project-serum/anchor";
import {
  PublicKey,
} from "@solana/web3.js";
import { IDL } from "./idl";

export const GLOBAL_AUTHORITY_SEED = "global-authority";

export const PROGRAM_ID = new PublicKey("4gLzvquJn1FJJ3hGFHwWpadBSpBxWk8x7GqmvLJshiE4");

export const TREASURY = new PublicKey("5U7TwHNL6ApchXAp3mFHApd47SQnTxso6Pv8nHxfJK8E");

export const OLD_TOKEN = new PublicKey("5CY4inXAWEKDENqJ5ZLNaTYX8gzjHZNXimuj7VmFmVi6");
export const NEW_TOKEN = new PublicKey("G9wtnw3qU6QfED5sMu2XXMUYfEYufBDCQg9VLCTPBEB5");

// export const solConnection = new anchor.web3.Connection(
//   "https://solana-mainnet.g.alchemy.com/v2/rOf-NrWf8l6Rk5aOJJ8CdqKbpLGxChQk"
// );

export const solConnection = new anchor.web3.Connection(
  "https://api.devnet.solana.com"
);

