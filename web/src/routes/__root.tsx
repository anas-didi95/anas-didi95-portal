import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Bounce, ToastContainer } from "react-toastify";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <Outlet />
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
