import useAppStore from "@/stores/AppStore";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { Bounce, ToastContainer } from "react-toastify";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <AppLayout />
        <TanStackRouterDevtools position="bottom-left" />
        <ReactQueryDevtools position="right" />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </>
    ),
  },
);

function AppLayout() {
  const isDarkScheme = useMediaQuery("screen and (prefers-color-scheme: dark)");
  const isDarkMode = useAppStore((store) => store.isDarkMode);
  const setDarkMode = useAppStore((store) => store.action.setDarkMode);

  useEffect(() => {
    setDarkMode(isDarkScheme);
  }, [isDarkScheme, setDarkMode]);

  return (
    <main
      className={
        isDarkMode
          ? "has-background-black-ter theme-dark"
          : "has-background-white-ter theme-light"
      }>
      <Outlet />
    </main>
  );
}
