import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import fs from "fs";

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

export async function createPlayers() {
  const player1 = Keypair.generate();
  const player2 = Keypair.generate();

  // Airdrop some SOL for testing
  await connection.requestAirdrop(player1.publicKey, 2 * LAMPORTS_PER_SOL);
  await connection.requestAirdrop(player2.publicKey, 2 * LAMPORTS_PER_SOL);

  // Save to file
  fs.writeFileSync("scripts/player1.json", JSON.stringify([...player1.secretKey]));
  fs.writeFileSync("scripts/player2.json", JSON.stringify([...player2.secretKey]));

  console.log("Players created and funded");
}

createPlayers();
