import { useMutation } from "@tanstack/react-query";
import type { ISignInForm } from "../../commons/types";
import { useAuthService } from "../../contexts/ServiceContext";

export const useAuthSignIn = () => {
  const authService = useAuthService();

  return useMutation({
    mutationKey: ["auth", "signIn"],
    mutationFn: (data: ISignInForm) => authService.signIn(data),
  });
};
