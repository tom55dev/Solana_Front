import * as anchor from '@project-serum/anchor';
import { PublicKey } from '@solana/web3.js'

export interface GlobalPool {
    admin: PublicKey,
    old_token: PublicKey,
    new_token: PublicKey
}

