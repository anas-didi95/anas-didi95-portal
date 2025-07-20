import useAppStore from "@/stores/AppStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const setBreadcrumb = useAppStore((store) => store.action.setBreadcrumb);

  useEffect(() => {
    setBreadcrumb(["Dashboard"]);
  }, [setBreadcrumb]);

  return (
    <section className="section">
      <section className="container">Hello world</section>
    </section>
  );
}
