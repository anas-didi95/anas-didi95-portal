import type { IUser } from "@/commons/types";
import { convertDateTimeInput } from "@/commons/utils";
import ButtonGroup, { type IButton } from "@/components/ButtonGroup";
import Card from "@/components/Card";
import FieldCheckbox from "@/components/FieldCheckbox";
import FieldDateTime from "@/components/FieldDateTime";
import FieldText from "@/components/FieldText";
import type { IFormFieldConfig } from "@/components/Form";
import Form from "@/components/Form";
import SectionContainer from "@/components/SectionContainer";
import useUserGetUser from "@/hooks/user/useUserGetUser";
import useAppStore from "@/stores/AppStore";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const Route = createFileRoute("/_authenticated/maintenance/user_/$id")({
  component: MaintenanceUserIdPage,
});

function MaintenanceUserIdPage() {
  const { id } = Route.useParams();
  const setNavbar = useAppStore((store) => store.action.setNavbar);
  const { data, isLoading } = useUserGetUser(id);
  const [isEdit, setEdit] = useState(false);
  const { control, reset } = useForm<IUser>({
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

  const handleEdit = () => setEdit((prev) => !prev);
  const handleCancel = () => {
    setEdit((prev) => !prev);
    reset();
  };
  const fields = prepareFields(isEdit);
  const buttons = prepareButtons(isEdit, handleEdit, handleCancel);

  return (
    <SectionContainer title="User Maintenance" subtitle={data?.name}>
      <Card label={`${isEdit ? "Edit" : "View"} User`}>
        <Form control={control} fields={fields} isPending={isLoading} />
        <br />
        <ButtonGroup align="right" buttons={buttons} />
      </Card>
    </SectionContainer>
  );
}

const prepareFields = (isEdit: boolean): IFormFieldConfig[] => [
  {
    component: FieldText,
    label: "Username",
    name: "username",
    rule: { required: true },
    isEdit,
  },
  {
    component: FieldText,
    label: "Name",
    name: "name",
    rule: { required: true },
    isEdit,
  },
  { hidden: true },
  {
    component: FieldCheckbox,
    label: "Is Disabled",
    name: "isDeleted",
    isEdit,
  },
  { component: FieldText, label: "Update By", name: "updateBy", isEdit },
  {
    component: FieldDateTime,
    label: "Update Date",
    name: "updateDate",
    isEdit,
  },
  { component: FieldText, label: "Version", name: "version", isEdit },
  { component: FieldText, label: "Create By", name: "createBy", isEdit },
  {
    component: FieldDateTime,
    label: "Create Date",
    name: "createDate",
    isEdit,
  },
];

const prepareButtons = (
  isEdit: boolean,
  handleEdit: () => void,
  handleCancel: () => void,
): IButton[] =>
  isEdit
    ? [
        {
          type: "reset",
          color: "warning",
          label: "Cancel",
          onClick: handleCancel,
        },
      ]
    : [
        {
          type: "button",
          color: "primary",
          label: "Edit",
          onClick: handleEdit,
        },
      ];
