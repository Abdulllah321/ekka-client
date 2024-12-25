import React from "react";
import { Product } from "../../utils/types";
import { Link } from "react-router";
import { CURRENCY, getImageUrl, getPrice } from "../../constants";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { addToCart } from "../../slices/cartSlice";
import toast from "react-hot-toast";

const ProductCard = ({
  product,
  isListView,
}: {
  product: Product;
  isListView: boolean;
}) => {
  const dispatch: AppDispatch = useDispatch();

  const handleCart = async () => {
    const cartItem = {
      productId: product.id,
      quantity: 1,
    };
    try {
      await dispatch(addToCart(cartItem));
      toast.success("Item added to cart");
    } catch (error) {
      console.log("Failed to add item to cart", error);
      toast.error(error as string);
    }
  };

  return (
    <div
      className={`col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content ${
        isListView ? "list-view" : ""
      }`}
    >
      <div className="ec-product-inner">
        <div className="ec-pro-image-outer">
          <div className="ec-pro-image">
            <Link to={"product-detail/" + product.id} className="image">
              <img
                className="main-image"
                src={getImageUrl(product.thumbnail)}
                alt={product.name}
              />
              <img
                className="hover-image"
                src={
                  getImageUrl(product.imageUrls[0]) ||
                  getImageUrl(product.thumbnail)
                }
                alt={product.name}
              />
            </Link>
            {product.discountPercentage && (
              <span className="percentage">{product.discountPercentage}%</span>
            )}
            <a
              href="#"
              className="quickview"
              data-link-action="quickview"
              title="Quick view"
              data-bs-toggle="modal"
              data-bs-target="#ec_quickview_modal"
            >
              <i className="fi-rr-eye"></i>
            </a>
            <div className="ec-pro-actions">
              <a
                href="compare.html"
                className="ec-btn-group compare"
                title="Compare"
              >
                <i className="fi fi-rr-arrows-repeat"></i>
              </a>
              <button
                title="Add To Cart"
                className="add-to-cart"
                onClick={handleCart}
              >
                <i className="fi-rr-shopping-basket"></i> Add To Cart
              </button>
              <a className="ec-btn-group wishlist" title="Wishlist">
                <i className="fi-rr-heart"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="ec-pro-content">
          <h5 className="ec-pro-title">
            <Link to={"product-detail/" + product.id}>{product.name}</Link>
          </h5>
          {product.rating && (
            <div className="ec-pro-rating">
              {Array.from({ length: 5 }, (_, index) => (
                <i
                  key={index}
                  className={`ecicon eci-star ${
                    index < product.rating! ? "fill" : ""
                  }`}
                ></i>
              ))}
            </div>
          )}
          <div className="ec-pro-list-desc">{product.description}</div>
          <span className="ec-price">
            {product.price && (
              <span className="old-price">
                {CURRENCY}
                {getPrice(product)}
              </span>
            )}
            <span className="new-price">
              {CURRENCY}
              {product.price}
            </span>
          </span>
          <div className="ec-pro-option">
            <div className="ec-pro-color">
              <span className="ec-pro-opt-label">Color</span>
              <ul className="ec-opt-swatch ec-change-img">
                {product.colors.map((color, index) => (
                  <li key={index} className={index === 0 ? "active" : ""}>
                    <a
                      href="#"
                      className="ec-opt-clr-img"
                      data-src={color}
                      data-src-hover={color}
                      data-tooltip={color}
                    >
                      <span style={{ backgroundColor: color }}></span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ec-pro-size">
              <span className="ec-pro-opt-label">Size</span>
              <ul className="ec-opt-size">
                {product.sizes.map((size, index) => (
                  <li key={index} className={index === 0 ? "active" : ""}>
                    <a
                      href="#"
                      className="ec-opt-sz"
                      data-old={`$${size}`}
                      data-new={`$${size}`}
                      data-tooltip={size}
                    >
                      {size}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
