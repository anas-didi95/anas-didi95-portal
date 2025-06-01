import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/sign-in")({
  component: SignInPage,
});

function SignInPage() {
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        <div className="columns container">
          <div className="column is-6 is-offset-3">
            <div className="card">
              <div className="card-header">
                <p className="card-header-title">Sign In</p>
              </div>
              <div className="card-content">
                <form>
                  <fieldset>
                    <div className="field">
                      <label className="label">Username</label>
                      <div className="control">
                        <input className="input" type="text" />
                      </div>
                    </div>
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input className="input" type="password" />
                      </div>
                    </div>
                    <br />
                    <div className="field field is-grouped is-grouped-right">
                      <div className="control">
                        <button className="button is-primary">Sign In</button>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
