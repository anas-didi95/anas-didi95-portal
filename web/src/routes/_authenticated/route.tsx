import Navbar from "@/components/Navbar";
import useAuthTokenInfo from "@/hooks/auth/useAuthTokenInfo";
import useAppStore from "@/stores/AppStore";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { data: tokenInfo, isSuccess } = useAuthTokenInfo();
  const setUsername = useAppStore((store) => store.action.setUsername);

  if (isSuccess) {
    setUsername(tokenInfo._user.name);
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
