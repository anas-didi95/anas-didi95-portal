import type { AuthService } from "@/services/AuthService";
import type { UserService } from "@/services/UserService";
import { createContext, useContext } from "react";

export const ServiceContext = createContext<{
  authService: AuthService;
  userService: UserService;
} | null>(null);

export const useAuthService = () => {
  const ctx = useContext(ServiceContext);
  if (!ctx)
    throw new Error("useAuthService must be used within ServiceProvider");
  return ctx.authService;
};

export const useUserService = () => {
  const ctx = useContext(ServiceContext);
  if (!ctx)
    throw new Error("useUserService must be used within ServiceProvider");
  return ctx.userService;
};
