import React, { useEffect, useState } from "react";
import Layout from "../components/common/Layout";
import { Address, AddressType, Order, PaymentMethod } from "../utils/types";
import AddressForm from "../components/checkout/AddressForm";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { addAddress, fetchAddresses } from "../slices/userSlice";
import AddressDetails from "../components/checkout/AddressDetails";
import { CURRENCY, getImageUrl, getPrice } from "../constants";
import { fetchCouponByCode } from "../slices/couponSlice";
import { applyCoupon, clearCart, getCart } from "../slices/cartSlice";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import Loader from "../components/common/Loader";
import NoDataFound from "../components/common/NoDataFound";
import { ClipLoader } from "react-spinners";
import { createOrder } from "../slices/orderSlice";
import { useNavigate } from "react-router";

const CheckoutPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const [checkoutOption, setCheckoutOption] = useState<
    undefined | "existing" | "new"
  >("new");
  const { addresses, loading: addressLoading } = useAppSelector(
    (state) => state.user
  );
  const { cart, coupon, loading } = useAppSelector((state) => state.cart);
  const [address, setAddress] = useState<Address>({
    addressType: AddressType.BILLING,
    city: "",
    country: "",
    postalCode: "",
    state: "",
    street: "",
    firstName: "",
    lastName: "",
  });
  const { loading: ordersLoading } = useAppSelector((state) => state.order);
  const [selectedAddress, setSelectedAddress] = useState<string>();
  const [isCouponPopup, setIsCouponPopup] = useState<boolean>(false);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>(PaymentMethod.COD);
  const [orderComment, setOrderComment] = useState<string | null>();
  const [agreedTerms, setAgreedTerms] = useState<boolean>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(getCart());
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setAddress((prevAddress) => ({
      ...prevAddress!,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(addAddress(address)).unwrap();
      toast.success("Address added Successfully");
    } catch (error) {
      toast.error("Failed to add address.");
    }
  };

  if (!cart && loading) return <Loader />;

  const subtotal = cart?.cartItems.reduce(
    (sum, item) => sum + item.quantity * (item.product.price || 0),
    0
  );

  // Calculate delivery charge (sum of product shipping fees or default to 100)
  const deliveryCharge = cart?.cartItems.reduce(
    (total, item) => total + (item.product.shippingFee || 100),
    0
  );
  const discount = coupon
    ? coupon.discountType === "percentage"
      ? ((subtotal || 0) * coupon.discountAmount) / 100
      : coupon.discountAmount
    : 0;

  const totalAmount = (subtotal || 0) + (deliveryCharge || 0) - discount;

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

  const handleOrder = async () => {
    try {
      if (!selectedAddress) return toast.error("Please select an address");
      const orderItems: Order = {
        selectedAddressId: selectedAddress!,
        totalAmount,
        selectedPaymentMethod,
        orderComment,
        orderItems: cart?.cartItems.map((item) => ({
          productId: item.product.id!,
          quantity: item.quantity,
          price: (item.product.price || 0) * item.quantity,
        })),
      };
      const response = await dispatch(createOrder(orderItems)).unwrap();
      dispatch(clearCart());
      navigate("/order-success/" + response.id);
      toast.success("Order placed successfully!");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                  <h2 className="ec-breadcrumb-title">Checkout</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  <ul className="ec-breadcrumb-list">
                    <li className="ec-breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="ec-breadcrumb-item active">Checkout</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="ec-page-content section-space-p">
        <div className="container">
          <div className="row">
            <div className="ec-checkout-leftside col-lg-8 col-md-12 ">
              {/* checkout content Start */}
              <div className="ec-checkout-content">
                <div className="ec-checkout-inner">
                  <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
                    <div className="ec-checkout-block ec-check-bill">
                      <h3 className="ec-checkout-title">Billing Details</h3>
                      <div className="ec-bl-block-content">
                        <div className="ec-check-subtitle">
                          Checkout Options
                        </div>
                        <span className="ec-bill-option  d-flex">
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 20,
                            }}
                          >
                            <input
                              type="radio"
                              id="bill1"
                              name="radio-group"
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundSize: "cover",
                              }}
                              checked={checkoutOption === "existing"}
                              value={checkoutOption}
                              onChange={() => setCheckoutOption("existing")}
                            />
                            <label htmlFor="bill1" style={{ marginBottom: 0 }}>
                              I want to use an existing address
                            </label>
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: 20,
                            }}
                          >
                            <input
                              type="radio"
                              id="bill2"
                              name="radio-group"
                              style={{
                                width: "20px",
                                height: "20px",
                                backgroundSize: "cover",
                              }}
                              checked={checkoutOption === "new"}
                              value={checkoutOption}
                              onChange={() => setCheckoutOption("new")}
                            />
                            <label htmlFor="bill2" style={{ marginBottom: 0 }}>
                              I want to use new address
                            </label>
                          </span>
                        </span>
                        {checkoutOption === "new" && (
                          <div className="ec-check-bill-form mt-10">
                            <form onSubmit={handleSubmit}>
                              <AddressForm handleChange={handleChange} />
                              <button type="submit" className="btn btn-primary">
                                {addressLoading ? (
                                  <ClipLoader />
                                ) : (
                                  "Add new address"
                                )}
                              </button>
                            </form>
                          </div>
                        )}

                        {checkoutOption === "existing" &&
                          (addresses.length !== 0 ? (
                            addresses.map((add) => (
                              <AddressDetails
                                key={add.id}
                                id={add.id!}
                                addressType={add.addressType}
                                city={add.city}
                                country={add.country}
                                postalCode={add.postalCode}
                                state={add.state}
                                street={add.street}
                                selected={selectedAddress === add.id}
                                onSelect={(id) => setSelectedAddress(id)}
                                firstName={add.firstName}
                                lastName={add.lastName}
                              />
                            ))
                          ) : (
                            <NoDataFound
                              title="No Address Found"
                              message="Please add a new address to proceed with the checkout."
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                  <span className="ec-check-order-btn d-none d-lg-block">
                    <a className="btn btn-primary" onClick={handleOrder}>
                      {ordersLoading ? <ClipLoader /> : "Place Order"}
                    </a>
                  </span>
                </div>
              </div>
              {/*cart content End */}
            </div>
            {/* Sidebar Area Start */}
            <div className="ec-checkout-rightside col-lg-4 col-md-12">
              <div className="ec-sidebar-wrap">
                {/* Sidebar Summary Block */}
                <div className="ec-sidebar-block">
                  <div className="ec-sb-title">
                    <h3 className="ec-sidebar-title">Summary</h3>
                  </div>
                  <div className="ec-sb-block-content">
                    <div className="ec-checkout-summary">
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
                            className="ec-checkout-coupan-content"
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
                      <div className="ec-checkout-summary-total">
                        <span className="text-left">Total Amount</span>
                        <span className="text-right">
                          {" "}
                          {CURRENCY + totalAmount}
                        </span>
                      </div>
                    </div>
                    <div className="ec-checkout-pro">
                      {cart?.cartItems.map((item) => (
                        <div className="col-sm-12 mb-6" key={item.id}>
                          <div className="ec-product-inner">
                            <div className="ec-pro-image-outer">
                              <div className="ec-pro-image">
                                <a
                                  href="product-left-sidebar.html"
                                  className="image"
                                >
                                  <img
                                    className="main-image"
                                    src={getImageUrl(item.product.thumbnail)}
                                    alt="Product"
                                  />
                                  <img
                                    className="hover-image"
                                    src={getImageUrl(item.product.imageUrls[0])}
                                    alt="Product"
                                  />
                                </a>
                              </div>
                            </div>
                            <div className="ec-pro-content">
                              <h5 className="ec-pro-title">
                                <a href="product-left-sidebar.html">
                                  {item.product.name}
                                </a>
                              </h5>
                              {item.product.rating ? (
                                <div className="ec-pro-rating">
                                  {Array.from({ length: 5 }, (_, index) => (
                                    <i
                                      key={index}
                                      className={`ecicon eci-star ${
                                        index < item.product.rating!
                                          ? "fill"
                                          : ""
                                      }`}
                                    ></i>
                                  ))}
                                </div>
                              ) : null}
                              <span className="ec-price">
                                <span className="old-price">
                                  {CURRENCY}
                                  {getPrice(item.product)}
                                </span>
                                <span className="new-price">
                                  {CURRENCY + item.product.price}
                                </span>
                              </span>
                              <div className="ec-pro-option">
                                <div className="ec-pro-color">
                                  <span className="ec-pro-opt-label">
                                    Color
                                  </span>
                                  <ul className="ec-opt-swatch ec-change-img">
                                    {item.product.colors.map((color) => (
                                      <li className="active">
                                        <span
                                          className="ec-opt-clr-img"
                                          data-tooltip={color}
                                        >
                                          <span
                                            style={{
                                              backgroundColor: color,
                                            }}
                                          />
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="ec-pro-size">
                                  <span className="ec-pro-opt-label">Size</span>
                                  <ul className="ec-opt-size">
                                    {item.product.sizes.map((size) => (
                                      <li className="">
                                        <a className="ec-opt-sz">{size}</a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Sidebar Summary Block */}
              </div>
              <div className="ec-sidebar-wrap ec-checkout-pay-wrap mt-4">
                {/* Sidebar Payment Block */}
                <div className="ec-sidebar-block">
                  <div className="ec-sb-title">
                    <h3 className="ec-sidebar-title">Payment Method</h3>
                  </div>
                  <div className="ec-sb-block-content">
                    <div className="ec-checkout-pay">
                      <div className="ec-pay-desc">
                        Please select the preferred payment method to use on
                        this order.
                      </div>
                      {/* <form action="#"> */}
                      <span className="ec-pay-option d-flex align-items-center gap-5 mb-2">
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                          }}
                        >
                          <input
                            type="radio"
                            id="pay1"
                            name="payment"
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundSize: "cover",
                            }}
                            checked={
                              selectedPaymentMethod === PaymentMethod.COD
                            }
                            onChange={() =>
                              setSelectedPaymentMethod(PaymentMethod.COD)
                            }
                          />
                          <label
                            htmlFor="pay1"
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            Cash On Delivery
                          </label>
                        </span>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 20,
                          }}
                        >
                          <input
                            type="radio"
                            id="pay2"
                            name="payment"
                            style={{
                              width: "20px",
                              height: "20px",
                              backgroundSize: "cover",
                            }}
                            checked={
                              selectedPaymentMethod === PaymentMethod.RAZORPAY
                            }
                            onChange={() =>
                              setSelectedPaymentMethod(PaymentMethod.RAZORPAY)
                            }
                          />
                          <label
                            htmlFor="pay2"
                            style={{
                              marginBottom: 0,
                            }}
                          >
                            Razor Pay
                          </label>
                        </span>
                      </span>

                      <span className="ec-pay-commemt">
                        <span className="ec-pay-opt-head">
                          Add Comments About Your Order
                        </span>
                        <textarea
                          name="your-commemt"
                          placeholder="Comments"
                          defaultValue={orderComment!}
                          onChange={(e) => setOrderComment(e.target.value)}
                        />
                      </span>
                      <span className="ec-pay-agree">
                        <input
                          type="checkbox"
                          checked={agreedTerms}
                          onChange={() => setAgreedTerms(true)}
                        />
                        <a href="#">
                          I have read and agree to the{" "}
                          <span>Terms &amp; Conditions</span>
                        </a>
                        <span className="checked" />
                      </span>
                      {/* </form> */}
                    </div>
                  </div>
                </div>
                {/* Sidebar Payment Block */}
              </div>
              <div className="ec-sidebar-wrap ec-check-pay-img-wrap mt-4">
                {/* Sidebar Payment Block */}
                <div className="ec-sidebar-block">
                  <div className="ec-sb-title">
                    <h3 className="ec-sidebar-title">Payment Method</h3>
                  </div>
                  <div className="ec-sb-block-content">
                    <div className="ec-check-pay-img-inner">
                      <div className="ec-check-pay-img">
                        <img src="assets/images/icons/payment1.png" alt="" />
                      </div>
                      <div className="ec-check-pay-img">
                        <img src="assets/images/icons/payment2.png" alt="" />
                      </div>
                      <div className="ec-check-pay-img">
                        <img src="assets/images/icons/payment3.png" alt="" />
                      </div>
                      <div className="ec-check-pay-img">
                        <img src="assets/images/icons/payment4.png" alt="" />
                      </div>
                      <div className="ec-check-pay-img">
                        <img src="assets/images/icons/payment5.png" alt="" />
                      </div>
                      <div className="ec-check-pay-img">
                        <img src="assets/images/icons/payment6.png" alt="" />
                      </div>
                      <div className="ec-check-pay-img">
                        <img src="assets/images/icons/payment7.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Sidebar Payment Block */}
              </div>{" "}
              <span className="ec-check-order-btn d-lg-none mt-5 float-end">
                <a className="btn btn-primary" onClick={handleOrder}>
                  {ordersLoading ? <ClipLoader /> : "Place Order"}
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CheckoutPage;
