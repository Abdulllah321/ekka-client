import Layout from "../components/common/Layout.tsx";

const PrivacyPolicy = () => {
    return (
        <Layout>
            {/* Breadcrumb Section */}
            <div className="sticky-header-next-sec ec-breadcrumb section-space-mb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row ec_breadcrumb_inner">
                                <div className="col-md-6 col-sm-12">
                                    <h2 className="ec-breadcrumb-title">Privacy Policy</h2>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <ul className="ec-breadcrumb-list">
                                        <li className="ec-breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="ec-breadcrumb-item active">Privacy Policy</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Privacy Policy Page */}
            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">Privacy Policy</h2>
                                <h2 className="ec-title">Privacy Policy</h2>
                                <p className="sub-title mb-3">Welcome to Vastrafit - Your Trusted Clothing Brand</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="ec-common-wrapper">
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Welcome to Vastrafit</h3>
                                        <p>Your privacy is important to us. This Privacy Policy outlines how we collect, use, and safeguard your personal information when you visit our website and shop with us.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Information We Collect</h3>
                                        <p>We may collect personal details such as your name, email address, phone number, and shipping address when you create an account or place an order. We ensure that your data is stored securely and used solely for order fulfillment and customer support.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">How We Use Your Information</h3>
                                        <p>Your information helps us improve our services, process orders, and provide personalized recommendations. We do not share your personal details with third-party companies except when necessary for payment processing and delivery.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Cookies & Tracking</h3>
                                        <p>We use cookies to enhance your browsing experience. Cookies help us remember your preferences and improve website functionality. You can choose to disable cookies in your browser settings.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Security Measures</h3>
                                        <p>We implement advanced security measures to protect your data from unauthorized access. All transactions are encrypted to ensure safe and secure payments.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Your Rights</h3>
                                        <p>You have the right to access, update, or delete your personal information. If you have any concerns regarding your data, please contact our support team for assistance.</p>
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

export default PrivacyPolicy;
