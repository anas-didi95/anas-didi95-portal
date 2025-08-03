import type { ITokenInfo } from "@/commons/types";
import type { FileRoutesByTo } from "@/routeTree.gen";
import { create } from "zustand";

interface IMenu {
  name: string;
  route: keyof FileRoutesByTo;
}

interface IState {
  user: {
    name: string;
    lastSigninDate?: Date;
  };
  navbar: {
    breadcrumb: string[];
    menu: IMenu[];
  };
  isDarkMode?: boolean;
}

interface IAction {
  action: {
    reset: () => void;
    setUser: (token: ITokenInfo) => void;
    setNavbar: (breadcrumb: string[], menu: IMenu[]) => void;
    setDarkMode: (isDarkMode: boolean) => void;
  };
}

const initialState: IState = {
  user: {
    name: "",
    lastSigninDate: undefined,
  },
  navbar: {
    breadcrumb: [],
    menu: [],
  },
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
    setNavbar: (breadcrumb, menu) => set({ navbar: { breadcrumb, menu } }),
    setDarkMode: (isDarkMode) => set({ isDarkMode }),
  },
}));

export default useAppStore;
