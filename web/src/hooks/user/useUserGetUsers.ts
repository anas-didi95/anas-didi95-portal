import { withAbort } from "@/commons/hoc/withAbort";
import { useUserService } from "@/contexts/ServiceContext";
import { useQuery } from "@tanstack/react-query";

const useUserGetUsers = () => {
  const userService = useUserService();

  return useQuery({
    queryKey: ["user", "users"],
    queryFn: () => withAbort((signal) => userService.getUsers(1, 10, signal)),
  });
};

export default useUserGetUsers;
