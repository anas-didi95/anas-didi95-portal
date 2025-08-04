import type { IUser } from "@/commons/types";
import Card from "@/components/Card";
import FormInput from "@/components/FormInput";
import SectionContainer from "@/components/SectionContainer";
import useUserGetUser from "@/hooks/user/useUserGetUser";
import useAppStore from "@/stores/AppStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_authenticated/maintenance/user_/$id")({
  component: MaintenanceUserIdPage,
});

function MaintenanceUserIdPage() {
  const { id } = Route.useParams();
  const setNavbar = useAppStore((store) => store.action.setNavbar);
  const { data } = useUserGetUser(id);
  const { control } = useForm<IUser>({ values: data });

  useEffect(() => {
    setNavbar(
      ["Maintenance", "User", data?.username ?? ""],
      [{ name: "Dashboard", route: "/dashboard" }],
    );
  }, [data?.username, setNavbar]);

  return (
    <SectionContainer title="User Maintenance" subtitle={data?.name}>
      <Card label="View User">
        <form>
          <div className="fixed-grid has-3-cols has-1-cols-mobile">
            <div className="grid">
              <div className="cell mb-4">
                <FormInput
                  control={control}
                  label="Username"
                  name="username"
                  type="text"
                  rule={{ required: true }}
                />
              </div>
              <div className="cell mb-4">
                <FormInput
                  control={control}
                  label="Name"
                  name="name"
                  type="text"
                  rule={{ required: true }}
                />
              </div>
              <div className="cell mb-4 is-hidden-mobile"></div>
              <div className="cell mb-4">
                <FormInput
                  control={control}
                  label="Is Disabled"
                  name="isDeleted"
                  type="text"
                />
              </div>
              <div className="cell mb-4">
                <FormInput
                  control={control}
                  label="Update By"
                  name="updateBy"
                  type="text"
                />
              </div>
              <div className="cell mb-4">
                <FormInput
                  control={control}
                  label="Update Date"
                  name="updateBy"
                  type="text"
                />
              </div>
              <div className="cell mb-4">
                <FormInput
                  control={control}
                  label="Version"
                  name="version"
                  type="text"
                />
              </div>
              <div className="cell mb-4">
                <FormInput
                  control={control}
                  label="Create By"
                  name="createBy"
                  type="text"
                />
              </div>
              <div className="cell mb-4">
                <FormInput
                  control={control}
                  label="Create Date"
                  name="createDate"
                  type="text"
                />
              </div>
            </div>
          </div>
        </form>
      </Card>
    </SectionContainer>
  );
}
