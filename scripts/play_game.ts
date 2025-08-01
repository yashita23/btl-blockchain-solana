import { Program, AnchorProvider, web3 } from "@coral-xyz/anchor";
import { readFileSync } from "fs";
import { Connection, Keypair } from "@solana/web3.js";
import idl from "../anchor/target/idl/drip_war.json";

const programID = new web3.PublicKey("Drip111111111111111111111111111111111111111");

function loadKeypair(path: string): Keypair {
  const data = JSON.parse(readFileSync(path).toString());
  return Keypair.fromSecretKey(Uint8Array.from(data));
}

(async () => {
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");
  const wallet = loadKeypair("scripts/player1.json");
  const provider = new AnchorProvider(connection, { publicKey: wallet.publicKey, signTransaction: async tx => tx, signAllTransactions: async txs => txs }, {});
  const program = new Program(idl as any, programID, provider);

  const p1Cards = Array.from({ length: 5 }, () => Math.floor(Math.random() * 13 + 2));
  const p2Cards = Array.from({ length: 5 }, () => Math.floor(Math.random() * 13 + 2));

  console.log("P1 cards:", p1Cards);
  console.log("P2 cards:", p2Cards);

  const tx = await program.methods.playGame(p1Cards, p2Cards).rpc();
  console.log("Game played. Tx:", tx);
})();
