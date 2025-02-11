import Layout from "../components/common/Layout.tsx";

const DeliveryReturn = () => {
    return (
        <Layout>
            {/* Breadcrumb Section */}
            <div className="sticky-header-next-sec ec-breadcrumb section-space-mb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row ec_breadcrumb_inner">
                                <div className="col-md-6 col-sm-12">
                                    <h2 className="ec-breadcrumb-title">Delivery & Return</h2>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <ul className="ec-breadcrumb-list">
                                        <li className="ec-breadcrumb-item"><a href="/">Home</a></li>
                                        <li className="ec-breadcrumb-item active">Delivery & Return</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Delivery & Return Page */}
            <section className="ec-page-content section-space-p">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">Delivery & Return</h2>
                                <h2 className="ec-title">Delivery & Return</h2>
                                <p className="sub-title mb-3">Everything you need to know about our delivery and return policies.</p>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="ec-common-wrapper">
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Shipping & Delivery</h3>
                                        <p>We offer **fast and reliable** shipping across multiple locations. Orders are processed within <b>24 hours</b> and delivered within <b>3-7 business days</b> based on your location.</p>
                                        <ul>
                                            <li>Standard shipping: 3-7 business days</li>
                                            <li>Express shipping: 1-3 business days</li>
                                            <li>International shipping available</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Order Tracking</h3>
                                        <p>You can track your order using your order ID on our <a href="/track-order">Order Tracking</a> page.</p>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Returns & Exchanges</h3>
                                        <p>If you’re not satisfied with your purchase, you can return it within **14 days** of delivery for an exchange or refund.</p>
                                        <ul>
                                            <li>Items must be in **original condition** with tags attached.</li>
                                            <li>Return shipping is **free** for defective or incorrect items.</li>
                                            <li>Refunds are processed within **5-7 business days** after approval.</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">How to Return an Item?</h3>
                                        <p>To initiate a return, follow these steps:</p>
                                        <ol>
                                            <li>Go to our <a href="/returns">Returns Portal</a>.</li>
                                            <li>Enter your order details and request a return.</li>
                                            <li>Print the provided return label and send the item back.</li>
                                            <li>Once received, we will process your refund or exchange.</li>
                                        </ol>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Refunds</h3>
                                        <p>Refunds are issued to the original payment method. Processing times vary:</p>
                                        <ul>
                                            <li>Credit/Debit Card: 5-7 business days</li>
                                            <li>PayPal: 3-5 business days</li>
                                            <li>Store Credit: Instant</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-sm-12 ec-cms-block">
                                    <div className="ec-cms-block-inner">
                                        <h3 className="ec-cms-block-title">Need Help?</h3>
                                        <p>If you have any questions, feel free to reach out to us at <b>support@vastrafit.com</b> or call us at <b>+123 456 7890</b>.</p>
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

export default DeliveryReturn;
