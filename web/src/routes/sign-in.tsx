import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import ButtonGroup from "../components/ButtonGroup";
import Card from "../components/Card";
import Form from "../components/Form";
import FormInput from "../components/FormInput";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInForm>();
  const navigate = useNavigate();

  const handleSignIn = (data: ISignInForm) => {
    console.log("[handleSignIn] data", data);
    void navigate({ to: "/dashboard" });
  };

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="columns container">
          <div className="column is-6 is-offset-3">
            <Card label="Sign In">
              <Form onSubmit={handleSubmit(handleSignIn)}>
                <FormInput
                  label="Username"
                  type="text"
                  register={register}
                  errors={errors}
                  name="username"
                  rule={{ required: true }}
                />
                <FormInput
                  label="Password"
                  type="password"
                  register={register}
                  errors={errors}
                  name="password"
                  rule={{ required: true }}
                />
                <br />
                <ButtonGroup align="right">
                  <Button color="success" type="submit" label="Sign In" />
                </ButtonGroup>
              </Form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

interface ISignInForm {
  username: string;
  password: string;
}
