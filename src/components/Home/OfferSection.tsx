import { motion } from "framer-motion";
import offerImage from "../../assets/images/offer-image/1.png"; // Adjust path as needed

const OfferSection = ({
  title = "Sunglasses",
  subtitle = "Super Offer",
  description = "Acetate Frame Sunglasses",
  price = "$40.00 Only",
  image = offerImage,
  link = "shop-left-sidebar-col-3.html",
}) => {
  return (
    <section className="section ec-offer-section section-space-p section-space-m">
      <h2 className="d-none">Offer</h2>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center ec-offer-content">
            <motion.h2
              className="ec-offer-title"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {title}
            </motion.h2>
            <motion.h3
              className="ec-offer-stitle"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {subtitle}
            </motion.h3>
            <motion.span
              className="ec-offer-img"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <img src={image} alt="offer" />
            </motion.span>
            <motion.span
              className="ec-offer-desc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {description}
            </motion.span>
            <motion.span
              className="ec-offer-price"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {price}
            </motion.span>
            <motion.a
              className="btn btn-primary"
              href={link}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Shop Now
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
