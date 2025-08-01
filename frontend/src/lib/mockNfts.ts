export interface NftCard {
  id: string;
  name: string;
  power: number;
  image: string;
}

export function generateMockDeck(): NftCard[] {
  return [
    {
      id: "card1",
      name: "Fire DRiP",
      power: 5,
      image: "https://placekitten.com/200/300"
    },
    {
      id: "card2",
      name: "Water DRiP",
      power: 3,
      image: "https://placekitten.com/200/301"
    },
    {
      id: "card3",
      name: "Earth DRiP",
      power: 4,
      image: "https://placekitten.com/200/302"
    }
  ];
}
