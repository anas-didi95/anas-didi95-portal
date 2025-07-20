import type { ISignInForm } from "@/commons/types";
import Button from "@/components/Button";
import ButtonGroup from "@/components/ButtonGroup";
import Card from "@/components/Card";
import Form from "@/components/Form";
import FormInput from "@/components/FormInput";
import { useAuthSignIn } from "@/hooks/auth/useAuthSignIn";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const { handleSubmit, control } = useForm<ISignInForm>();
  const navigate = useNavigate();
  const { mutate } = useAuthSignIn();

  const handleSignIn = handleSubmit((data) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Sign In Success");
        void navigate({ to: "/dashboard" });
      },
    });
  });

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="columns container">
          <div className="column is-6 is-offset-3">
            <Card label="Sign In">
              <Form onSubmit={handleSignIn}>
                <FormInput
                  label="Username"
                  type="text"
                  name="username"
                  control={control}
                  rule={{ required: true }}
                />
                <FormInput
                  label="Password"
                  type="password"
                  name="password"
                  control={control}
                  rule={{ required: true }}
                />
                <br />
                <ButtonGroup align="right">
                  <Button color="primary" type="submit" label="Sign In" />
                </ButtonGroup>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
