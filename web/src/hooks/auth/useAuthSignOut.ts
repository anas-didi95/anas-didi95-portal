import { useMutation } from "@tanstack/react-query";
import { withAbort } from "../../commons/hoc/withAbort";
import { useAuthService } from "../../contexts/ServiceContext";

const useAuthSignOut = () => {
  const authService = useAuthService();

  return useMutation({
    mutationKey: ["auth", "signOut"],
    mutationFn: () => withAbort((signal) => authService.signOut(signal)),
  });
};

export default useAuthSignOut;
