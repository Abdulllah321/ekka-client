import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// Importing images
import image1 from "../../assets/images/testimonial/1.jpg";
import image2 from "../../assets/images/testimonial/2.jpg";
import image3 from "../../assets/images/testimonial/3.jpg";

const testimonials = [
  {
    id: 1,
    image: image1,
    name: "John Doe",
    designation: "General Manager",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.",
    rating: 5,
  },
  {
    id: 2,
    image: image2,
    name: "John Doe",
    designation: "General Manager",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.",
    rating: 5,
  },
  {
    id: 3,
    image: image3,
    name: "John Doe",
    designation: "General Manager",
    review:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen.",
    rating: 5,
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <section
      className="section ec-test-section section-space-ptb-100 section-space-m"
      id="reviews"
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="section-title mb-0">
              <h2 className="ec-bg-title">Testimonial</h2>
              <h2 className="ec-title">Client Review</h2>
              <p className="sub-title mb-3">What say client about us</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="ec-test-outer">
            {/* Swiper component */}
            <Swiper
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              speed={1500}
              className="testimonial-slider"
            >
              {testimonials.map((testimonial) => (
                <SwiperSlide
                  key={testimonial.id}
                >
                  <div
                    className="ec-test-item"
                  >
                    <i className="fi-rr-quote-right top"></i>
                    <div className="ec-test-inner">
                      <div className="ec-test-img">
                        <img
                          alt="testimonial"
                          title="testimonial"
                          src={testimonial.image}
                        />
                      </div>
                      <div className="ec-test-content">
                        <div className="ec-test-desc">{testimonial.review}</div>
                        <div className="ec-test-name">{testimonial.name}</div>
                        <div className="ec-test-designation">
                          {testimonial.designation}
                        </div>
                        <div className="ec-test-rating">
                          {[...Array(testimonial.rating)].map((_, index) => (
                            <i key={index} className="ecicon eci-star fill"></i>
                          ))}
                        </div>
                      </div>
                    </div>
                    <i className="fi-rr-quote-right bottom"></i>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
