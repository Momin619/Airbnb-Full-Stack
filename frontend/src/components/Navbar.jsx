import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../store/UserStore";

import api from "../api/api";
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  // const navigate = useNavigate();
  const { user, isLoggedIn, setUser, setIsLoggedIn } = useUser();
  // console.log("user is", user);
  const userType = user?.userType || "";
  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setUser(null);
      setIsLoggedIn(false);
      window.location.href = "/login";
    } catch (error) {
      console.log(`Logout failed : ${error}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-red-400">
              Airbnb
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {isLoggedIn ? (
              user.userType === "guest" ? (
                <>
                  <NavLink to="/home" label="Home" active={isActive("/home")} />
                  <NavLink
                    to="/bookings"
                    label="Bookings"
                    active={isActive("/bookings")}
                  />
                  <NavLink
                    to="/favourites"
                    label="Favourites"
                    active={isActive("/favourites")}
                  />
                  <button
                    className="cursor-pointer text-white text-center capitalize transition rounded  bg-red-500 p-2"
                    onClick={handleLogout}
                  >
                    logout
                  </button>
                </>
              ) : user.userType === "host" ? (
                <>
                  <NavLink
                    to="/host/home"
                    label="Host Home"
                    active={isActive("/host/home")}
                  />
                  <NavLink
                    to="/host/add-home"
                    label="Add Home"
                    active={isActive("/host/add-home")}
                  />
                  <button
                    className="cursor-pointer text-white text-center capitalize transition rounded  bg-red-500 p-2"
                    onClick={handleLogout}
                  >
                    logout
                  </button>
                </>
              ) : null
            ) : (
              <>
                <NavLink
                  to="/signup"
                  label="Sign Up"
                  active={isActive("/signup")}
                />
                <NavLink
                  to="/login"
                  label="Login"
                  active={isActive("/login")}
                />
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 pb-4 space-y-2">
          {isLoggedIn ? (
            userType === "guest" ? (
              <>
                <MobileLink to="/home" label="Home" onClick={closeMenu} />
                <MobileLink
                  to="/bookings"
                  label="Bookings"
                  onClick={closeMenu}
                />
                <MobileLink
                  to="/favourites"
                  label="Favourites"
                  onClick={closeMenu}
                />
                <button
                  onClick={handleLogout}
                  className="block py-2 text-gray-700 hover:text-blue-500"
                >
                  Logout
                </button>
              </>
            ) : userType === "host" ? (
              <>
                <MobileLink
                  to="/host/home"
                  label="Host Home"
                  onClick={closeMenu}
                />
                <MobileLink
                  to="/host/add-home"
                  label="Add Home"
                  onClick={closeMenu}
                />
                <button
                  onClick={handleLogout}
                  className="block py-2 text-gray-700 hover:text-blue-500"
                >
                  Logout
                </button>
              </>
            ) : null
          ) : (
            <>
              <MobileLink to="/signup" label="Sign Up" onClick={closeMenu} />
              <MobileLink to="/login" label="Login" onClick={closeMenu} />
              <button className="cursor-pointer text-white text-center capitalize transition rounded  bg-red-500 p-2">
                logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, label, active }) => (
  <Link
    to={to}
    className={`${
      active ? "text-blue-600 font-semibold" : "text-gray-700"
    } hover:text-blue-500 transition`}
  >
    {label}
  </Link>
);

const MobileLink = ({ to, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block py-2 text-gray-700 hover:text-blue-500"
  >
    {label}
  </Link>
);

export default Navbar;
