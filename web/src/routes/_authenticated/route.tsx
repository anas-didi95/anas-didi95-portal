import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <>
      <p>Layout</p>
      <Outlet />
    </>
  );
}
