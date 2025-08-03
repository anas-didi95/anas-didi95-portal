import brandImg from "@/assets/brand.png";
import useAuthSignOut from "@/hooks/auth/useAuthSignOut";
import useAppStore from "@/stores/AppStore";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { FaMoon, FaSun, FaUserTie } from "react-icons/fa6";
import { toast } from "react-toastify";

function Navbar() {
  const [isActive, setActive] = useState(false);
  const userName = useAppStore((store) => store.user.name);
  const reset = useAppStore((store) => store.action.reset);
  const { mutate } = useAuthSignOut();
  const navigate = useNavigate();
  const setDarkMode = useAppStore((store) => store.action.setDarkMode);
  const isDarkMode = useAppStore((store) => store.isDarkMode);

  const handleActive = () => setActive((prev) => !prev);
  const handleSignOut = () =>
    mutate(undefined, {
      onSuccess: () => {
        reset();
        toast.success("Sign Out Success");
        void navigate({ to: "/sign-in", replace: true });
      },
    });
  const handleLightMode = () => setDarkMode(false);
  const handleDarkMode = () => setDarkMode(true);

  return (
    <nav
      className="navbar is-info"
      role="navigation"
      aria-label="main navigation">
      <div className="navbar-brand">
        <span className="navbar-item">
          <img src={brandImg} width={64} />
        </span>
        <span
          role="button"
          className="navbar-burger has-text-white"
          aria-label="menu"
          aria-expanded="false"
          onClick={handleActive}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </span>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <Breadcrumb />
          <Menu />
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="tabs is-toggle is-toggle-rounded">
              <ul>
                <li className={`${isDarkMode ? "is-active" : ""}`}>
                  <a onClick={handleDarkMode}>
                    <FaMoon />
                    <span className="ml-1">Dark</span>
                  </a>
                </li>
                <li className={`${!isDarkMode ? "is-active" : ""}`}>
                  <a onClick={handleLightMode}>
                    <span className="mr-1">Light</span>
                    <FaSun />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <FaUserTie />
              &nbsp;{userName}
            </a>
            <div className="navbar-dropdown">
              <span className="navbar-item">
                <button
                  className="button is-danger is-fullwidth"
                  onClick={handleSignOut}>
                  Sign Out
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Breadcrumb() {
  const breadcrumb = useAppStore((store) => store.navbar.breadcrumb);

  return (
    <>
      <div className="navbar-item is-hidden-touch">|</div>
      <div className="navbar-item">
        <nav
          className="breadcrumb has-arrow-separator"
          aria-label="breadcrumbs">
          <ul>
            {breadcrumb.map((s, i) => (
              <li
                key={`breadcrumb${i}`}
                className={`${i === breadcrumb.length - 1 ? "is-active" : ""}`}>
                <a href="#" className="has-text-white">
                  {s}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="navbar-item is-hidden-touch">|</div>
    </>
  );
}

function Menu() {
  const menu = useAppStore((store) => store.navbar.menu);
  const navigate = useNavigate();

  return (
    <>
      {menu?.map((m, i) => (
        <a
          key={`menu${m.route}${i}`}
          className="navbar-item"
          onClick={() => void navigate({ to: m.route })}>
          {m.name}
        </a>
      ))}
    </>
  );
}

export default Navbar;
