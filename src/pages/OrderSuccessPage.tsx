import { Link, useParams } from "react-router-dom";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../slices/orderSlice";
import NoDataFound from "../components/common/NoDataFound";
import Loader from "../components/common/Loader";
import Layout from "../components/common/Layout";
import { CURRENCY } from "../constants";

const OrderSuccessPage = () => {
  const { id } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { currentOrder, loading } = useAppSelector((state) => state.order);
  useEffect(() => {
    dispatch(getOrderById(id!));
  }, [id]);

  if (!currentOrder)
    return (
      <NoDataFound
        title="Invalid Order"
        message="The order you requested does not exist or has been canceled."
        buttonLink="/shop"
        buttonText="Go back to Shop"
      />
    );

  if (loading) return <Loader />;

  const deliveryCharge =
    currentOrder.orderItems?.reduce(
      (total, item) => total + (item.product?.shippingFee || 100),
      0
    ) || 100;
  const subtotal =
    currentOrder.orderItems?.reduce((total, item) => total + item.price, 0) ||
    0;

  const discount = subtotal + deliveryCharge - currentOrder.totalAmount;

  return (
    <Layout>
      <div
        className="px-4 py-5 border rounded mx-lg-auto mx-5 my-5"
        style={{
          boxShadow: "box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;",
          maxWidth: 700,
        }}
      >
        <h5 className="text-uppercase">{`${currentOrder.selectedAddress?.firstName} ${currentOrder.selectedAddress?.lastName}`}</h5>
        <h4 className="mt-5 theme-color mb-5">Thanks for your order</h4>
        <span className="theme-color">Payment Summary</span>
        <div className="mb-3">
          <hr className="new1" />
        </div>
        {currentOrder.orderItems?.map((order) => (
          <div className="d-flex justify-content-between">
            <span className="font-weight-bold">
              {order.product?.name}(Qty:{order.quantity})
            </span>
            <span className="text-muted">{CURRENCY + order.price}</span>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <small>Shipping</small>
          <small>{CURRENCY + deliveryCharge}</small>
        </div>
        <div className="d-flex justify-content-between">
          <small>Discount</small>
          <small>{CURRENCY + discount.toFixed(2)}</small>
        </div>
        <div className="d-flex justify-content-between mt-3">
          <span className="font-weight-bold">Total</span>
          <span className="font-weight-bold theme-color">
            {CURRENCY + currentOrder.totalAmount}
          </span>
        </div>
        <div className="text-center mt-5">
          <Link to={`/order/${id}`} className="btn btn-primary">
            <button className="btn btn-primary">Track your order</button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccessPage;
