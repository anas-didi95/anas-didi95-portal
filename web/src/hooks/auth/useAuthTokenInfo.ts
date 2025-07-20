import { withAbort } from "@/commons/hoc/withAbort";
import { useAuthService } from "@/contexts/ServiceContext";
import { useQuery } from "@tanstack/react-query";

const useAuthTokenInfo = () => {
  const authService = useAuthService();

  return useQuery({
    queryKey: ["auth", "tokenInfo"],
    queryFn: () => withAbort((signal) => authService.tokenInfo(signal)),
  });
};

export default useAuthTokenInfo;
