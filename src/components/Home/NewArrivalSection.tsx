import React from "react";
import productImage9_1 from "../../assets/images/product-image/9_1.jpg";
import productImage9_2 from "../../assets/images/product-image/9_2.jpg";
import productImage11_1 from "../../assets/images/product-image/11_1.jpg";
import productImage11_2 from "../../assets/images/product-image/11_2.jpg";
import productImage12_1 from "../../assets/images/product-image/12_1.jpg";
import productImage12_2 from "../../assets/images/product-image/12_2.jpg";
import productImage13_1 from "../../assets/images/product-image/13_1.jpg";
import productImage13_2 from "../../assets/images/product-image/13_2.jpg";

const NewArrivalsSection = () => {
  const products = [
    {
      id: 1,
      title: "Full Sleeve Cap T-Shirt",
      mainImage: productImage9_1,
      hoverImage: productImage9_2,
      oldPrice: "$20.00",
      newPrice: "$15.00",
      rating: 4,
      colors: [
        { color: "#74c7ff", image: productImage9_1 },
        { color: "#7af6ff", image: productImage9_2 },
      ],
      sizes: [
        { size: "S", oldPrice: "$20.00", newPrice: "$15.00" },
        { size: "M", oldPrice: "$22.00", newPrice: "$17.00" },
      ],
    },
    {
      id: 2,
      title: "Classic Leather Purse",
      mainImage: productImage11_1,
      hoverImage: productImage11_2,
      oldPrice: "$100.00",
      newPrice: "$80.00",
      rating: 4,
      colors: [
        { color: "#dba4ff", image: productImage11_1 },
        { color: "#ff4a77", image: productImage11_2 },
      ],
    },
    {
      id: 3,
      title: "Fancy Ladies Sandal",
      mainImage: productImage12_1,
      hoverImage: productImage12_2,
      oldPrice: "$100.00",
      newPrice: "$80.00",
      rating: 4,
      colors: [
        { color: "#db9dff", image: productImage12_1 },
        { color: "#00ffff", image: productImage12_2 },
      ],
    },
    {
      id: 4,
      title: "Womens Leather Backpack",
      mainImage: productImage13_1,
      hoverImage: productImage13_2,
      oldPrice: "$100.00",
      newPrice: "$80.00",
      rating: 4,
      colors: [
        { color: "#deffa4", image: productImage13_1 },
        { color: "#ffcdbe", image: productImage13_2 },
      ],
    },
  ];

  return (
    <section className="section ec-new-product section-space-p" id="arrivals">
      <div className="container">
        <div className="row">
          <div className="col-md-12 text-center">
            <div className="section-title">
              <h2 className="ec-bg-title">New Arrivals</h2>
              <h2 className="ec-title">New Arrivals</h2>
              <p className="sub-title">Browse The Collection of Top Products</p>
            </div>
          </div>
        </div>
        <div className="row">
          {products.map((product) => (
            <div
              key={product.id}
              className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 ec-product-content"
            >
              <div className="ec-product-inner">
                <div className="ec-pro-image-outer">
                  <div className="ec-pro-image">
                    <a href="product-left-sidebar.html" className="image">
                      <img
                        className="main-image"
                        src={product.mainImage}
                        alt={product.title}
                      />
                      <img
                        className="hover-image"
                        src={product.hoverImage}
                        alt={product.title}
                      />
                    </a>
                    <span className="flags">
                      {product.oldPrice !== product.newPrice && (
                        <span className="sale">Sale</span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="ec-pro-content">
                  <h5 className="ec-pro-title">
                    <a href="product-left-sidebar.html">{product.title}</a>
                  </h5>
                  <div className="ec-pro-rating">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`ecicon eci-star ${
                          i < product.rating ? "fill" : ""
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="ec-price">
                    <span className="old-price">{product.oldPrice}</span>
                    <span className="new-price">{product.newPrice}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSection;
