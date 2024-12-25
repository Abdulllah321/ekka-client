import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Banner } from "../../utils/types";
import axios from "axios";
import { getImageUrl } from "../../constants";

const BannerSection: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const response = await axios.get<Banner[]>("/banners");
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    }

    fetchBanners();
  }, []);

  return (
    <section className="ec-banner section section-space-p">
      <h2 className="d-none">Banner</h2>
      <div className="container">
        <div className="ec-banner-inner">
          <div className="ec-banner-block ec-banner-block-2">
            <div className="row">
              {banners.map((banner, index) => {
                const isRight = banner.animation === "slideFromRight";
                return (
                  <motion.div
                    key={banner.id}
                    className={`banner-block col-lg-6 col-md-12 ${
                      index === 0 ? "margin-b-30" : ""
                    }`}
                    initial={{ x: isRight ? "100%" : "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    // viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                  >
                    <div className="bnr-overlay">
                      <img src={getImageUrl(banner.image)} alt={banner.title} />
                      <div className="banner-text">
                        <span className="ec-banner-stitle">
                          {banner.subtitle}
                        </span>
                        <span className="ec-banner-title">
                          {banner.title.split("\\n").map((line, idx) => (
                            <span key={idx}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </span>
                        {banner.discount && (
                          <span className="ec-banner-discount">
                            {banner.discount}
                          </span>
                        )}
                      </div>
                      <div className="banner-content">
                        <span className="ec-banner-btn">
                          <a href="#">{banner.buttonText}</a>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
