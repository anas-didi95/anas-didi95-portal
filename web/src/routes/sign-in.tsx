import type { ISignInForm } from "@/commons/types";
import Button from "@/components/Button";
import ButtonGroup from "@/components/ButtonGroup";
import Card from "@/components/Card";
import FieldPassword from "@/components/FieldPassword";
import FieldText from "@/components/FieldText";
import Form, { type IFormFieldConfig } from "@/components/Form";
import useAuthSignIn from "@/hooks/auth/useAuthSignIn";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const navigate = useNavigate();
  const { mutate, isPending } = useAuthSignIn();

  const handleSignIn = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Sign In Success");
        void navigate({ to: "/dashboard" });
      },
    });
  });

  const fields: IFormFieldConfig[] = [
    {
      component: FieldText,
      label: "Username",
      name: "username",
      rule: { required: true },
    },
    {
      component: FieldPassword,
      label: "Password",
      name: "password",
      rule: { required: true },
    },
  ];

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="columns container">
          <div className="column is-6 is-offset-3">
            <Card label="Sign In">
              <Form
                control={control}
                fields={fields}
                cols={{ default: 1, mobile: 1 }}
                isPending={isPending}
                onSubmit={handleSignIn}>
                <br />
                <ButtonGroup align="right">
                  <Button
                    color="primary"
                    type="submit"
                    label="Sign In"
                    isLoading={isPending}
                  />
                </ButtonGroup>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
