import { useEffect, useState } from "react";
import "../index.css";

// Kiểu NFT đơn giản
type NFTCard = {
  id: number;
  power: number;
};

export default function App() {
  const generateNFTs = (): NFTCard[] =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      power: Math.floor(Math.random() * 13) + 2,
    }));

  const [player1NFTs, setPlayer1NFTs] = useState<NFTCard[]>(generateNFTs());
  const [player2NFTs, setPlayer2NFTs] = useState<NFTCard[]>(generateNFTs());

  const [selectedP1, setSelectedP1] = useState<NFTCard[]>([]);
  const [selectedP2, setSelectedP2] = useState<NFTCard[]>([]);

  const [winner, setWinner] = useState<string | null>(null);

  const [balance, setBalance] = useState({
    player1: 50,
    player2: 50,
  });

  const getRandomFive = (nfts: NFTCard[]): NFTCard[] => {
    const shuffled = [...nfts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const calculatePowerUnit = (cards: NFTCard[]) =>
    cards.reduce((sum, card) => sum + card.power, 0) % 10;

  const playRound = () => {
    if (balance.player1 < 5 || balance.player2 < 5) {
      alert("Một trong hai người chơi không còn đủ NFT để chơi.");
      return;
    }

    const p1 = getRandomFive(player1NFTs);
    const p2 = getRandomFive(player2NFTs);

    setSelectedP1(p1);
    setSelectedP2(p2);

    const p1Score = calculatePowerUnit(p1);
    const p2Score = calculatePowerUnit(p2);

    if (p1Score > p2Score) {
      setWinner("player1");
      setBalance((prev) => ({
        player1: prev.player1 + 5,
        player2: prev.player2 - 5,
      }));
    } else if (p2Score > p1Score) {
      setWinner("player2");
      setBalance((prev) => ({
        player1: prev.player1 - 5,
        player2: prev.player2 + 5,
      }));
    } else {
      setWinner("draw");
    }
  };

  const resetGame = () => {
    setPlayer1NFTs(generateNFTs());
    setPlayer2NFTs(generateNFTs());
    setBalance({ player1: 50, player2: 50 });
    setSelectedP1([]);
    setSelectedP2([]);
    setWinner(null);
  };

  return (
    <div className="p-4 font-mono">
      <h1 className="text-2xl font-bold mb-4">🎴 DRiP War</h1>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold">
            Người chơi 1 - NFT: {balance.player1}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedP1.map((card) => (
              <div
                key={card.id}
                className="p-2 border rounded bg-blue-200 text-center w-20"
              >
                #{card.id}
                <br />({card.power})
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Người chơi 2 - NFT: {balance.player2}
          </h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedP2.map((card) => (
              <div
                key={card.id}
                className="p-2 border rounded bg-red-200 text-center w-20"
              >
                #{card.id}
                <br />({card.power})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Result + Controls */}
      <div className="mt-6 space-y-4">
        {winner && (
          <div className="text-xl">
            👉 Kết quả:{" "}
            {winner === "draw" ? "Hoà" : winner === "player1" ? "Người chơi 1 thắng" : "Người chơi 2 thắng"}
          </div>
        )}
        <div className="space-x-2">
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            onClick={playRound}
          >
            ▶️ Chơi ván mới
          </button>
          <button
            className="px-4 py-2 bg-gray-400 text-white rounded"
            onClick={resetGame}
          >
            🔁 Reset
          </button>
        </div>
      </div>
    </div>
  );
}
