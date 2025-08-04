import { withAbort } from "@/commons/hoc/withAbort";
import { useUserService } from "@/contexts/ServiceContext";
import { useQuery } from "@tanstack/react-query";

const useUserGetUser = (id: string) => {
  const userService = useUserService();

  return useQuery({
    queryKey: ["user", id],
    queryFn: () => withAbort((signal) => userService.getUser(id, signal)),
  });
};

export default useUserGetUser;
