import Navbar from "@/components/Navbar";
import useAuthTokenInfo from "@/hooks/auth/useAuthTokenInfo";
import useAppStore from "@/stores/AppStore";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const {
    data: tokenInfo,
    isSuccess,
    isFetching,
    isError,
  } = useAuthTokenInfo();
  const setUsername = useAppStore((store) => store.action.setUsername);
  const reset = useAppStore((store) => store.action.reset);
  const navigate = useNavigate();

  if (!isFetching && isError) {
    reset();
    void navigate({ to: "/sign-in", replace: true });
  }

  if (isSuccess) {
    setUsername(tokenInfo._user.name);
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
