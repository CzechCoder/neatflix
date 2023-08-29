interface Tier {
  title: string;
  subheader?: string;
  price: string;
  description: string[];
}

export const SUBSCRIPTION_TIERS: Tier[] = [
  {
    title: "Basic",
    price: "10",
    description: [
      "Unlimited ad-free movies, TV shows, and mobile games",
      "Watch on 1 supported device at a time",
      "Watch in HD",
      "Download on 1 supported device at a time",
    ],
  },
  {
    title: "Standard",
    subheader: "Most popular",
    price: "15",
    description: [
      "Unlimited ad-free movies, TV shows, and mobile games",
      "Watch on 2 supported devices at a time",
      "Watch in Full HD",
      "Download on 2 supported devices at a time",
      "Option to add 1 extra member who doesn't live with you",
    ],
  },
  {
    title: "Premium",
    price: "20",
    description: [
      "Unlimited ad-free movies, TV shows, and mobile games",
      "Watch on 4 supported devices at a time",
      "Watch in Ultra HD",
      "Download on 6 supported devices at a time",
      "Option to add up to 2 extra members who don't live with you",
      "Netflix spatial audio",
    ],
  },
];
