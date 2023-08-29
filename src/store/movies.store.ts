import { create } from "zustand";

interface Store {
  openedRow: string;
  setOpenedRow: (data: string) => void;
}

const moviesStore = create<Store>((set) => ({
  openedRow: "",
  setOpenedRow: (data: string) => {
    set(() => ({ openedRow: data }));
  },
}));

export default moviesStore;
