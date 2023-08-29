interface Card {
  title: string;
  subtitle: string;
  image: string;
  reverse?: boolean;
}

export const HOME_CARDS: Card[] = [
  {
    title: "Enjoy on your TV",
    subtitle:
      "Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.",
    image: "home-tv.jpg",
  },
  {
    title: "Download your shows to watch offline",
    subtitle: "Save your favorites easily and always have something to watch.",
    image: "home-mobile.jpg",
    reverse: true,
  },
  {
    title: "Watch everywhere",
    subtitle:
      "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    image: "home-device.jpg",
  },
  {
    title: "Create profiles for kids",
    subtitle:
      "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
    image: "home-kids.jpg",
    reverse: true,
  },
];
