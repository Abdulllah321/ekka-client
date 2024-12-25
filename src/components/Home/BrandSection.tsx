import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Importing brand images
import BrandImage1 from "../../assets/images/brand-image/1.png";
import BrandImage2 from "../../assets/images/brand-image/2.png";
import BrandImage3 from "../../assets/images/brand-image/3.png";
import BrandImage4 from "../../assets/images/brand-image/4.png";
import BrandImage5 from "../../assets/images/brand-image/5.png";
import BrandImage6 from "../../assets/images/brand-image/6.png";
import BrandImage7 from "../../assets/images/brand-image/7.png";
import BrandImage8 from "../../assets/images/brand-image/8.png";
import { Autoplay, FreeMode } from "swiper/modules";

const brandImages = [
  BrandImage1,
  BrandImage2,
  BrandImage3,
  BrandImage4,
  BrandImage5,
  BrandImage6,
  BrandImage7,
  BrandImage8,
];

const BrandSection = () => {
  return (
    <section className="section ec-brand-area section-space-p">
      <h2 className="d-none">Brand</h2>
      <div className="container">
        <div className="row">
          <div className="ec-brand-outer">
            <Swiper
              slidesPerView="auto"
              spaceBetween={10} // Space between slides
              autoplay={{
                delay: 3000, // Auto slide delay
                disableOnInteraction: false, // Keep autoplay after interaction
              }}
              modules={[Autoplay, FreeMode]}
              className="swiper-container"
              freeMode
            >
              {brandImages.map((image, index) => (
                <SwiperSlide key={index} style={{
                    width: "max-content"
                }}>
                  <motion.div
                    className="ec-brand-img"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    <a href="#">
                      <img alt="brand" title="brand" src={image} />
                    </a>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
