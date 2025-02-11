import Layout from "../components/common/Layout.tsx";

const CustomerService = () => {
    return (
        <Layout>
            {/* Breadcrumb Section */}
            <div className="sticky-header-next-sec ec-breadcrumb section-space-mb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row ec_breadcrumb_inner">
                                <div className="col-md-6 col-sm-12">
                                    <h2 className="ec-breadcrumb-title">Customer Service</h2>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <ul className="ec-breadcrumb-list">
                                        <li className="ec-breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="ec-breadcrumb-item active">Customer Service</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer Service Page */}
            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">Customer Service</h2>
                                <h2 className="ec-title">Customer Service</h2>
                                <p className="sub-title mb-3">How can we assist you?</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="ec-common-wrapper">
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Contact Us</h3>
                                        <p>Need help? Our support team is available to assist you. Reach out to us via email at <b>support@vastrafit.com</b> or call us at <b>+123 456 7890</b>.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Shipping & Delivery</h3>
                                        <p>We ensure fast and reliable shipping. Orders are processed within 24 hours and delivered within 3-7 business days.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Returns & Refunds</h3>
                                        <p>If you’re not satisfied with your purchase, we offer hassle-free returns within 14 days. Read our <a href="/returns-policy">Returns Policy</a> for details.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Order Tracking</h3>
                                        <p>Track your order easily by entering your order ID <a href="/track-order">here</a>.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">FAQs</h3>
                                        <p>Got questions? Check out our <a href="/faq">FAQ section</a> for quick answers.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Live Chat Support</h3>
                                        <p>Chat with our support team in real-time for instant assistance. Available from 9 AM to 9 PM.</p>
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

export default CustomerService;
