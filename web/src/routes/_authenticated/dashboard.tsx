import { createFileRoute } from "@tanstack/react-router";
import { useAuthTest } from "../../services/auth-service";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const test = useAuthTest();

  return (
    <div>
      <p>Authenticated Dashboard</p>;
      <button
        className="button"
        onClick={() => {
          test.mutate(undefined, { onSuccess: () => {} });
        }}>
        Test
      </button>
    </div>
  );
}
