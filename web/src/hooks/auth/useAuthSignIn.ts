import { withAbort } from "@/commons/hoc/withAbort";
import type { ISignInForm } from "@/commons/types";
import { useAuthService } from "@/contexts/ServiceContext";
import { useMutation } from "@tanstack/react-query";

const useAuthSignIn = () => {
  const authService = useAuthService();

  return useMutation({
    mutationKey: ["auth", "signIn"],
    mutationFn: (data: ISignInForm) =>
      withAbort((signal) => authService.signIn(data, signal)),
  });
};

export default useAuthSignIn;
