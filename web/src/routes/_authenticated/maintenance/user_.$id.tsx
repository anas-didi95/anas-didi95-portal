import Card from "@/components/Card";
import SectionContainer from "@/components/SectionContainer";
import useUserGetUser from "@/hooks/user/useUserGetUser";
import useAppStore from "@/stores/AppStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/maintenance/user_/$id")({
  component: MaintenanceUserIdPage,
});

function MaintenanceUserIdPage() {
  const { id } = Route.useParams();
  const setNavbar = useAppStore((store) => store.action.setNavbar);
  const { data } = useUserGetUser(id);

  useEffect(() => {
    setNavbar(
      ["Maintenance", "User", data?.username ?? ""],
      [{ name: "Dashboard", route: "/dashboard" }],
    );
  }, [data?.username, setNavbar]);

  return (
    <SectionContainer title="User Maintenance" subtitle={data?.name}>
      <Card label="View User">
        <div>Hello world</div>
      </Card>
    </SectionContainer>
  );
}
