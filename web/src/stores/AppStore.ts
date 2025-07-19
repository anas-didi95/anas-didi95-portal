import { create } from "zustand";

interface IState {
  username: string;
  breadcrumb: string[];
}

interface IAction {
  action: {
    setUsername: (username: string) => void;
    setBreadcrumb: (breadcrumb: string[]) => void;
  };
}

const initialState: IState = {
  username: "",
  breadcrumb: [],
};

const useAppStore = create<IState & IAction>((set) => ({
  ...initialState,
  action: {
    setUsername: (username) => set({ username }),
    setBreadcrumb: (breadcrumb) => set({ breadcrumb }),
  },
}));

export default useAppStore;
