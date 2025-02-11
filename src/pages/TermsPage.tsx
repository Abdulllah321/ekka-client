import Layout from "../components/common/Layout.tsx";

const TermsAndConditions = () => {
    return (
        <Layout>
            {/* Breadcrumb Section */}
            <div className="sticky-header-next-sec ec-breadcrumb section-space-mb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row ec_breadcrumb_inner">
                                <div className="col-md-6 col-sm-12">
                                    <h2 className="ec-breadcrumb-title">Terms & Conditions</h2>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <ul className="ec-breadcrumb-list">
                                        <li className="ec-breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="ec-breadcrumb-item active">Terms & Conditions</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Terms & Conditions Page */}
            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">Terms & Conditions</h2>
                                <h2 className="ec-title">Terms & Conditions</h2>
                                <p className="sub-title mb-3">Welcome to Vastrafit - Your Trusted Clothing Brand</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="ec-common-wrapper">
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Welcome to Vastrafit</h3>
                                        <p>At Vastrafit, we are committed to offering high-quality clothing that perfectly fits your style and comfort. By using our website, you agree to abide by the following terms and conditions. These terms ensure a smooth shopping experience for all our valued customers.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Website Usage</h3>
                                        <p>Our website provides a seamless shopping experience for trendy and comfortable clothing. All content, including product images, descriptions, and pricing, is intended for personal use only. Unauthorized reproduction or commercial use of our content is strictly prohibited.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Ordering & Payments</h3>
                                        <p>Orders placed on Vastrafit are subject to availability. We accept various payment methods, ensuring secure transactions. Once an order is confirmed, you will receive an email with details. If any issues arise, our support team is here to help.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Returns & Exchanges</h3>
                                        <p>We offer a hassle-free return and exchange policy. If you are unsatisfied with your purchase, you may return or exchange the item within 7 days of delivery, provided it is unused and in its original packaging.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Privacy & Security</h3>
                                        <p>Your privacy is important to us. We ensure that your personal details remain secure and confidential. We do not share your information with third parties, except as required for order fulfillment.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default TermsAndConditions;
