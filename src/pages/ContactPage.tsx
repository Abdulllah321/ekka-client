import Layout from "../components/common/Layout.tsx";

const ContactUs = () => {
    return (
        <Layout>
            <div className="sticky-header-next-sec ec-breadcrumb section-space-mb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row ec_breadcrumb_inner">
                                <div className="col-md-6 col-sm-12">
                                    <h2 className="ec-breadcrumb-title">Contact Us</h2>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <ul className="ec-breadcrumb-list">
                                        <li className="ec-breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="ec-breadcrumb-item active">Contact Us</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="ec-common-wrapper">
                            <div className="ec-contact-leftside">
                                <div className="ec-contact-container">
                                    <div className="ec-contact-form">
                                        <form action="#" method="post">
                      <span className="ec-contact-wrap">
                        <label>First Name*</label>
                        <input
                            type="text"
                            name="firstname"
                            placeholder="Enter your first name"
                            required
                        />
                      </span>
                                            <span className="ec-contact-wrap">
                        <label>Last Name*</label>
                        <input
                            type="text"
                            name="lastname"
                            placeholder="Enter your last name"
                            required
                        />
                      </span>
                                            <span className="ec-contact-wrap">
                        <label>Email*</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email address"
                            required
                        />
                      </span>
                                            <span className="ec-contact-wrap">
                        <label>Phone Number*</label>
                        <input
                            type="text"
                            name="phonenumber"
                            placeholder="Enter your phone number"
                            required
                        />
                      </span>
                                            <span className="ec-contact-wrap">
                        <label>Comments/Questions*</label>
                        <textarea
                            name="address"
                            placeholder="Please leave your comments here.."
                        ></textarea>
                      </span>
                                            <span className="ec-contact-wrap ec-recaptcha">
                        <span
                            className="g-recaptcha"
                            data-sitekey="your-site-key"
                            data-callback="verifyRecaptchaCallback"
                            data-expired-callback="expiredRecaptchaCallback"
                        ></span>
                        <input
                            className="form-control d-none"
                            data-recaptcha="true"
                            required
                            data-error="Please complete the Captcha"
                        />
                        <span className="help-block with-errors"></span>
                      </span>
                                            <span className="ec-contact-wrap ec-contact-btn">
                        <button className="btn btn-primary" type="submit">
                          Submit
                        </button>
                      </span>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="ec-contact-rightside">
                                <div className="ec_contact_map">
                                    <div className="ec_map_canvas">
                                        <iframe
                                            id="ec_map_canvas"
                                            src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d71263.65594328841!2d144.93151478652146!3d-37.8734290780509!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1615963387757!5m2!1sen!2sus"
                                        ></iframe>
                                        <a href="https://sites.google.com/view/maps-api-v2/mapv2"></a>
                                    </div>
                                </div>
                                <div className="ec_contact_info">
                                    <h1 className="ec_contact_info_head">Contact Us</h1>
                                    <ul className="align-items-center">
                                        <li className="ec-contact-item">
                                            <i className="ecicon eci-map-marker" aria-hidden="true"></i>
                                            <span>Address:</span> 123 Fashion Street, New York, NY 10001, USA
                                        </li>
                                        <li className="ec-contact-item align-items-center">
                                            <i className="ecicon eci-phone" aria-hidden="true"></i>
                                            <span>Call Us:</span>
                                            <a href="tel:+919121388997">+91 91213 88997 </a>
                                        </li>
                                        <li className="ec-contact-item align-items-center">
                                            <i className="ecicon eci-envelope" aria-hidden="true"></i>
                                            <span>Email:</span>
                                            <a href="mailto:vastra.fit@gmail.com">vastra.fit@gmail.com</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default ContactUs;
