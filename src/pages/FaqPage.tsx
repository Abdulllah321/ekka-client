import Layout from "../components/common/Layout.tsx";

const FaqPage = () => {
    return (
        <Layout>

            <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="row ec_breadcrumb_inner">
                                <div className="col-md-6 col-sm-12">
                                    <h2 className="ec-breadcrumb-title">FAQ</h2>
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <ul className="ec-breadcrumb-list">
                                        <li className="ec-breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li className="ec-breadcrumb-item active">FAQ</li>
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
                        <div className="col-md-12 text-center">
                            <div className="section-title">
                                <h2 className="ec-bg-title">FAQ</h2>
                                <h2 className="ec-title">FAQ</h2>
                                <p className="sub-title mb-3">Customer Support & Shopping Guide</p>
                            </div>
                        </div>
                        <div className="ec-faq-wrapper">
                            <div className="ec-faq-container">
                                <h2 className="ec-faq-heading">About Vastrafit</h2>
                                <div id="ec-faq">
                                    <div className="col-sm-12 ec-faq-block">
                                        <h4 className="ec-faq-title">What is Vastrafit?</h4>
                                        <div className="ec-faq-content">
                                            <p>Vastrafit is a premium clothing brand dedicated to providing high-quality, stylish, and perfectly fitted apparel for men and women. Our goal is to enhance your wardrobe with timeless fashion that complements your unique style.</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 ec-faq-block">
                                        <h4 className="ec-faq-title">How do I find my perfect size?</h4>
                                        <div className="ec-faq-content">
                                            <p>We offer a detailed size chart on each product page to help you find the perfect fit. Additionally, you can use our AI-powered size recommendation tool to ensure you get the best fit for your body type.</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 ec-faq-block">
                                        <h4 className="ec-faq-title">What is Vastrafit's return policy?</h4>
                                        <div className="ec-faq-content">
                                            <p>We offer a hassle-free 7-day return and exchange policy. If you’re not satisfied with your purchase, you can return it within 7 days of delivery, provided the item is unused and in its original packaging.</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 ec-faq-block">
                                        <h4 className="ec-faq-title">Can I exchange an item for a different size?</h4>
                                        <div className="ec-faq-content">
                                            <p>Yes! If the size you ordered doesn’t fit, you can request an exchange for a different size within 7 days of receiving your order. We ensure a smooth and quick exchange process.</p>
                                        </div>
                                    </div>
                                    <div className="col-sm-12 ec-faq-block">
                                        <h4 className="ec-faq-title">Does Vastrafit offer discounts or giveaways?</h4>
                                        <div className="ec-faq-content">
                                            <p>Yes! We frequently run special discounts, giveaways, and loyalty rewards for our customers. Stay updated by subscribing to our newsletter and following us on social media for exclusive offers.</p>
                                        </div>
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

export default FaqPage;