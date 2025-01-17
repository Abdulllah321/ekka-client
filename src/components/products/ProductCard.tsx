import { Product } from "../../utils/types";
import { Link } from "react-router-dom";
import { CURRENCY, getImageUrl, getPrice } from "../../constants";
import { AppDispatch, useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { addToCart, getCartCount } from "../../slices/cartSlice";
import toast from "react-hot-toast";
import { addToWishlist, removeFromWishlist } from "../../slices/wishlistslice";
import { useAuthenticatedAction } from "../../utils/useAuthenticatedAction";
import { useEffect, useState } from "react";
import QuickViewModal from "./QuickViewModal ";
import { AnimatePresence } from "framer-motion";

const ProductCard = ({
  product,
  isListView = false,
  isWishlist = false,
  isViewModelOpen,
  onOpenModal,
  onCloseModal,
}: {
  product: Product;
  isListView?: boolean;
  isWishlist?: boolean;
  isViewModelOpen: boolean;
  onOpenModal: () => void;
  onCloseModal: () => void;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const { items } = useAppSelector((state) => state.wishlist);
  const { cartItems } = useAppSelector((state) => state.cart);
  const [selected, setSelected] = useState<{
    selectedColor: string | null;
    selectedSize: string | null;
  }>({
    selectedColor: null,
    selectedSize: null,
  });
  const [quantity, setQuantity] = useState<number>(1);
  const [isInCart, setIsInCart] = useState<boolean>(false);
  const wishlist = items.find((item) => item.productId === product.id);
  const { execute } = useAuthenticatedAction();

  useEffect(() => {
    // Check if the product is already in the cart
    const productInCart = cartItems.find(
      (item) => item.productId === product?.id!
    );
    if (productInCart) {
      setIsInCart(true);
      setQuantity(productInCart.quantity); // Set the quantity to the one in the cart
    } else {
      setIsInCart(false);
    }
  }, [items, product?.id]);

  const handleCart = async () => {
    execute(async () => {
      const cartItem = {
        productId: product.id,
        quantity,
        selectedColor: selected.selectedColor,
        selectedSize: selected.selectedSize,
      };
      try {
        const response = await dispatch(addToCart(cartItem)).unwrap();
        toast.success("Item added to cart");
        if (response) await dispatch(getCartCount()).unwrap();
      } catch (error) {
        toast.error(error as string);
      }
    });
  };

  const handleWishlist = async () => {
    execute(async () => {
      try {
        if (wishlist) {
          await dispatch(removeFromWishlist(product.id!)).unwrap();
          toast.success("Item removed from wishlist");
        } else {
          await dispatch(addToWishlist(product.id!)).unwrap();
          toast.success("Item added to wishlist");
        }
      } catch (error) {
        toast.error(error as string);
      }
    });
  };

  const handleWishlistRemove = async () => {
    execute(async () => {
      try {
        if (wishlist) {
          await dispatch(removeFromWishlist(product.id!)).unwrap();
          toast.success("Item removed from wishlist");
        }
      } catch (error) {
        toast.error(error as string);
      }
    });
  };

  return (
    <>
      <div
        className={`col-lg-4 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content ${
          isListView ? "list-view" : ""
        }`}
      >
        <div className="ec-product-inner">
          <div className="ec-pro-image-outer">
            <div className="ec-pro-image">
              <Link
                to={`/product-detail/${product.slug}`}
                className="image"
                style={{
                  width: "100%",
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <img
                  className="main-image"
                  style={{
                    height: "100%",
                  }}
                  src={getImageUrl(product.thumbnail)}
                  alt={product.name}
                />
                <img
                  className="hover-image"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                  src={
                    getImageUrl(product.imageUrls[0]) ||
                    getImageUrl(product.thumbnail)
                  }
                  alt={product.name}
                />
              </Link>
              {product.discountPercentage ? (
                <span className="percentage">
                  {product.discountPercentage}%
                </span>
              ) : null}
              {isWishlist && (
                <span
                  className="ec-com-remove ec-remove-wish"
                  onClick={handleWishlistRemove}
                >
                  <a href="javascript:void(0)">×</a>
                </span>
              )}
              <a
                className="quickview"
                data-link-action="quickview"
                title="Quick view"
                data-bs-toggle="modal"
                data-bs-target="#ec_quickview_modal"
                onClick={onOpenModal}
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
                <a
                  className={`ec-btn-group wishlist ${
                    wishlist ? "active" : ""
                  }`}
                  title="Wishlist"
                  onClick={handleWishlist}
                >
                  <i className="fi-rr-heart"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="ec-pro-content">
            <h5 className="ec-pro-title">
              <Link to={`/product-detail/${product.slug}`}>{product.name}</Link>
            </h5>
            {product.rating ? (
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
            ) : null}
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
                    <li
                      key={index}
                      className={
                        selected.selectedColor === color ? "active" : ""
                      }
                      onClick={() =>
                        setSelected({ ...selected, selectedColor: color })
                      }
                    >
                      <span
                        className="ec-opt-clr-img"
                        data-src={color}
                        data-src-hover={color}
                        data-tooltip={color}
                      >
                        <span style={{ backgroundColor: color }}></span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="ec-pro-size">
                <span className="ec-pro-opt-label">Size</span>
                <ul className="ec-opt-size">
                  {product.sizes.map((size, index) => (
                    <li
                      key={index}
                      className={selected.selectedSize === size ? "active" : ""}
                      onClick={() =>
                        setSelected({ ...selected, selectedSize: size })
                      }
                    >
                      <a className="ec-opt-sz">{size}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isViewModelOpen && (
          <QuickViewModal
            product={product}
            isOpen={isViewModelOpen}
            onClose={onCloseModal}
            onAddToCart={handleCart}
            quantity={quantity}
            setQuantity={setQuantity}
            isProductInCart={isInCart}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
