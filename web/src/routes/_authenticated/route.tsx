import Navbar from "@/components/Navbar";
import useAuthTokenInfo, { queryKey } from "@/hooks/auth/useAuthTokenInfo";
import useAppStore from "@/stores/AppStore";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  beforeLoad: ({ context: { queryClient } }) => {
    void queryClient.invalidateQueries({ queryKey });
  },
});

function AuthenticatedLayout() {
  const {
    data: tokenInfo,
    isSuccess,
    isFetching,
    isError,
  } = useAuthTokenInfo();
  const setUser = useAppStore((store) => store.action.setUser);
  const reset = useAppStore((store) => store.action.reset);
  const navigate = useNavigate();

  if (!isFetching && isError) {
    reset();
    void navigate({ to: "/sign-in", replace: true });
  }

  if (isSuccess) {
    setUser(tokenInfo);
    return (
      <>
        <Navbar />
        <Outlet />
      </>
    );
  } else {
    return <Skeleton />;
  }
}

function Skeleton() {
  return <div className="skeleton-block skeleton-center"></div>;
}
