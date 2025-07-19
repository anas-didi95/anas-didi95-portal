import Navbar from "@/components/Navbar";
import useAppStore from "@/stores/AppStore";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const setUsername = useAppStore((store) => store.action.setUsername);

  useEffect(() => {
    setUsername("Anas Juwaidi Bin Mohd Jeffry");
  }, [setUsername]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
