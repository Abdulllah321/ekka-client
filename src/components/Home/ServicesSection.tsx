import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    icon: "fi fi-ts-truck-moving",
    title: "Free Shipping",
    description: "Free shipping on all US order or order above $200",
  },
  {
    id: 2,
    icon: "fi fi-ts-hand-holding-seeding",
    title: "24X7 Support",
    description: "Contact us 24 hours a day, 7 days a week",
  },
  {
    id: 3,
    icon: "fi fi-ts-badge-percent",
    title: "30 Days Return",
    description: "Simply return it within 30 days for an exchange",
  },
  {
    id: 4,
    icon: "fi fi-ts-donate",
    title: "Payment Secure",
    description: "Contact us 24 hours a day, 7 days a week",
  },
];

const ServicesSection = () => {
  return (
    <section
      className="section ec-services-section section-space-p"
      id="services"
    >
      <h2 className="d-none">Services</h2>
      <div className="container">
        <div className="row">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className={`ec_ser_content col-sm-12 col-md-6 col-lg-3`}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="ec_ser_inner">
                <div className="ec-service-image">
                  <i className={service.icon}></i>
                </div>
                <div className="ec-service-desc">
                  <h2>{service.title}</h2>
                  <p>{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
