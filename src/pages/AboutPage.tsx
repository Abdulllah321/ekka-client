import {Link} from "react-router-dom";
import TestimonialSection from "../components/Home/TestimonialSection.tsx";
import Layout from "../components/common/Layout.tsx";

const AboutPage = () => {
    return (<Layout>
            <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row ec_breadcrumb_inner">
                                <div className="col-md-6 col-sm-12">
                                    <h2 className="ec-breadcrumb-title">About Us</h2>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    {/* ec-breadcrumb-list start */}
                                    <ul className="ec-breadcrumb-list">
                                        <li className="ec-breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="ec-breadcrumb-item active">About Us</li>
                                    </ul>
                                    {/* ec-breadcrumb-list end */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">About VastraFit</h2>
                                <h2 className="ec-title">About VastraFit</h2>
                                <p className="sub-title mb-3">Our Passion for Fashion and Comfort</p>
                            </div>
                        </div>
                        <div className="ec-common-wrapper">
                            <div className="row">
                                <div className="col-md-6 ec-cms-block ec-abcms-block text-center">
                                    <div className="ec-cms-block-inner">
                                        <img
                                            className="a-img"
                                            src="assets/images/offer-image/1.jpg"
                                            alt="VastraFit Clothing"
                                        />
                                    </div>
                                </div>
                                <div className="col-md-6 ec-cms-block ec-abcms-block text-center">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">What is VastraFit?</h3>
                                        <p>
                                            VastraFit is a contemporary clothing brand designed to bring comfort and style to every wardrobe. We specialize in high-quality fabrics, elegant cuts, and timeless designs that make you feel confident and comfortable. Whether it's casual wear or something more formal, we have something for every occasion.
                                        </p>
                                        <p>
                                            At VastraFit, we believe in the fusion of comfort and fashion. Our team is dedicated to providing clothing that doesn't just look good but feels great to wear. From carefully selected materials to eco-friendly production methods, we take pride in every piece of clothing we create.
                                        </p>
                                        <p>
                                            We are committed to providing a sustainable and stylish alternative to fast fashion. Our designs are versatile, offering a mix of modern aesthetics and classic styles. Join the VastraFit family and experience clothing made for the modern lifestyle.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <TestimonialSection />
            <section className="section ec-services-section section-space-p" id="services">
                <h2 className="d-none">Services</h2>
                <div className="container">
                    <div className="row">
                        <div className="ec_ser_content ec_ser_content_1 col-sm-12 col-md-6 col-lg-3">
                            <div className="ec_ser_inner">
                                <div className="ec-service-image">
                                    <i className="fi fi-ts-truck-moving"></i>
                                </div>
                                <div className="ec-service-desc">
                                    <h2>Free Shipping</h2>
                                    <p>Enjoy free shipping on all orders within the US or on purchases above $200.</p>
                                </div>
                            </div>
                        </div>
                        <div className="ec_ser_content ec_ser_content_2 col-sm-12 col-md-6 col-lg-3">
                            <div className="ec_ser_inner">
                                <div className="ec-service-image">
                                    <i className="fi fi-ts-hand-holding-seeding"></i>
                                </div>
                                <div className="ec-service-desc">
                                    <h2>24/7 Customer Support</h2>
                                    <p>Our customer support team is available 24 hours a day, 7 days a week, to assist you.</p>
                                </div>
                            </div>
                        </div>
                        <div className="ec_ser_content ec_ser_content_3 col-sm-12 col-md-6 col-lg-3">
                            <div className="ec_ser_inner">
                                <div className="ec-service-image">
                                    <i className="fi fi-ts-badge-percent"></i>
                                </div>
                                <div className="ec-service-desc">
                                    <h2>30-Day Return Policy</h2>
                                    <p>If you're not satisfied, simply return your items within 30 days for an exchange or refund.</p>
                                </div>
                            </div>
                        </div>
                        <div className="ec_ser_content ec_ser_content_4 col-sm-12 col-md-6 col-lg-3">
                            <div className="ec_ser_inner">
                                <div className="ec-service-image">
                                    <i className="fi fi-ts-donate"></i>
                                </div>
                                <div className="ec-service-desc">
                                    <h2>Secure Payment</h2>
                                    <p>Your payment information is always secure with us. Shop with confidence.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default AboutPage