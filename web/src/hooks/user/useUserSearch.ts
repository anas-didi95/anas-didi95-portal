import { withAbort } from "@/commons/hoc/withAbort";
import { useUserService } from "@/contexts/ServiceContext";
import { useQuery } from "@tanstack/react-query";

const useUserSearch = () => {
  const userService = useUserService();

  return useQuery({
    queryKey: ["user", "search"],
    queryFn: () => withAbort((signal) => userService.search(1, 10, signal)),
  });
};

export default useUserSearch;
