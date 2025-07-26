import useAppStore from "@/stores/AppStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useHover } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { FaUsers } from "react-icons/fa6";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const setBreadcrumb = useAppStore((store) => store.action.setBreadcrumb);
  const user = useAppStore((store) => store.user);
  const [ref, isHover] = useHover();
  const navigate = useNavigate();

  useEffect(() => {
    setBreadcrumb(["Dashboard"]);
  }, [setBreadcrumb]);

  const hoverCell = isHover ? "has-text-white has-background-info" : "";
  const handleNavigate = () => void navigate({ to: "/maintenance/user" });

  return (
    <section className="section">
      <section className="container">
        <h1 className="title">Hi, {user.name}</h1>
        <h2 className="subtitle">
          Last Signed In: {user.lastSigninDate?.toLocaleString()}
        </h2>
        <br />
        <div className="fixed-grid has-4-cols has-2-cols-mobile">
          <div className="grid">
            <div
              ref={ref}
              className="cell has-text-centered is-size-5 has-text-weight-semibold is-clickable"
              onClick={handleNavigate}>
              <div className={`box ${hoverCell}`}>
                <FaUsers />
                <p className="mt-1">User Maintenance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
