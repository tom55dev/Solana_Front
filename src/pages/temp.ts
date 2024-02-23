import NodeWallet from "@coral-xyz/anchor/dist/cjs/nodewallet";

export function temp(wallet : any) {
    console.log("provider wallet ---->", wallet)
    const nodewallet = wallet as NodeWallet;
    console.log("node wallet---->", nodewallet);
}