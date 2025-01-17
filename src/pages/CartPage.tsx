import { useDispatch } from "react-redux";
import Layout from "../components/common/Layout";
import { AppDispatch, useAppSelector } from "../store";
import Loader from "../components/common/Loader";
import { CURRENCY, getImageUrl } from "../constants";
import toast from "react-hot-toast";
import {
  applyCoupon,
  getCart,
  getCartCount,
  removeFromCart,
  updateQuantity,
} from "../slices/cartSlice";
import { useEffect, useState } from "react";
import Modal from "../components/common/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fetchCouponByCode } from "../slices/couponSlice";
import { ClipLoader } from "react-spinners";

const CartPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isDeleting, setIsDeleting] = useState<string>("");
  const [isCouponPopup, setIsCouponPopup] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const { cartItems, loading, coupon } = useAppSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  if (loading) <Loader />;

  const handleQuantityChange = async (productId: string, quantity: number) => {
    try {
      await dispatch(updateQuantity({ productId, quantity })).unwrap();
      await dispatch(getCartCount()).unwrap();
    } catch (error: any) {
      console.log(error);
      toast.error(error || "Failed to update quantity");
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await dispatch(removeFromCart(productId)).unwrap();
    } catch (error: any) {
      toast.error(error || "Failed to remove item");
      console.log(error);
    }
  };

  const handleDelete = (productId: string) => {
    setIsDeleting(productId);
  };

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
    } catch (error: any) {
      console.log(error);
      toast.error("Invalid Coupon Code.");
    }
  };

  if (!cartItems.length) {
    return (
      <Layout>
        <div className="container ">
          <div className="row">
            <div className="col-12 py-25">
              <div className="text-center">
                <h2>Your cart is empty</h2>
                <Link to="/shop" className="btn btn-primary">
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.product.price || 0),
    0
  );

  // Calculate delivery charge (sum of product shipping fees or default to 100)
  const deliveryCharge = cartItems.reduce(
    (total, item) => total + (item.product.shippingFee || 100),
    0
  );
  const totalAmount = subtotal + deliveryCharge;

  return (
    <Layout>
      {/* Cart breadCurmbs */}
      <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                  <h2 className="ec-breadcrumb-title">Cart</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  {/* ec-breadcrumb-list start */}
                  <ul className="ec-breadcrumb-list">
                    <li className="ec-breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="ec-breadcrumb-item active">Cart</li>
                  </ul>
                  {/* ec-breadcrumb-list end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CartPage */}
      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="ec-cart-leftside col-lg-8 col-md-12 ">
              {/* cart content Start */}
              <div className="ec-cart-content">
                <div className="ec-cart-inner">
                  <div className="row">
                    <form action="#">
                      <div className="table-content cart-table-content">
                        <table>
                          <thead>
                            <tr>
                              <th>Product</th>
                              <th>Price</th>
                              <th style={{ textAlign: "center" }}>Quantity</th>
                              <th>Total</th>
                              <th />
                            </tr>
                          </thead>
                          <tbody>
                            {cartItems.map((cartItem) => (
                              <tr>
                                <td
                                  data-label="Product"
                                  className="ec-cart-pro-name"
                                >
                                  <a href="product-left-sidebar.html">
                                    <img
                                      className="ec-cart-pro-img mr-4"
                                      src={getImageUrl(
                                        cartItem.product.thumbnail
                                      )}
                                      alt={cartItem.product.name}
                                    />
                                    {cartItem.product.name}
                                  </a>
                                </td>
                                <td
                                  data-label="Price"
                                  className="ec-cart-pro-price"
                                >
                                  <span className="amount">
                                    {CURRENCY}
                                    {cartItem.product.price}
                                  </span>
                                </td>
                                <td
                                  data-label="Quantity"
                                  className="ec-cart-pro-qty"
                                  style={{ textAlign: "center" }}
                                >
                                  <div className="cart-qty-plus-minus">
                                    <button
                                      className="qty-btn qty-minus"
                                      type="button"
                                      onClick={() =>
                                        handleQuantityChange(
                                          cartItem.product.id!,
                                          cartItem.quantity - 1
                                        )
                                      }
                                      disabled={
                                        cartItem.quantity <= 1 || loading
                                      }
                                    >
                                      -
                                    </button>
                                    {loading ? (
                                      <ClipLoader size={10} />
                                    ) : (
                                      <input
                                        className="cart-plus-minus"
                                        type="text"
                                        name="cartqtybutton"
                                        value={cartItem.quantity}
                                        onChange={(e) =>
                                          handleQuantityChange(
                                            cartItem.product.id!,
                                            parseInt(e.target.value, 10)
                                          )
                                        }
                                      />
                                    )}
                                    <button
                                      className="qty-btn qty-plus"
                                      type="button"
                                      onClick={() =>
                                        handleQuantityChange(
                                          cartItem.product.id!,
                                          cartItem.quantity + 1
                                        )
                                      }
                                      disabled={loading}
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>

                                <td
                                  data-label="Total"
                                  className="ec-cart-pro-subtotal"
                                >
                                  {CURRENCY}
                                  {cartItem.product.price * cartItem.quantity}
                                </td>
                                <td
                                  data-label="Remove"
                                  className="ec-cart-pro-remove"
                                  onClick={() =>
                                    handleDelete(cartItem.product.id!)
                                  }
                                >
                                  <a href="#">
                                    <i className="ecicon eci-trash-o" />
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="ec-cart-update-bottom">
                            <Link to={`/`}>Continue Shopping</Link>
                            <button className="btn btn-primary">
                              <Link to={`/checkout`} style={{ color: "#fff" }}>
                                Check Out
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/*cart content End */}
            </div>
            {/* Sidebar Area Start */}
            <div className="ec-cart-rightside col-lg-4 col-md-12">
              <div className="ec-sidebar-wrap">
                {/* Sidebar Summary Block */}
                <div className="ec-sidebar-block">
                  <div className="ec-sb-title">
                    <h3 className="ec-sidebar-title">Summary</h3>
                  </div>
                  <div className="ec-sb-block-content">
                    <div className="ec-cart-summary-bottom">
                      <div className="ec-cart-summary">
                        <div>
                          <span className="text-left">Sub-Total</span>
                          <span className="text-right">
                            {CURRENCY + subtotal}
                          </span>
                        </div>
                        <div>
                          <span className="text-left">Delivery Charges</span>
                          <span className="text-right">
                            {CURRENCY + deliveryCharge}
                          </span>
                        </div>
                        <div>
                          <span className="text-left">
                            Coupon Discount: {"  "}{" "}
                            <strong>{coupon?.code}</strong>
                          </span>
                          {coupon ? (
                            <span className="text-right">
                              -{coupon.discountAmount}
                              {coupon.discountType === "percentage"
                                ? "%"
                                : CURRENCY}
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
                                  onChange={(e) =>
                                    setCouponCode(e.target.value)
                                  }
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
                        <div className="ec-cart-summary-total">
                          <span className="text-left">Total Amount</span>
                          <span className="text-right">
                            {CURRENCY + totalAmount}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sidebar Summary Block */}
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatePresence>
        {isDeleting && (
          <Modal
            show={isDeleting !== ""}
            onClose={() => setIsDeleting("")}
            title="Are you sure want to delete this item?"
            closeButtonText="Cancel"
            saveButtonText="Delete"
            onSave={() => {
              handleRemoveItem(isDeleting);
              setIsDeleting("");
            }}
            type="danger"
          >
            <p>This action cannot be undone. Do you want to proceed?</p>
          </Modal>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default CartPage;
