import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <header></header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
      <TanStackRouterDevtools />
    </>
  ),
});
