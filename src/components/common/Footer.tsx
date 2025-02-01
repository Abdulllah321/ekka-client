import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="ec-footer section-space-mt">
      <div className="footer-container">
        <div className="footer-offer">
          <div className="container">
            <div className="row">
              <div className="text-center footer-off-msg">
                <span>Win a contest! Get this limited-edition</span>
                <Link to="/contest">View Detail</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-top section-space-footer-p">
          <div className="container">
            <div className="row">
              <div className="col-sm-12 col-lg-3 ec-footer-contact">
                <div className="ec-footer-widget">
                  <div className="ec-footer-logo">
                    <Link to="/">
                      <img
                        src="/assets/images/logo/footer-logo.png"
                        alt="Logo"
                      />
                    </Link>
                  </div>
                  <h4 className="ec-footer-heading">Contact us</h4>
                  <div className="ec-footer-links">
                    <ul>
                      <li className="ec-footer-link">
                        71 Pilgrim Avenue Chevy Chase, East California.
                      </li>
                      <li className="ec-footer-link">
                        <span>Call Us:</span>
                        <a href="tel:+440123456789">+44 0123 456 789</a>
                      </li>
                      <li className="ec-footer-link">
                        <span>Email:</span>
                        <a href="mailto:example@ec-email.com">
                          example@ec-email.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-2 ec-footer-info">
                <div className="ec-footer-widget">
                  <h4 className="ec-footer-heading">Information</h4>
                  <ul>
                    <li>
                      <Link to="/about">About us</Link>
                    </li>
                    <li>
                      <Link to="/faq">FAQ</Link>
                    </li>
                    <li>
                      <Link to="/delivery">Delivery Information</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact us</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-12 col-lg-2 ec-footer-account">
                <div className="ec-footer-widget">
                  <h4 className="ec-footer-heading">Account</h4>
                  <ul>
                    <li>
                      <Link to="/profile">My Account</Link>
                    </li>
                    <li>
                      <Link to="/orders">Order History</Link>
                    </li>
                    <li>
                      <Link to="/wishlist">Wish List</Link>
                    </li>
                    <li>
                      <Link to="/shop">Shop</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-12 col-lg-2 ec-footer-service">
                <div className="ec-footer-widget">
                  <h4 className="ec-footer-heading">Services</h4>
                  <ul>
                    <li>
                      <Link to="/returns">Discount Returns</Link>
                    </li>
                    <li>
                      <Link to="/privacy-policy">Privacy Policy</Link>
                    </li>
                    <li>
                      <Link to="/customer-service">Customer Service</Link>
                    </li>
                    <li>
                      <Link to="/terms">Terms & Conditions</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-sm-12 col-lg-3 ec-footer-news">
                <div className="ec-footer-widget">
                  <h4 className="ec-footer-heading">Newsletter</h4>
                  <p>
                    Get instant updates about our new products and special
                    promos!
                  </p>
                  <div className="ec-subscribe-form">
                    <form>
                      <input
                        className="ec-email"
                        type="email"
                        required
                        placeholder="Enter your email here..."
                      />
                      <button className="button btn-primary" type="submit">
                        <i
                          className="ecicon eci-paper-plane-o"
                          aria-hidden="true"
                        />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="container">
            <div className="row align-items-center">
              {/* Footer social Start */}
              <div className="col text-left footer-bottom-left">
                <div className="footer-bottom-social">
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
              {/* Footer social End */}
              {/* Footer Copyright Start */}
              <div className="col text-center footer-copy">
                <div className="footer-bottom-copy ">
                  <div className="ec-copy">
                    Copyright © <span id="copyright_year" />{" "}
                    <a className="site-name text-upper" href="#">
                      Vastra<span>.</span>
                    </a>
                    . All Rights Reserved
                  </div>
                </div>
              </div>
              {/* Footer Copyright End */}
              {/* Footer payment */}
              <div className="col footer-bottom-right">
                <div className="footer-bottom-payment d-flex justify-content-end">
                  <div className="payment-link">
                    <img src="assets/images/icons/payment.png" alt="" />
                  </div>
                </div>
              </div>
              {/* Footer payment */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
