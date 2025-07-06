import { useMutation } from "@tanstack/react-query";
import { withAbort } from "../../commons/hoc/withAbort";
import type { ISignInForm } from "../../commons/types";
import { useAuthService } from "../../contexts/ServiceContext";

export const useAuthSignIn = () => {
  const authService = useAuthService();

  return useMutation({
    mutationKey: ["auth", "signIn"],
    mutationFn: (data: ISignInForm) =>
      withAbort((signal) => authService.signIn(data, signal)),
  });
};
