import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createHashHistory,
  createRouter,
} from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { toast } from "react-toastify";
import type { IErrorResponse } from "./commons/types";
import { ServiceProvider } from "./contexts/ServiceProvider";
import { routeTree } from "./routeTree.gen";
import "./styles/app.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        const err = JSON.parse(error.message) as IErrorResponse;
        const isRetry = err.isRetry && failureCount < 3;

        if (!isRetry) {
          toast.error(err.message);
        }
        return isRetry;
      },
    },
    mutations: {
      onError: (error) => {
        const err = JSON.parse(error.message) as IErrorResponse;
        toast.error(err.message);
      },
    },
  },
});

const history = createHashHistory();
const router = createRouter({
  routeTree,
  history,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  context: {
    queryClient,
  },
});
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ServiceProvider>
        <RouterProvider router={router} />
      </ServiceProvider>
    </QueryClientProvider>
  </StrictMode>,
);
