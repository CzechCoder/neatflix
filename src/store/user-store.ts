import { create } from "zustand";
import { UserObject } from "../data/user-object";

interface Store {
  user: UserObject;
  session: "unauthorized" | "authorized";
  setUser: (data: UserObject | undefined) => void;
  setSession: (data: "unauthorized" | "authorized") => void;
  setSubscription: (data: string) => void;
  setLanguage: (data: string) => void;
  addFavoriteMovie: (
    id: number,
    title: string,
    isTVData: boolean,
    backdrop_path: string
  ) => void;
  removeFavoriteMovie: (id: number) => void;
  addThumbsUpMovie: (id: number) => void;
  removeThumbsUpMovie: (id: number) => void;
  addThumbsDownMovie: (id: number) => void;
  removeThumbsDownMovie: (id: number) => void;
  toggleFavoriteMovie: (
    id: number,
    title: string,
    isTVData: boolean,
    backdrop_path: string
  ) => void;
}

export type FavoriteMovie = {
  id: number;
  title: string;
  isTVData: boolean;
  backdrop_path: string;
};

const emptyUserObject = {
  username: "",
  email: "",
  name: "",
  subscription: "",
  subscriptionExpire: "",
  language: "",
  favoriteMovies: [],
  thumbsUpMovies: [],
  thumbsDownMovies: [],
};

const userStore = create<Store>((set, get) => ({
  user: emptyUserObject,
  session: "unauthorized",
  setUser: (data: UserObject | undefined) => {
    set(() => ({ user: data }));
  },
  setSession: (data: "unauthorized" | "authorized") => {
    set(() => ({ session: data }));
  },
  setSubscription: (data) => {
    set((state) => ({
      user: {
        ...state.user,
        subscription: data,
      },
    }));
  },
  setLanguage: (data) => {
    set((state) => ({
      user: {
        ...state.user,
        language: data,
      },
    }));
  },
  addFavoriteMovie: (
    id: number,
    title: string,
    isTVData: boolean,
    backdrop_path: string
  ) => {
    set((state) => ({
      user: {
        ...state.user,
        favoriteMovies: [
          ...state.user.favoriteMovies,
          { id, title, isTVData, backdrop_path },
        ],
      },
    }));
  },
  removeFavoriteMovie: (id: number) => {
    const state = get();
    const filteredMovies = state.user.favoriteMovies.filter(
      (movie: FavoriteMovie) => movie.id !== id
    );
    set({
      user: { ...state.user, favoriteMovies: [...filteredMovies] },
    });
  },
  addThumbsUpMovie: (id: number) => {
    set((state) => ({
      user: {
        ...state.user,
        thumbsUpMovies: [...state.user.thumbsUpMovies, id],
      },
    }));
  },
  addThumbsDownMovie: (id: number) => {
    set((state) => ({
      user: {
        ...state.user,
        thumbsDownMovies: [...state.user.thumbsDownMovies, id],
      },
    }));
  },
  removeThumbsUpMovie: (id: number) => {
    const state = get();
    const filteredMovies = state.user.thumbsUpMovies.filter(
      (movie: number) => movie !== id
    );
    set({
      user: { ...state.user, thumbsUpMovies: [...filteredMovies] },
    });
  },
  removeThumbsDownMovie: (id: number) => {
    const state = get();
    const filteredMovies = state.user.thumbsDownMovies.filter(
      (movie: number) => movie !== id
    );
    set({
      user: { ...state.user, thumbsDownMovies: [...filteredMovies] },
    });
  },
  toggleFavoriteMovie: (
    movieId: number,
    title: string,
    isTVData: boolean,
    backdrop_path: string
  ) => {
    const { addFavoriteMovie, removeFavoriteMovie, user } = get();
    const favoriteMovie = user.favoriteMovies.find(({ id }) => id === movieId);
    if (favoriteMovie) {
      removeFavoriteMovie(movieId);
      return "removed";
    }
    addFavoriteMovie(movieId, title, isTVData, backdrop_path);
    return "added";
  },
}));

export default userStore;
