import Table from "@/components/Table";
import useUserSearch from "@/hooks/user/useUserSearch";
import useAppStore from "@/stores/AppStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/_authenticated/maintenance/user")({
  component: MaintenanceUserPage,
});

function MaintenanceUserPage() {
  const setNavbar = useAppStore((store) => store.action.setNavbar);
  const { data } = useUserSearch();

  useEffect(() => {
    setNavbar(
      ["Maintenance", "User"],
      [{ name: "Dashboard", route: "/dashboard" }],
    );
  }, [setNavbar]);

  return (
    <section className="section">
      <section className="container">
        <h1 className="title">User Maintenance</h1>
        <br />
        <div className="box">
          <Table
            headers={["Username", "Name", "Is Disabled", "Last Sign In Date"]}
            columns={[
              { name: "username", data: "username", width: "20%" },
              { name: "name", data: "name", width: "40%" },
              { name: "isDeleted", data: "isDeleted", width: "15%" },
              { name: "lastSigninDate", data: "lastSigninDate", width: "25%" },
            ]}
            slots={{
              username: (data: string) => <a>{data}</a>,
              isDeleted: (data: boolean) => (
                <input type="checkbox" checked={data} />
              ),
              lastSigninDate: (data: string) => (
                <span>{data ? new Date(data).toLocaleString() : ""}</span>
              ),
            }}
            data={{
              resultList: data?.resultList,
              pagination: data?.pagination,
            }}
          />
        </div>
      </section>
    </section>
  );
}
