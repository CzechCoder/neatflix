export interface Episode {
  url: string;
  image: string;
  runtime: number;
  name: string;
  description: string;
}

export const SEASON_1_DATA: Episode[] = [
  {
    url: "s01e01.mp4",
    image: "./episode_01.jpg",
    runtime: 44,
    name: "The Beginning",
    description:
      "This is where it all began and our heroes took off to their journey.",
  },
  {
    url: "s01e02.mp4",
    image: "./episode_02.jpg",
    runtime: 44,
    name: "The Midjourney",
    description: "Now that everyone found their path, they face a new danger.",
  },
  {
    url: "s01e03.mp4",
    image: "./episode_03.jpg",
    runtime: 44,
    name: "The Catharsis",
    description:
      "Our heroes overcome the immediate threat and end the first stage of their journey. But all is not finished yet.",
  },
];
