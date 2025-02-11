import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  applyCoupon,
  getCartCount,
  removeFromCart,
  updateQuantity,
} from "../../slices/cartSlice";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../constants";
import { useState } from "react";
import { fetchCouponByCode } from "../../slices/couponSlice";
import toast from "react-hot-toast";
import { useCurrency } from "../../context/CurrencyContext.tsx";

const CartSidebar = ({
  isCartBarVisible,
  toggleCart,
}: {
  isCartBarVisible: boolean;
  toggleCart: () => void;
}) => {
  const dispatch = useAppDispatch();
  const { cartItems, coupon } = useAppSelector((state) => state.cart);
  const { formatPrice, currency } = useCurrency();

  const [isCouponPopup, setIsCouponPopup] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);

  const handleRemoveItem = async (id: string) => {
    try {
      await dispatch(removeFromCart(id)).unwrap();
    } catch (error: unknown) {
      console.log(error);
      toast.error("Failed to remove item from cart");
    }
  };

  const handleUpdateQuantity = async (productId: string, quantity: number) => {
    try {
      await dispatch(updateQuantity({ productId, quantity })).unwrap();
      await dispatch(getCartCount()).unwrap();
    } catch (error: unknown) {
      console.log(error);
      toast.error((error as string) || "Failed to update quantity");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.product.price || 0),
    0,
  );

  // Calculate delivery charge (sum of product shipping fees or default to 100)
  const deliveryCharge = cartItems.reduce(
    (total, item) => total + (item.product.shippingFee || 100),
    0,
  );
  const totalAmount = subtotal + deliveryCharge;

  const handleCheckCoupon = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (couponCode) {
        const response = await dispatch(fetchCouponByCode(couponCode)).unwrap();
        dispatch(applyCoupon(response));
        setIsCouponPopup(false);
        if (response) toast.success("Coupon applied successfully");
      } else {
        toast.error("Please enter a coupon code.");
      }
    } catch (error: unknown) {
      console.log(error);
      toast.error("Invalid Coupon Code.");
    }
  };

  return (
    <AnimatePresence>
      {isCartBarVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="ec-side-cart-overlay"
          onClick={toggleCart}
        />
      )}
      {isCartBarVisible && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: "0%" }}
          exit={{ opacity: 0, x: "100%" }}
          id="ec-side-cart"
          className="ec-side-cart"
        >
          <div className="ec-cart-inner">
            <div className="ec-cart-top">
              <div className="ec-cart-title">
                <span className="cart_title">My Cart</span>
                <button className="ec-close" onClick={toggleCart}>
                  ×
                </button>
              </div>
              {cartItems.length ? (
                <ul className="eccart-pro-items">
                  {cartItems.map((item) => (
                    <li key={item.id}>
                      <Link
                        to={`/product/${item.product.id}`}
                        className="sidVastra_pro_img"
                      >
                        <img
                          src={getImageUrl(item.product.thumbnail)}
                          alt={item.product.name}
                        />
                      </Link>
                      <div className="ec-pro-content">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="cart_pro_title"
                        >
                          {item.product.name}
                        </Link>
                        <span className="cart-price">
                          <span>${item.product.price.toFixed(2)}</span> x{" "}
                          {item.quantity}
                        </span>
                        <div className="qty-plus-minus">
                          <input
                            className="qty-input"
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateQuantity(
                                item?.product?.id!,
                                parseInt(e.target.value, 10),
                              )
                            }
                          />
                        </div>
                        <button
                          className="remove"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          ×
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                "Your cart is empty"
              )}
            </div>
            <div className="ec-cart-bottom">
              <div className="cart-sub-total">
                <table className="table cart-table">
                  <tbody>
                    <tr>
                      <td className="text-left">Sub-Total :</td>
                      <td className="text-right">
                        {formatPrice(subtotal.toFixed(2))}
                      </td>
                    </tr>
                    <tr>
                      <td className="text-left">Delivery Charges:</td>
                      <td className="text-right">
                        {formatPrice(deliveryCharge.toFixed(2))}
                      </td>
                    </tr>
                    <div>
                      <span className="text-left">
                        Coupon Discount: {"  "} <strong>{coupon?.code}</strong>
                      </span>
                      {coupon ? (
                        <span className="text-right">
                          -{coupon.discountAmount}
                          {coupon.discountType === "percentage"
                            ? "%"
                            : currency}
                        </span>
                      ) : (
                        <span
                          className="text-right"
                          onClick={() => setIsCouponPopup(!isCouponPopup)}
                        >
                          <a className="ec-cart-coupon">Apply coupon</a>
                        </span>
                      )}
                    </div>
                    <AnimatePresence>
                      {isCouponPopup && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="ec-cart-coupan-content"
                          style={{ display: "block" }}
                        >
                          <form
                            className="ec-cart-coupan-form"
                            name="ec-cart-coupan-form"
                            method="post"
                            onSubmit={handleCheckCoupon}
                          >
                            <input
                              className="ec-coupan"
                              type="text"
                              required
                              placeholder="Enter Your Coupan Code"
                              name="ec-coupan"
                              onChange={(e) => setCouponCode(e.target.value)}
                            />
                            <button
                              className="ec-coupan-btn button btn-primary"
                              type="submit"
                              name="subscribe"
                            >
                              Apply
                            </button>
                          </form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <tr>
                      <td className="text-left">Total :</td>
                      <td className="text-right primary-color">
                        {formatPrice(totalAmount.toFixed(2))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="cart_btn">
                <Link to="/cart" className="btn btn-primary">
                  View Cart
                </Link>
                <Link to="/checkout" className="btn btn-secondary">
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
