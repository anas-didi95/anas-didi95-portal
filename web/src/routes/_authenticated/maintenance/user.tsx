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

  return <div>MaintenanceUserPage</div>;
}
