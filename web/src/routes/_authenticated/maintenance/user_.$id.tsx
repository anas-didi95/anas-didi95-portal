import useAppStore from "@/stores/AppStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/maintenance/user_/$id")({
  component: MaintenanceUserIdPage,
});

function MaintenanceUserIdPage() {
  const { id } = Route.useParams();
  const setNavbar = useAppStore((store) => store.action.setNavbar);

  useEffect(() => {
    setNavbar(
      ["Maintenance", "User", id],
      [{ name: "Dashboard", route: "/dashboard" }],
    );
  }, [id, setNavbar]);

  return (
    <section className="section">
      <section className="container">
        <div>MaintenanceUserIdPage</div>
      </section>
    </section>
  );
}
