import { useState } from "react";
import { motion } from "framer-motion";
import { Product } from "../../utils/types";
import ProductImageSliders from "./ProductImageSliders";
import { Link } from "react-router-dom";
import { useCurrency } from "../../context/CurrencyContext.tsx";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: () => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
  isProductInCart: boolean; // New prop to track if product is in the cart
}

const QuickViewModal = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  quantity,
  setQuantity,
  isProductInCart, // Destructure the new prop
}: QuickViewModalProps) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const { formatPrice } = useCurrency();

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <>
      {/* Backdrop Animation */}
      <motion.div
        className={`modal-backdrop fade ${isOpen ? "show" : ""}`}
        style={{ display: isOpen ? "block" : "none" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      ></motion.div>

      {/* Modal Animation */}
      <motion.div
        className={`modal fade ${isOpen ? "show" : ""}`}
        style={{ display: isOpen ? "block" : "none" }}
        aria-hidden={!isOpen}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <button
              type="button"
              className="btn-close qty_close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
            <div
              className="modal-body"
              style={{
                overflowY: "auto",
              }}
            >
              <div className="row">
                <div className="col-md-5 col-sm-12 col-xs-12">
                  {/* Swiper */}
                  <ProductImageSliders productDetails={product} />
                </div>
                <div className="col-md-7 col-sm-12 col-xs-12">
                  <div className="quickview-pro-content">
                    <h5 className="ec-quick-title">
                      <Link to={`/product-detail/${product.slug}`}>
                        {product.name}
                      </Link>
                    </h5>
                    <div className="ec-quickview-rating">
                      {Array.from({ length: 5 }, (_, index) => (
                        <i
                          key={index}
                          className={`ecicon eci-star ${
                            index < product.rating ? "fill" : ""
                          }`}
                        ></i>
                      ))}
                    </div>

                    <div className="ec-quickview-desc">
                      {product.description}
                    </div>
                    <div className="ec-quickview-price">
                      <span className="old-price">
                        {formatPrice(product.discountPrice as number)}
                      </span>
                      <span className="new-price">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <div className="ec-pro-variation">
                      {/* Color Selection */}
                      <div className="ec-pro-variation-inner ec-pro-variation-color">
                        <span>Color</span>
                        <div className="ec-pro-color">
                          <ul className="ec-opt-swatch">
                            {product.colors.map((color, index) => (
                              <li
                                key={index}
                                onClick={() => handleColorSelect(color)}
                                className={
                                  selectedColor === color ? "active" : ""
                                }
                              >
                                <span
                                  style={{ backgroundColor: color }}
                                  data-tooltip={color}
                                ></span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Size Selection */}
                      <div className="ec-pro-variation-inner ec-pro-variation-size ec-pro-size">
                        <span>Size</span>
                        <div className="ec-pro-variation-content">
                          <ul className="ec-opt-size">
                            {product.sizes.map((size, index) => (
                              <li
                                key={index}
                                onClick={() => handleSizeSelect(size)}
                                className={
                                  selectedSize === size ? "active" : ""
                                }
                              >
                                <a
                                  href="#"
                                  className="ec-opt-sz"
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

                    <div className="ec-quickview-qty">
                      <div className="qty-plus-minus">
                        <input
                          className="qty-input"
                          type="text"
                          name="ec_qtybtn"
                          value={quantity}
                          onChange={handleQuantityChange}
                        />
                      </div>
                      <div className="ec-quickview-cart">
                        <button
                          className={`btn btn-primary ${
                            isProductInCart ? "disabled" : ""
                          }`}
                          onClick={handleAddToCart}
                          disabled={isProductInCart} // Disable the button if the product is in the cart
                        >
                          <i className="fi-rr-shopping-basket"></i>
                          {isProductInCart ? "In Cart" : "Add To Cart"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default QuickViewModal;
