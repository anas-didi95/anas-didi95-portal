import type { ITokenInfo } from "@/commons/types";
import { create } from "zustand";

interface IState {
  user: {
    name: string;
    lastSigninDate?: Date;
  };
  breadcrumb: string[];
}

interface IAction {
  action: {
    reset: () => void;
    setUser: (token: ITokenInfo) => void;
    setBreadcrumb: (breadcrumb: string[]) => void;
  };
}

const initialState: IState = {
  user: {
    name: "",
    lastSigninDate: undefined,
  },
  breadcrumb: [],
};

const useAppStore = create<IState & IAction>((set) => ({
  ...initialState,
  action: {
    reset: () => set(initialState),
    setUser: (token) =>
      set({
        user: {
          ...token._user,
          lastSigninDate: new Date(token._user.lastSigninDate),
        },
      }),
    setBreadcrumb: (breadcrumb) => set({ breadcrumb }),
  },
}));

export default useAppStore;
