import { motion } from "framer-motion";
import vendor2 from "../../assets/images/vendor/2.jpg";
import vendor3 from "../../assets/images/vendor/3.jpg";
import vendor4 from "../../assets/images/vendor/4.jpg";
import vendor5 from "../../assets/images/vendor/5.jpg";
import product1 from "../../assets/images/product-image/1_1.jpg";
import product2 from "../../assets/images/product-image/2_1.jpg";
import product3 from "../../assets/images/product-image/3_1.jpg";
import product4 from "../../assets/images/product-image/4_1.jpg";
import product5 from "../../assets/images/product-image/5_1.jpg";
import product6 from "../../assets/images/product-image/6_1.jpg";
import product7 from "../../assets/images/product-image/7_1.jpg";
import product8 from "../../assets/images/product-image/8_1.jpg";
import product9 from "../../assets/images/product-image/9_1.jpg";
import product10 from "../../assets/images/product-image/10_1.jpg";
import product11 from "../../assets/images/product-image/11_1.jpg";
import product12 from "../../assets/images/product-image/12_1.jpg";
import product13 from "../../assets/images/product-image/13_1.jpg";
import product14 from "../../assets/images/product-image/14_1.jpg";
import product15 from "../../assets/images/product-image/15_1.jpg";
import product16 from "../../assets/images/product-image/16_1.jpg";


const vendors = [
  {
    id: 1,
    name: "Marvelus",
    avatar: vendor2,
    products: 154,
    sales: 954,
    rating: 4,
    productImages: [product1, product2, product3, product4],
  },
  {
    id: 2,
    name: "Oreva Fashion",
    avatar: vendor3,
    products: 546,
    sales: 785,
    rating: 5,
    productImages: [product5, product6, product7, product8],
  },
  {
    id: 3,
    name: "Cenva Art",
    avatar: vendor4,
    products: 854,
    sales: 587,
    rating: 3,
    productImages: [product9, product10, product11, product12],
  },
  {
    id: 4,
    name: "Neon Fashion",
    avatar: vendor5,
    products: 154,
    sales: 354,
    rating: 5,
    productImages: [product13, product14, product15, product16],
  },
];

const TopVendorSection = () => {


  return (
    <section className="section section-space-p" id="vendors">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="section-title">
              <h2 className="ec-bg-title">Top Vendor</h2>
              <h2 className="ec-title">Top Vendor</h2>
              <p className="sub-title">
                Browse The Collection of{" "}
                <a href="catalog-multi-vendor.html">All Vendors.</a>
              </p>
            </div>
          </div>
        </div>
        <div className="row margin-minus-t-15 margin-minus-b-15">
          {vendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              className="col-sm-12 col-md-6 col-lg-3 ec_ven_content"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="ec-vendor-card">
                <div className="ec-vendor-detail">
                  <div className="ec-vendor-avtar">
                    <img src={vendor.avatar} alt={`${vendor.name} avatar`} />
                  </div>
                  <div className="ec-vendor-info">
                    <a href="catalog-single-vendor.html" className="name">
                      {vendor.name}
                    </a>
                    <p className="prod-count">{vendor.products} Products</p>
                    <div className="ec-pro-rating">
                      {[...Array(5)].map((_, index) => (
                        <i
                          key={index}
                          className={`ecicon eci-star ${
                            index < vendor.rating ? "fill" : ""
                          }`}
                        />
                      ))}
                    </div>
                    <div className="ec-sale">
                      <p title="Weekly sales">Sales {vendor.sales}</p>
                    </div>
                  </div>
                </div>
                <div className="ec-vendor-prod">
                  {vendor.productImages.map((image, idx) => (
                    <div key={idx} className="ec-prod-img">
                      <a href="product-left-sidebar.html">
                        <img
                          src={image}
                          alt={`${vendor.name} product ${idx + 1}`}
                        />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopVendorSection;
