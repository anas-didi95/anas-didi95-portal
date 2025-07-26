import useAppStore from "@/stores/AppStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const setBreadcrumb = useAppStore((store) => store.action.setBreadcrumb);
  const user = useAppStore((store) => store.user);

  useEffect(() => {
    setBreadcrumb(["Dashboard"]);
  }, [setBreadcrumb]);

  return (
    <section className="section">
      <section className="container">
        <h1 className="title">Hi, {user.name}</h1>
        <h2 className="subtitle">
          Last Signed In: {user.lastSigninDate?.toLocaleString()}
        </h2>
      </section>
    </section>
  );
}
