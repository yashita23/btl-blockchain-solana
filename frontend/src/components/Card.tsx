import { NftCard } from "../lib/mockNfts";

export default function Card({ card }: { card: NftCard }) {
  return (
    <div className="border rounded-xl p-2 w-40 shadow hover:scale-105 transition">
      <img src={card.image} alt={card.name} className="rounded mb-2" />
      <div className="font-bold">{card.name}</div>
      <div className="text-sm text-gray-600">Power: {card.power}</div>
    </div>
  );
}
