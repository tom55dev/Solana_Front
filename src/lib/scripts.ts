import * as anchor from '@project-serum/anchor';
import {
    PublicKey,
    Keypair,
    Connection,
    SystemProgram,
    SYSVAR_INSTRUCTIONS_PUBKEY,
    SYSVAR_RENT_PUBKEY,
    Transaction,
    ComputeBudgetProgram,
    ParsedAccountData
} from '@solana/web3.js';

import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { PROGRAM_ID as TOKEN_AUTH_RULES_ID } from "@metaplex-foundation/mpl-token-auth-rules";

import { METAPLEX, MPL_DEFAULT_RULE_SET, findTokenRecordPda, getATokenAccountsNeedCreate, getAssociatedTokenAccount, getMasterEdition, getMetadata } from './util';
import { GLOBAL_AUTHORITY_SEED,VAULT_SEED, PROGRAM_ID, solConnection } from './constant';
import { AnchorWallet, WalletContextState, useAnchorWallet } from '@solana/wallet-adapter-react';
import { GlobalPool } from './types';
import { IDL as GameIDL } from "./idl";

export const depositOldTx = async (
    anchorWallet: AnchorWallet,
    oldTokenMint: PublicKey,
    newTokenMint: PublicKey,
    amount: number
) => {
    if (anchorWallet.publicKey === null || anchorWallet.signTransaction == null) {
        return;
    }
    const options = anchor.AnchorProvider.defaultOptions();
    const provider = new anchor.AnchorProvider(solConnection, anchorWallet, options);

    console.log("provider", provider);
    console.log("anchor wallet",anchorWallet.publicKey)

    
    anchor.setProvider(provider);

    const programId = new PublicKey(PROGRAM_ID);

    console.log("prgram Id", programId, oldTokenMint)
    const program = new anchor.Program(GameIDL as anchor.Idl, programId, provider);
    

    const user = anchorWallet.publicKey;

    const [globalAuthority, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    // console.log("globalPool: ", globalPool.toBase58());

    
  
    const [vault, vault_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(VAULT_SEED)],
        program.programId
    );


    let oldTokenAccount = await getAssociatedTokenAccount(anchorWallet.publicKey,oldTokenMint);
    console.log("oldTokenAccount: ", oldTokenAccount.toBase58());

    console.log("admin wallet", anchorWallet.publicKey)


    let tokenTreasury = await getAssociatedTokenAccount(new PublicKey(globalAuthority), oldTokenMint);
    console.log("tokenTreasury: ", tokenTreasury.toBase58());

    console.log("token treasury", tokenTreasury)

    let newTokenAccount = await getAssociatedTokenAccount(anchorWallet.publicKey,newTokenMint);
    console.log("newTokenAccount: ", newTokenAccount.toBase58());
    
    let { instructions, destinationAccounts } = await getATokenAccountsNeedCreate(
        solConnection,
        anchorWallet.publicKey,
        anchorWallet.publicKey,
        [newTokenMint]
    );

    // console.log("length", instructions.length)
    const tokenDestination = destinationAccounts[0];

    const tx = new Transaction();
    const txId = await program.methods
    .tokenTransferMintTo(bump,new anchor.BN(amount * 1e8)).accounts({globalAuthority, user: anchorWallet.publicKey,tokenDestination, oldTokenAccount: oldTokenAccount,oldTokenMint ,newTokenMint : newTokenMint,vault,  tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")} )
    // .tokenTransferMintTo(bump, new anchor.BN(amount))
    .preInstructions(instructions)
    .transaction();

    tx.add(txId);

    tx.feePayer = user;
    const blockhash = await solConnection.getLatestBlockhash();
    tx.recentBlockhash = blockhash.blockhash;

    let confirmed_cnt = 0;

    try {

        const signedTx = await anchorWallet.signTransaction(tx)

        // Send the raw transaction
        const options = {
            commitment: "confirmed",
            skipPreflight: false,
        };

        const sTx = signedTx.serialize();

        // Confirm the transaction
        const signature = await solConnection.sendRawTransaction(sTx, options);

        const confirmed = await solConnection.confirmTransaction(
            {
                signature,
                blockhash: blockhash.blockhash,
                lastValidBlockHeight: blockhash.lastValidBlockHeight,
            }, "confirmed");

        return confirmed;
        } catch (e) {
            console.log(e);
    }
       
}




export const redeem = async (
    anchorWallet: AnchorWallet,
    oldTokenMint: PublicKey,
    newTokenMint: PublicKey,
    amount: number
) => {
    if (anchorWallet.publicKey === null || anchorWallet.signTransaction == null) {
        return;
    }
    const options = anchor.AnchorProvider.defaultOptions();
    const provider = new anchor.AnchorProvider(solConnection, anchorWallet, options);

    console.log("provider", provider);
    console.log("anchor wallet",anchorWallet.publicKey)

    
    anchor.setProvider(provider);

    const programId = new PublicKey(PROGRAM_ID);

    console.log("prgram Id", programId, oldTokenMint)
    const program = new anchor.Program(GameIDL as anchor.Idl, programId, provider);
    

    const user = anchorWallet.publicKey;

    const [globalAuthority, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    // console.log("globalPool: ", globalPool.toBase58());

    
  
    const [vault, vault_bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(VAULT_SEED)],
        program.programId
    );


    let oldTokenAccount = await getAssociatedTokenAccount(anchorWallet.publicKey,oldTokenMint);
    console.log("oldTokenAccount: ", oldTokenAccount.toBase58());

    console.log("admin wallet", anchorWallet.publicKey)


    let tokenTreasury = await getAssociatedTokenAccount(new PublicKey(globalAuthority), oldTokenMint);
    console.log("tokenTreasury: ", tokenTreasury.toBase58());

    console.log("token treasury", tokenTreasury)

    let newTokenAccount = await getAssociatedTokenAccount(anchorWallet.publicKey,newTokenMint);
    console.log("newTokenAccount: ", newTokenAccount.toBase58());
    
    let { instructions, destinationAccounts } = await getATokenAccountsNeedCreate(
        solConnection,
        anchorWallet.publicKey,
        anchorWallet.publicKey,
        [oldTokenMint]
    );

    // console.log("length", instructions.length)
    const tokenDestination = destinationAccounts[0];

    const tx = new Transaction();
    const txId = await program.methods
    .redeem(bump,new anchor.BN(amount * 1e8)).accounts({globalAuthority, user: anchorWallet.publicKey, oldTokenMint ,newTokenMint , newTokenAccount, oldTokenAccount , vault,  tokenProgram: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")} )
    // .tokenTransferMintTo(bump, new anchor.BN(amount))
    .preInstructions(instructions)
    .transaction();

    tx.add(txId);

    tx.feePayer = user;
    const blockhash = await solConnection.getLatestBlockhash();
    tx.recentBlockhash = blockhash.blockhash;

    let confirmed_cnt = 0;

    try {

        const signedTx = await anchorWallet.signTransaction(tx)

        // Send the raw transaction
        const options = {
            commitment: "confirmed",
            skipPreflight: false,
        };

        const sTx = signedTx.serialize();

        // Confirm the transaction
        const signature = await solConnection.sendRawTransaction(sTx, options);

        const confirmed = await solConnection.confirmTransaction(
            {
                signature,
                blockhash: blockhash.blockhash,
                lastValidBlockHeight: blockhash.lastValidBlockHeight,
            }, "confirmed");

        return confirmed;
        } catch (e) {
            console.log(e);
    }
       
}



export const getGlobalState = async (program: anchor.Program): Promise<GlobalPool | null> => {
    const [globalPool, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    // console.log("globalPool: ", globalPool.toBase58());

    try {
        let globalState = await program.account.globalInfo.fetch(globalPool, "confirmed");
        return globalState as unknown as GlobalPool;
    }
    catch
    {
        return null;
    }
}

export const getGlobalInfo = async (
    anchorWallet: AnchorWallet
) => {
    const provider = new anchor.AnchorProvider(solConnection, anchorWallet, anchor.AnchorProvider.defaultOptions());
    const program = new anchor.Program(GameIDL as anchor.Idl, PROGRAM_ID, provider);

    const globalPool = await getGlobalState(program);

    if (!globalPool)
        return {
            admin: "",
            old_token: "",
            new_token: ""
        };

    return {
        admin: globalPool.admin,
        old_token: globalPool.old_token,
        new_token: globalPool.new_token

    };
}

function formatNumber(number: number) {
    if (number < 1000) {
      return number.toFixed(1);
    } else if (number < 1e6) {
      return (number / 1e3).toFixed(1) + "K";
    } else if (number < 1e9) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number < 1e12) {
      return (number / 1e9).toFixed(1) + "B";
    } else {
      return (number / 1e12).toFixed(1) + "T";
    }
  }

export const getTokenBalance = async (
    anchorWallet: AnchorWallet,
    oldTokenMint: PublicKey,
    newTokenMint: PublicKey,
) => {
    let oldTokenAccount = await getAssociatedTokenAccount(anchorWallet.publicKey,new PublicKey(oldTokenMint));
    let newTokenAccount = await getAssociatedTokenAccount(anchorWallet.publicKey,new PublicKey(newTokenMint));

    const oldTokenBalance = await solConnection.getTokenAccountBalance(oldTokenAccount).then((res) => Number(res.value.amount)/(1e8)).catch((err) => 0);
    const newTokenBalance = await solConnection.getTokenAccountBalance(newTokenAccount).then((res) => Number(res.value.amount)/(1e8)).catch((err) => 0);;

    return {
        oldTokenBalance : formatNumber(oldTokenBalance) ,
        newTokenBalance: formatNumber(newTokenBalance) ,
    };
}

