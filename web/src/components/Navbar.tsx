import brandImg from "@/assets/brand.png";
import useAppStore from "@/stores/AppStore";
import { useState } from "react";
import { FaUserTie } from "react-icons/fa6";

function Navbar() {
  const [isActive, setActive] = useState(false);
  const username = useAppStore((store) => store.username);

  const handleActive = () => setActive((prev) => !prev);

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
          <div className="navbar-item is-hidden-touch">|</div>
          <div className="navbar-item">
            <Breadcrumb />
          </div>
          <div className="navbar-item is-hidden-touch">|</div>
        </div>
        <div className="navbar-end">
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              <FaUserTie />
              &nbsp;{username}
            </a>
            <div className="navbar-dropdown">
              <span className="navbar-item">
                <button className="button is-danger is-fullwidth">
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
  const breadcrumb = useAppStore((store) => store.breadcrumb);

  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
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
  );
}

export default Navbar;
