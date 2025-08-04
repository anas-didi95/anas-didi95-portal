import type { IUser } from "@/commons/types";
import { convertDateTimeInput } from "@/commons/utils";
import Card from "@/components/Card";
import type { IFormFieldConfig } from "@/components/Form";
import Form from "@/components/Form";
import FormCheckbox from "@/components/FormCheckbox";
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
  const { data, isLoading } = useUserGetUser(id);
  const { control } = useForm<IUser>({
    values: data && {
      ...data,
      updateDate: convertDateTimeInput(data.updateDate),
      createDate: convertDateTimeInput(data.createDate),
    },
  });

  useEffect(() => {
    setNavbar(
      ["Maintenance", "User", data?.username ?? ""],
      [{ name: "Dashboard", route: "/dashboard" }],
    );
  }, [data?.username, setNavbar]);

  const fields: IFormFieldConfig[] = [
    {
      component: FormInput,
      label: "Username",
      name: "username",
      rule: { required: true },
      props: {
        type: "text",
      },
    },
    {
      component: FormInput,
      label: "Name",
      name: "name",
      rule: { required: true },
      props: {
        type: "text",
      },
    },
    { hidden: true },
    { component: FormCheckbox, label: "Is Disabled", name: "isDeleted" },
    { component: FormInput, label: "Update By", name: "updateBy" },
    {
      component: FormInput,
      label: "Update Date",
      name: "updateDate",
      props: { type: "datetime-local" },
    },
    { component: FormInput, label: "Version", name: "version" },
    { component: FormInput, label: "Create By", name: "createBy" },
    {
      component: FormInput,
      label: "Create Date",
      name: "createDate",
      props: { type: "datetime-local" },
    },
  ];

  return (
    <SectionContainer title="User Maintenance" subtitle={data?.name}>
      <Card label="View User">
        <Form control={control} fields={fields} isPending={isLoading} />
      </Card>
    </SectionContainer>
  );
}
