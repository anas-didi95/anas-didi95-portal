import { createContext, useContext } from "react";
import { AuthService } from "../services/AuthService";

export const ServiceContext = createContext<{
  authService: AuthService;
} | null>(null);

export const useAuthService = () => {
  const ctx = useContext(ServiceContext);
  if (!ctx)
    throw new Error("useAuthService must be used within ServiceProvider");
  return ctx.authService;
};
