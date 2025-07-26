import { withAbort } from "@/commons/hoc/withAbort";
import { useAuthService } from "@/contexts/ServiceContext";
import { useQuery } from "@tanstack/react-query";

export const queryKey = ["auth", "tokenInfo"];

const useAuthTokenInfo = () => {
  const authService = useAuthService();

  return useQuery({
    queryKey: queryKey,
    queryFn: () => withAbort((signal) => authService.tokenInfo(signal)),
  });
};

export default useAuthTokenInfo;
