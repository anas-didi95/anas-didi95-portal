import SectionContainer from "@/components/SectionContainer";
import useAppStore from "@/stores/AppStore";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useHover } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { FaUsers } from "react-icons/fa6";

export const Route = createFileRoute("/_authenticated/dashboard")({
  component: DashboardPage,
});

function DashboardPage() {
  const setNavbar = useAppStore((store) => store.action.setNavbar);
  const user = useAppStore((store) => store.user);
  const [ref, isHover] = useHover();
  const navigate = useNavigate();

  useEffect(() => {
    setNavbar(["Dashboard"], []);
  }, [setNavbar]);

  const hoverCell = isHover ? "has-text-white has-background-info" : "";
  const handleNavigate = () => void navigate({ to: "/maintenance/user" });

  return (
    <SectionContainer
      title={`Hi, ${user.name}`}
      subtitle={`Last Signed In: ${user.lastSigninDate?.toLocaleString()}`}>
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
    </SectionContainer>
  );
}
