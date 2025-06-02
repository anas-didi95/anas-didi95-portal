import { createFileRoute } from "@tanstack/react-router";
import Button from "../components/Button";
import ButtonGroup from "../components/ButtonGroup";
import Card from "../components/Card";
import Form from "../components/Form";
import FormInput from "../components/FormInput";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="columns container">
          <div className="column is-6 is-offset-3">
            <Card label="Sign In">
              <Form>
                <FormInput label="Username" type="text" />
                <FormInput label="Password" type="password" />
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
