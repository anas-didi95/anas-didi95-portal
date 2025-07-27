import useAppStore from "@/stores/AppStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/maintenance/user")({
  component: MaintenanceUserPage,
});

function MaintenanceUserPage() {
  const setBreadcrumb = useAppStore((store) => store.action.setBreadcrumb);

  useEffect(() => {
    setBreadcrumb(["Maintenance", "User"]);
  }, [setBreadcrumb]);

  return (
    <section className="section">
      <section className="container">
        <h1 className="title">Hi, </h1>
        <h2 className="subtitle">Last Signed In:</h2>
      </section>
    </section>
  );
}
