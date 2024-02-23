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
import { GLOBAL_AUTHORITY_SEED, PROGRAM_ID, solConnection, TREASURY } from './constant';
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

    const provider = new anchor.AnchorProvider(solConnection, anchorWallet, anchor.AnchorProvider.defaultOptions());
    const program = new anchor.Program(GameIDL as anchor.Idl, PROGRAM_ID, provider);

    const user = anchorWallet.publicKey;

    const [globalAuthority, bump] = PublicKey.findProgramAddressSync(
        [Buffer.from(GLOBAL_AUTHORITY_SEED)],
        program.programId);
    // console.log("globalPool: ", globalPool.toBase58());

    let oldTokenAccount = await getAssociatedTokenAccount( user, oldTokenMint);
    console.log("oldTokenAccount: ", oldTokenAccount.toBase58());

    let tokenTreasury = await getAssociatedTokenAccount( TREASURY, oldTokenMint);
    console.log("tokenTreasury: ", tokenTreasury.toBase58());

    let {instructions, destinationAccounts} = await getATokenAccountsNeedCreate(solConnection, user, user, [newTokenMint]);
    const tokenDestination = destinationAccounts[0];
    console.log("tokenDestination: ", tokenDestination.toBase58());

    const oldMetadata = await solConnection.getParsedAccountInfo( oldTokenMint);

    const parsedInfo1 = oldMetadata.value.data as ParsedAccountData;
    console.log("oldMetadata.value.data.parsed.info.decimal", parsedInfo1.parsed.info.decimals);

    const newMetadata = await solConnection.getParsedAccountInfo( newTokenMint);

    const parsedInfo2 = newMetadata.value.data as ParsedAccountData;
    console.log("newMetadata.value.data.parsed.info.decimal", parsedInfo2.parsed.info.decimals);

    const tx = new Transaction();
    const txId = await program.methods
    .tokenTransferMintTo(bump, new anchor.BN(amount), parsedInfo1.parsed.info.decimals, parsedInfo2.parsed.info.decimals )
    // .tokenTransferMintTo(bump, new anchor.BN(amount))
    .accounts({
        user,
        globalAuthority,
        oldToken: oldTokenAccount,
        newToken: newTokenMint,
        tokenTreasury,
        tokenDestination,
        tokenProgram: TOKEN_PROGRAM_ID
    })
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