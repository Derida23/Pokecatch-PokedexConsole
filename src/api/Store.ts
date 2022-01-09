import create from "zustand";

interface IState {
  total: number;
  setTotal: (isCatch: number) => void;
  addTotal: () => void;
  minTotal: () => void;
}

export const useStore = create<IState>((set) => ({
  // initial state
  total: 0,

  //method
  setTotal: (isCatch) => {
    set(() => ({
      total: isCatch,
    }));
  },
  addTotal: () => {
    set((state) => ({
      total: state.total + 1,
    }));
  },
  minTotal: () => {
    set((state) => ({
      total: state.total - 1,
    }));
  },
}));
