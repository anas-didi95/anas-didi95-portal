import useAppStore from "@/stores/AppStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/maintenance/user")({
  component: MaintenanceUserPage,
});

function MaintenanceUserPage() {
  const setNavbar = useAppStore((store) => store.action.setNavbar);

  useEffect(() => {
    setNavbar(
      ["Maintenance", "User"],
      [{ name: "Dashboard", route: "/dashboard" }],
    );
  }, [setNavbar]);

  return (
    <section className="section">
      <section className="container">
        <h1 className="title">Hi, </h1>
        <h2 className="subtitle">Last Signed In:</h2>
      </section>
    </section>
  );
}
