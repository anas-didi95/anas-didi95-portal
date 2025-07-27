import type { ITokenInfo } from "@/commons/types";
import { create } from "zustand";

interface IState {
  user: {
    name: string;
    lastSigninDate?: Date;
  };
  breadcrumb: string[];
  isDarkMode?: boolean;
}

interface IAction {
  action: {
    reset: () => void;
    setUser: (token: ITokenInfo) => void;
    setBreadcrumb: (breadcrumb: string[]) => void;
    setDarkMode: (isDarkMode: boolean) => void;
  };
}

const initialState: IState = {
  user: {
    name: "",
    lastSigninDate: undefined,
  },
  breadcrumb: [],
  isDarkMode: undefined,
};

const useAppStore = create<IState & IAction>((set) => ({
  ...initialState,
  action: {
    reset: () =>
      set((prev) => ({ ...initialState, isDarkMode: prev.isDarkMode })),
    setUser: (token) =>
      set({
        user: {
          ...token._user,
          lastSigninDate: new Date(token._user.lastSigninDate),
        },
      }),
    setBreadcrumb: (breadcrumb) => set({ breadcrumb }),
    setDarkMode: (isDarkMode) => set({ isDarkMode }),
  },
}));

export default useAppStore;
