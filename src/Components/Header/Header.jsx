import React, { useEffect, useRef, useState, useContext } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BiMenu } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../Context/AuthContext";

const navLinks = [
  { path: "/home", display: "Home" },
  { path: "/doctors", display: "Find a Doctor" },
  { path: "/services", display: "Services" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, role, token, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleStickyHeader = () => {
      if (window.scrollY > 80) {
        headerRef.current?.classList.add("sticky-header");
      } else {
        headerRef.current?.classList.remove("sticky-header");
      }
    };

    window.addEventListener("scroll", handleStickyHeader);
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/home");
  };

  return (
    <header className="head py-3 bg-white shadow-sm position-relative" ref={headerRef}>
      <div className="container">
        <div className="d-flex align-items-center justify-content-between">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="Medicare Logo" style={{ height: "40px" }} />
          </Link>

          {/* Navigation Menu */}
          <nav className="d-none d-md-flex mx-auto">
            <ul className="menu d-flex align-items-center justify-content-center gap-4 list-unstyled mb-0">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? "text-primary fw-bold text-decoration-none"
                        : "text-muted fw-medium text-decoration-none"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Account Section */}
          <div className="d-flex align-items-center gap-3">
            {token ? (
              <div className="d-flex align-items-center gap-2">
                <Link to={role === "doctor" ? "/doctors/profile/me" : "/users/profile/me"}>
                  <h6 className="mb-0 fw-bold text-primary">{user?.name}</h6>
                </Link>
                <button
                  className="btn btn-outline-danger rounded-pill px-3 py-1 fw-semibold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="btn btn-primary rounded-pill px-4 py-2 fw-semibold">
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <span className="toggle d-md-none fs-1 cursor-pointer" onClick={toggleMenu}>
              {menuOpen ? <AiOutlineClose /> : <BiMenu />}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu-overlay ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
        <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
          <ul className="list-unstyled text-center">
            {navLinks.map((link, index) => (
              <li key={index} className="py-3">
                <NavLink
                  to={link.path}
                  className="text-dark fw-bold text-decoration-none fs-5"
                  onClick={toggleMenu}
                >
                  {link.display}
                </NavLink>
              </li>
            ))}
            {token && (
              <li className="py-3">
                <button
                  className="btn btn-outline-danger w-100 fw-semibold"
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
