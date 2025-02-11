import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from "swiper/modules";

import image1 from "../../assets/images/testimonial/1.jpg";
import image2 from "../../assets/images/testimonial/2.jpg";
import image3 from "../../assets/images/testimonial/3.jpg";

const testimonials = [
  {
    id: 1,
    image: image1,
    name: "John Doe",
    designation: "General Manager",
    review: "Vastrafit has completely transformed my wardrobe! The quality and fit are impeccable, and I love their attention to detail in every piece.",
    rating: 5,
  },
  {
    id: 2,
    image: image2,
    name: "Jane Smith",
    designation: "CEO",
    review: "I've never felt more confident in my outfits! Vastrafit’s collection is stylish, comfortable, and perfect for any occasion.",
    rating: 4,
  },
  {
    id: 3,
    image: image3,
    name: "Michael Doe",
    designation: "Marketing Manager",
    review: "The best clothing brand I've come across! Vastrafit offers premium quality at great prices. Highly recommend for fashion enthusiasts.",
    rating: 5,
  },
];


const TestimonialSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);

  return (
      <section className="section ec-test-section" id="reviews">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <div className="section-title mb-0">
                <h2 className="ec-bg-title">Testimonial</h2>
                <h2 className="ec-title">Client Review</h2>
                <p className="sub-title mb-3">What clients say about us</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="ec-test-outer">
              <Swiper
                  slidesPerView={1}
                  // loop={true}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  speed={1500}
                  onSwiper={(swiper) => (swiperRef.current = swiper)}
                  onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                  className="testimonial-slider"
                  modules={[Autoplay, Pagination]}
              >
                {testimonials.map((testimonial) => (
                    <SwiperSlide key={testimonial.id} style={{ padding: "27px 0px", overflow: "visible" }}>
                      <div className="ec-test-item">
                        <i className="fi-rr-quote-right top top-quote"></i>
                        <div className="ec-test-inner">
                          <div className="ec-test-img">
                            <img alt="testimonial" title="testimonial" src={testimonial.image} />
                          </div>
                          <div className="ec-test-content">
                            <div className="ec-test-desc">{testimonial.review}</div>
                            <div className="ec-test-name">{testimonial.name}</div>
                            <div className="ec-test-designation">{testimonial.designation}</div>
                            <div className="ec-test-rating">
                              {[...Array(testimonial.rating)].map((_, index) => (
                                  <i key={index} className="ecicon eci-star fill"></i>
                              ))}
                            </div>
                          </div>
                        </div>
                        <i className="fi-rr-quote-right bottom bottom-quote"></i>
                      </div>
                    </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          {/* Custom Dots */}
          <ul className="slick-dots" role="tablist">
            {testimonials.map((testimonial, index) => (
                <li
                    key={index}
                    className={activeIndex === index ? "slick-active" : ""}
                    onClick={() => swiperRef.current?.slideToLoop(index)}
                >
                  <img src={testimonial.image} alt={`Testimonial ${index + 1}`} />
                </li>
            ))}
          </ul>
        </div>
      </section>
  );
};

export default TestimonialSection;
