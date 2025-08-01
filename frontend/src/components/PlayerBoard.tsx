import { NftCard } from "../lib/mockNfts";
import Card from "./Card";

export default function PlayerBoard({
  name,
  deck,
  onPlay
}: {
  name: string;
  deck: NftCard[];
  onPlay: (card: NftCard) => void;
}) {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-2">{name}</h2>
      <div className="flex gap-4 justify-center">
        {deck.map((card) => (
          <div key={card.id} onClick={() => onPlay(card)} className="cursor-pointer">
            <Card card={card} />
          </div>
        ))}
      </div>
    </div>
  );
}
    