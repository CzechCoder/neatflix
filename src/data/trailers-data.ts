export interface Trailer {
  url: string;
  image: string;
  name: string;
}

export const TRAILERS_DATA: Trailer[] = [
  {
    url: "trailer_teaser.mp4",
    image: "./trailer_01.jpg",
    name: "Teaser Trailer",
  },
  {
    url: "trailer_official.mp4",
    image: "./trailer_02.jpg",
    name: "Official Trailer",
  },
  {
    url: "trailer_final.mp4",
    image: "./trailer_03.jpg",
    name: "Final Trailer",
  },
];
