import { FavoriteMovie } from "../store/user-store";

export interface UserObject {
  username: string;
  email: string;
  name: string;
  subscription: string;
  subscriptionExpire: string;
  language: string;
  favoriteMovies: FavoriteMovie[];
  thumbsUpMovies: number[];
  thumbsDownMovies: number[];
}

export const userObject: UserObject = {
  username: "johnny_test",
  email: "john@gmail.com",
  name: "John Tester",
  subscription: "Standard",
  subscriptionExpire: "03/04/2025",
  language: "English",
  favoriteMovies: [],
  thumbsUpMovies: [],
  thumbsDownMovies: [],
};
