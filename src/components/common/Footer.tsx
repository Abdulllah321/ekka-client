
const Footer = () => {
  return (
    <footer className="ec-footer section-space-mt">
      <div className="footer-container">
        <div className="footer-offer">
          <div className="container">
            <div className="row">
              <div className="text-center footer-off-msg">
                <span>Win a contest! Get this limited-editon</span>
                <a href="#" target="_blank">
                  View Detail
                </a>
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
                    <a href="#">
                      <img src="assets/images/logo/footer-logo.png" alt="" />
                      <img
                        className="dark-footer-logo"
                        src="assets/images/logo/dark-logo.png"
                        alt="Site Logo"
                        style={{ display: "none" }}
                      />
                    </a>
                  </div>
                  <h4 className="ec-footer-heading">Contact us</h4>
                  <div className="ec-footer-links">
                    <ul className="align-items-center">
                      <li className="ec-footer-link">
                        71 Pilgrim Avenue Chevy Chase, east california.
                      </li>
                      <li className="ec-footer-link">
                        <span>Call Us:</span>
                        <a href="tel:+440123456789">+44 0123 456 789</a>
                      </li>
                      <li className="ec-footer-link">
                        <span>Email:</span>
                        <a href="mailto:example@ec-email.com">
                          +example@ec-email.com
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-2 ec-footer-info">
                <div className="ec-footer-widget">
                  <h4 className="ec-footer-heading">Information</h4>
                  <div className="ec-footer-links">
                    <ul className="align-items-center">
                      <li className="ec-footer-link">
                        <a href="about-us.html">About us</a>
                      </li>
                      <li className="ec-footer-link">
                        <a href="faq.html">FAQ</a>
                      </li>
                      <li className="ec-footer-link">
                        <a href="track-order.html">Delivery Information</a>
                      </li>
                      <li className="ec-footer-link">
                        <a href="contact-us.html">Contact us</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-2 ec-footer-account">
                <div className="ec-footer-widget">
                  <h4 className="ec-footer-heading">Account</h4>
                  <div className="ec-footer-links">
                    <ul className="align-items-center">
                      <li className="ec-footer-link">
                        <a href="user-profile.html">My Account</a>
                      </li>
                      <li className="ec-footer-link">
                        <a href="track-order.html">Order History</a>
                      </li>
                      <li className="ec-footer-link">
                        <a href="wishlist.html">Wish List</a>
                      </li>
                      <li className="ec-footer-link">
                        <a href="offer.html">Specials</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-2 ec-footer-service">
                <div className="ec-footer-widget">
                  <h4 className="ec-footer-heading">Services</h4>
                  <div className="ec-footer-links">
                    <ul className="align-items-center">
                      <li className="ec-footer-link">
                        <a href="track-order.html">Discount Returns</a>
                      </li>
                      <li className="ec-footer-link">
                        <a href="privacy-policy.html">Policy &amp; policy </a>
                      </li>
                      <li className="ec-footer-link">
                        <a href="terms-condition.html">Customer Service</a>
                      </li>
                      <li className="ec-footer-link">
                        <a href="terms-condition.html">Term &amp; condition</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-lg-3 ec-footer-news">
                <div className="ec-footer-widget">
                  <h4 className="ec-footer-heading">Newsletter</h4>
                  <div className="ec-footer-links">
                    <ul className="align-items-center">
                      <li className="ec-footer-link">
                        Get instant updates about our new products and special
                        promos!
                      </li>
                    </ul>
                    <div className="ec-subscribe-form">
                      <form
                        id="ec-newsletter-form"
                        name="ec-newsletter-form"
                        method="post"
                        action="#"
                      >
                        <div id="ec_news_signup" className="ec-form">
                          <input
                            className="ec-email"
                            type="email"
                            required
                            placeholder="Enter your email here..."
                            name="ec-email"
                            defaultValue=""
                          />
                          <button
                            id="ec-news-btn"
                            className="button btn-primary"
                            type="submit"
                            name="subscribe"
                            value=""
                          >
                            <i
                              className="ecicon eci-paper-plane-o"
                              aria-hidden="true"
                            />
                          </button>
                        </div>
                      </form>
                    </div>
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
                      ekka<span>.</span>
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
}

export default Footer