import { Link, useLocation } from "react-router-dom";
import LOGO from "../../assets/images/logo/logo.png";
import { useAppSelector } from "../../store";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UserRole } from "../../utils/types";
import CurrencyDropdown from "./CurrencyDropdown.tsx";

const Header = ({ toggleCart }: { toggleCart: () => void }) => {
  const { cartCount } = useAppSelector((state) => state.cart);
  const { items } = useAppSelector((state) => state.wishlist);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isMenu, setIsMenu] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setIsMenu(!isMenu);
  };
  const isActive = (path: string) => {
    return location.pathname === path ? "active" : "";
  };

  return (
    <header className="ec-header">
      {/* Ec Header Top Start */}
      <div className="header-top">
        <div className="container">
          <div className="row align-items-center">
            {/* Header Top social Start */}
            <div className="col text-left header-top-left d-none d-lg-block">
              <div className="header-top-social">
                <span className="social-text text-upper">Follow us on:</span>
                <ul className="mb-0">
                  <li className="list-inline-item">
                    <a className="hdr-facebook" href="#">
                      <i className="ecicon eci-facebook" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="hdr-twitter" href="#">
                      <i className="ecicon eci-twitter" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="hdr-instagram" href="#">
                      <i className="ecicon eci-instagram" />
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a className="hdr-linkedin" href="#">
                      <i className="ecicon eci-linkedin" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* Header Top social End */}
            {/* Header Top Message Start */}
            <div className="col text-center header-top-center">
              <div className="header-top-message text-upper">
                <span>Free Shipping</span>This Week Order Over - $75
              </div>
            </div>
            {/* Header Top Message End */}
            {/* Header Top Currency */}
            <div className="col header-top-right d-none d-lg-block">
              <div className="header-top-lan-curr d-flex justify-content-end">
                <CurrencyDropdown />
              </div>
            </div>
            {/* Header Top Currency End */}
            {/* Header Top responsive Action */}
            <div className="col d-lg-none">
              <div className="ec-header-bottons">
                {/* Header User Start */}
                <div className="ec-header-user dropdown">
                  <button className="dropdown-toggle" data-bs-toggle="dropdown">
                    <i className="fi-rr-user" />
                  </button>
                  <ul className="dropdown-menu dropdown-menu-right">
                    {isAuthenticated ? (
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          My Account
                        </Link>
                        <Link className="dropdown-item" to="/logout">
                          Logout
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link className="dropdown-item" to="/register">
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/login">
                            Login
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                {/* Header User End */}
                {/* Header Wishlist Start */}
                <Link
                  to="/wishlist"
                  className="ec-header-btn ec-header-wishlist"
                >
                  <div className="header-icon">
                    <i className="fi-rr-heart" />
                  </div>
                  <span className="ec-header-count">{items.length}</span>
                </Link>
                {/* Header Wishlist End */}
                {/* Header Cart Start */}
                <a
                  href="#ec-side-cart"
                  className="ec-header-btn ec-side-toggle"
                  onClick={toggleCart}
                >
                  <div className="header-icon">
                    <i className="fi-rr-shopping-bag" />
                  </div>
                  <span className="ec-header-count">{cartCount}</span>
                </a>
                {/* Header Cart End */}
                {/* Header Menu Start */}
                <a
                  href="#ec-mobile-menu"
                  className="ec-header-btn ec-side-toggle d-lg-none"
                  onClick={toggleMobileMenu}
                >
                  <i className="fi fi-rr-menu-burger" />
                </a>
                {/* Header Menu End */}
              </div>
            </div>
            {/* Header Top responsive Action End */}
          </div>
        </div>
      </div>
      {/* Ec Header Top End */}

      {/* Ec Header Bottom Start */}
      <div className="ec-header-bottom d-none d-lg-block">
        <div className="container position-relative">
          <div className="row">
            <div className="ec-flex">
              {/* Ec Header Logo Start */}
              <div className="align-self-center">
                <div className="header-logo">
                  <Link to={`/`}>
                    <img src={LOGO} alt="Site Logo" />
                    <img
                      className="dark-logo"
                      src={LOGO}
                      alt="Site Logo"
                      style={{ display: "none" }}
                    />
                  </Link>
                </div>
              </div>
              {/* Ec Header Logo End */}
              {/* Ec Header Search Start */}
              <div className="align-self-center">
                <div className="header-search">
                  <form className="ec-btn-group-form" action="#">
                    <input
                      className="form-control ec-search-bar"
                      placeholder="Search products..."
                      type="text"
                    />
                    <button className="submit" type="submit">
                      <i className="fi-rr-search" />
                    </button>
                  </form>
                </div>
              </div>
              {/* Ec Header Search End */}
              {/* Ec Header Button Start */}
              <div className="align-self-center">
                <div className="ec-header-bottons">
                  {/* Header User Start */}
                  <div className="ec-header-user dropdown">
                    <button
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                    >
                      <i className="fi-rr-user" />
                    </button>
                    <ul className="dropdown-menu dropdown-menu-right">
                      {isAuthenticated ? (
                        <li>
                          {UserRole.vendor === user?.role && (
                            <Link
                              to="/vendor/dashboard"
                              className="dropdown-item"
                            >
                              Vendor Dashboard
                            </Link>
                          )}
                          <Link className="dropdown-item" to="/profile">
                            My Account
                          </Link>
                          <Link className="dropdown-item" to="/logout">
                            Logout
                          </Link>
                        </li>
                      ) : (
                        <>
                          <li>
                            <Link className="dropdown-item" to="/register">
                              Register
                            </Link>
                          </li>{" "}
                          <li>
                            <Link
                              className="dropdown-item"
                              to="/vendor-register"
                            >
                              Register as Vendor
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/login">
                              Login
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  {/* Header User End */}
                  {/* Header Wishlist Start */}
                  <Link
                    to="/wishlist"
                    className="ec-header-btn ec-header-wishlist"
                  >
                    <div className="header-icon">
                      <i className="fi-rr-heart" />
                    </div>
                    <span className="ec-header-count">{items.length}</span>
                  </Link>
                  {/* Header Wishlist End */}
                  {/* Header Cart Start */}
                  <a
                    href="#ec-side-cart"
                    className="ec-header-btn ec-side-toggle"
                    onClick={toggleCart}
                  >
                    <div className="header-icon">
                      <i className="fi-rr-shopping-bag" />
                    </div>
                    <span className="ec-header-count">{cartCount}</span>
                  </a>
                  {/* Header Cart End */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Ec Header Bottom End */}
      <div id="ec-main-menu-desk" className="d-none d-lg-block sticky-nav">
        <div className="container position-relative">
          <div className="row">
            <div className="col-md-12 align-self-center">
              <div className="ec-main-menu">
                <ul>
                  <li className={isActive("/")}>
                    <Link to={`/`}>Home</Link>
                  </li>
                  <li className={isActive("/shop")}>
                    <Link to={`/shop`}>Shop</Link>
                  </li>
                  <li className={isActive("/about")}>
                    <Link to={`/about`}>About</Link>
                  </li>
                  <li className={isActive("/contact")}>
                    <Link to={`/contact`}>Contact</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Start */}
      <AnimatePresence>
        {isMenu && (
          <>
            <motion.div
              id="ec-mobile-menu-overlay"
              className="ec-mobile-menu-overlay d-lg-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 9999,
                position: "fixed",
                top: 0,
                right: 0,
                boxShadow: "-2px 0px 5px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
              }}
              onClick={toggleMobileMenu}
            />
            <motion.div
              id="ec-mobile-menu"
              className="ec-mobile-menu d-lg-none"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                width: "290px",
                height: "100%",
                backgroundColor: "#fff",
                boxShadow: "-2px 0px 5px rgba(0, 0, 0, 0.1)",
                zIndex: 9999,
                overflowY: "auto",
                paddingTop: "0px",
              }}
            >
              <div
                className="ec-menu-title"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  WebkitBoxPack: "justify",
                  justifyContent: "space-between",
                  width: "100%",
                  padding: "10px",
                  borderBottom: "2px solid #eeeeee",
                  marginBottom: "30px 10px",
                }}
              >
                <span
                  className="menu_title"
                  style={{
                    fontSize: "18px",
                    color: "#3474d4",
                    fontFamily: '"Poppins, sans-serif"',
                    fontWeight: 600,
                  }}
                >
                  My Menu
                </span>
                <button
                  className="ec-close"
                  style={{
                    position: "relative",
                    border: "0",
                    fontSize: "30px",
                    lineHeight: 1,
                    color: "#555",
                  }}
                  onClick={toggleMobileMenu}
                >
                  ×
                </button>
              </div>

              <div className="container">
                <ul className="list-unstyled">
                  <li>
                    <Link to="/" className="text-dark p-2 d-block">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/shop" className="text-dark p-2 d-block">
                      Shop
                    </Link>
                  </li>{" "}
                  <li>
                    <Link to="/about" className="text-dark p-2 d-block">
                      About
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-dark p-2 d-block">
                      Contact
                    </Link>
                  </li>
                  {isAuthenticated ? (
                    <>
                      <li>
                        {UserRole.vendor === user?.role && (
                          <Link
                            to="/vendor/dashboard"
                            className="text-dark p-2 d-block"
                          >
                            Vendor Dashboard
                          </Link>
                        )}
                        <Link to="/profile" className="text-dark p-2 d-block">
                          My Account
                        </Link>
                      </li>
                      <li>
                        <Link to="/logout" className="text-dark p-2 d-block">
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/login" className="text-dark p-2 d-block">
                          Login
                        </Link>
                      </li>
                      <li>
                        <Link to="/register" className="text-dark p-2 d-block">
                          Register
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* Mobile Menu End */}
    </header>
  );
};

export default Header;
