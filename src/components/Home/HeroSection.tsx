import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";


const HeroSection = () => {
  return (
    <div className="sticky-header-next-sec ec-main-slider section section-space-pb">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop
        speed={2000} // Set sliding animation duration to 1 second
        className="ec-slider main-slider-nav main-slider-dot"
      >
        {/* Slide 1 */}
        <SwiperSlide>
          <div className="ec-slide-item d-flex ec-slide-1">
            <div className="container align-self-center">
              <div className="row">
                <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center">
                  <div className="ec-slide-content slider-animation">
                    <h1 className="ec-slide-title">New Fashion Collection</h1>
                    <h2 className="ec-slide-stitle">Exclusive Winter Sale</h2>
                    <p>
                      Discover the latest trends in winter fashion. From cozy
                      coats to stylish boots, redefine your wardrobe with our
                      exclusive collection.
                    </p>
                    <a href="#" className="btn btn-lg btn-secondary">
                      Shop Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 */}
        <SwiperSlide>
          <div className="ec-slide-item d-flex ec-slide-2">
            <div className="container align-self-center">
              <div className="row">
                <div className="col-xl-6 col-lg-7 col-md-7 col-sm-7 align-self-center">
                  <div className="ec-slide-content slider-animation">
                    <h1 className="ec-slide-title">Boat Headphone Sets</h1>
                    <h2 className="ec-slide-stitle">Limited Time Offer</h2>
                    <p>
                      Experience crystal-clear sound with Boat's premium
                      headphone sets. Perfect for music lovers and gamers alike.
                    </p>
                    <a href="#" className="btn btn-lg btn-secondary">
                      Order Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <div className="swiper-pagination swiper-pagination-white"></div>
        <div className="swiper-buttons">
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>
      </Swiper>
    </div>
  );
};

export default HeroSection;
