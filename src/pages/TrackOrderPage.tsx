import { Link, useParams } from "react-router-dom";
import Layout from "../components/common/Layout";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrderById, updateOrderStatus } from "../slices/orderSlice";
import NoDataFound from "../components/common/NoDataFound";
import Loader from "../components/common/Loader";
import { OrderStatus } from "../utils/types";
import { CURRENCY, getImageUrl, getPrice } from "../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFileInvoice } from "react-icons/fa";
const TrackOrderPage = () => {
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

  const orderSteps = [
    OrderStatus.pending,
    OrderStatus.processing,
    OrderStatus.outForDelivery,
    OrderStatus.shipped,
    OrderStatus.delivered,
  ];
  return (
    <Layout>
      <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                  <h2 className="ec-breadcrumb-title">Track Order</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  {/* ec-breadcrumb-list start */}
                  <ul className="ec-breadcrumb-list">
                    <li className="ec-breadcrumb-item">
                      <a href="index.html">Home</a>
                    </li>
                    <li className="ec-breadcrumb-item active">Track</li>
                  </ul>
                  {/* ec-breadcrumb-list end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="ec-page-content section-space-p">
        <div className="container">
          {/* Track Order Content Start */}
          <div className="ec-trackorder-content col-md-12">
            <div className="ec-trackorder-inner">
              <div className="ec-trackorder-top">
                <h2 className="ec-order-id">order #{currentOrder.id}</h2>
                <div className="ec-order-detail">
                  {" "}
                  {currentOrder.status === OrderStatus.pending && (
                    <button
                      className="btn btn-danger"
                      style={{ float: "right" }}
                      onClick={() => async () => {
                        updateOrderStatus({
                          orderId: currentOrder.id!,
                          status: OrderStatus.cancelled,
                        });
                      }}
                    >
                      Cancel
                    </button>
                  )}
                  <div>
                    Expected arrival{" "}
                    {new Date(
                      currentOrder?.expectedDeliveryDate ?? ""
                    ).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
              <div className="ec-trackorder-bottom">
                <div className="ec-progress-track">
                  {currentOrder.status !== OrderStatus.cancelled ? (
                    <ul id="ec-progressbar">
                      {orderSteps.map((orderStep, index) => {
                        const isActive =
                          index <= orderSteps.indexOf(currentOrder.status!);
                        return (
                          <li
                            className={`step0 ${isActive ? "active" : ""}`}
                            key={index}
                          >
                            <span className="ec-track-icon">
                              <img
                                src={`/assets/images/icons/track_${
                                  index + 1
                                }.png`}
                                alt="track_order"
                              />
                            </span>
                            <span className="ec-progressbar-track" />
                            <span className="ec-track-title">
                              {" "}
                              {orderStep.replace(/([A-Z])/g, " $1")}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <NoDataFound
                      title="Order Cancelled"
                      message="The order has been cancelled."
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className="ec-odr-dtl card card-default mt-5">
                <div
                  className="card-header card-header-border-bottom"
                  style={{
                    borderBottom: "1px solid #f3f3f3",
                    padding: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    WebkitBoxAlign: "center",
                    alignItems: "center",
                    backgroundColor: "#ffffff",
                    borderRadius: "15px 15px 0 0",
                  }}
                >
                  <h2
                    className="ec-odr d-flex justify-content-between w-100"
                    style={{ fontSize: "18px", fontWeight: 600 }}
                  >
                    Order Detail
                    <br />
                    <span className="small">Order ID: #{currentOrder?.id}</span>
                  </h2>{" "}
                </div>
                <Link to={`/invoice/${id}`}>
                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: "10px", width: "calc(100% - 20px)" }}
                  >
                    <FaFileInvoice style={{ marginRight: "8px" }} />
                    Generate Invoice
                  </button>
                </Link>
                <div className="card-body">
                  <div
                    className="row"
                    style={{
                      rowGap: "20px",
                    }}
                  >
                    <div className="col-xl-3 col-lg-6">
                      <address
                        className="info-grid rounded-4"
                        style={{
                          fontStyle: "normal",
                          lineHeight: "inherit",
                          border: "1px solid #e1e2e6",
                          height: "100%",
                          borderRadius: "15px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          className="info-title"
                          style={{
                            width: "100%",
                            textAlign: "center",
                            display: "inline-block",
                            background: "#f7f7f7",
                            padding: "10px",
                            color: "#56606e",
                          }}
                        >
                          <strong>Customer:</strong>
                        </div>
                        <br />
                        <div
                          className="info-content "
                          style={{ padding: "10px" }}
                        >
                          {currentOrder?.user?.firstName}{" "}
                          {currentOrder?.user?.lastName}
                          <br />
                          {currentOrder.user?.email}
                          <br />
                          <abbr title="Phone">Phone: </abbr>
                          {currentOrder.user?.phoneNumber}
                        </div>
                      </address>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                      <address
                        className="info-grid"
                        style={{
                          fontStyle: "normal",
                          lineHeight: "inherit",
                          border: "1px solid #e1e2e6",
                          height: "100%",
                          borderRadius: "15px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          className="info-title"
                          style={{
                            width: "100%",
                            textAlign: "center",
                            display: "inline-block",
                            background: "#f7f7f7",
                            padding: "10px",
                            color: "#56606e",
                          }}
                        >
                          <strong>Shipped To:</strong>
                        </div>
                        <br />
                        <div
                          className="info-content "
                          style={{ padding: "10px" }}
                        >
                          <span
                            className="badge badge-primary"
                            style={{
                              float: "right",
                            }}
                          >
                            {currentOrder.selectedAddress?.addressType}
                          </span>
                          {currentOrder.selectedAddress?.firstName}{" "}
                          {currentOrder.selectedAddress?.lastName}
                          <br />
                          {currentOrder.selectedAddress?.street},{" "}
                          {currentOrder.selectedAddress?.city},{" "}
                          {currentOrder.selectedAddress?.state},{" "}
                          {currentOrder.selectedAddress?.postalCode},{" "}
                          {currentOrder.selectedAddress?.country}
                        </div>
                      </address>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                      <address
                        className="info-grid"
                        style={{
                          fontStyle: "normal",
                          lineHeight: "inherit",
                          border: "1px solid #e1e2e6",
                          height: "100%",
                          borderRadius: "15px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          className="info-title"
                          style={{
                            width: "100%",
                            textAlign: "center",
                            display: "inline-block",
                            background: "#f7f7f7",
                            padding: "10px",
                            color: "#56606e",
                          }}
                        >
                          <strong>Payment Method:</strong>
                        </div>
                        <br />
                        <div
                          className="info-content "
                          style={{ padding: "10px" }}
                        >
                          {currentOrder.selectedPaymentMethod}
                        </div>
                      </address>
                    </div>
                    <div className="col-xl-3 col-lg-6">
                      <address
                        className="info-grid"
                        style={{
                          fontStyle: "normal",
                          lineHeight: "inherit",
                          border: "1px solid #e1e2e6",
                          height: "100%",
                          borderRadius: "15px",
                          overflow: "hidden",
                        }}
                      >
                        <div
                          className="info-title"
                          style={{
                            width: "100%",
                            textAlign: "center",
                            display: "inline-block",
                            background: "#f7f7f7",
                            padding: "10px",
                            color: "#56606e",
                          }}
                        >
                          <strong>Order Date:</strong>
                        </div>
                        <br />
                        <div
                          className="info-content "
                          style={{ padding: "10px" }}
                        >
                          {new Date(
                            currentOrder.createdAt!
                          )?.toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                      </address>
                    </div>

                    {currentOrder.orderComment && (
                      <div className="col-xl-3 col-lg-6">
                        <address
                          className="info-grid"
                          style={{
                            fontStyle: "normal",
                            lineHeight: "inherit",
                            border: "1px solid #e1e2e6",
                            height: "100%",
                            borderRadius: "15px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            className="info-title"
                            style={{
                              width: "100%",
                              textAlign: "center",
                              display: "inline-block",
                              background: "#f7f7f7",
                              padding: "10px",
                              color: "#56606e",
                            }}
                          >
                            <strong>Extra Message:</strong>
                          </div>
                          <br />
                          <div
                            className="info-content "
                            style={{ padding: "10px" }}
                          >
                            {currentOrder.orderComment}
                          </div>
                        </address>
                      </div>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-12">
                      <h3
                        className="tbl-title"
                        style={{
                          marginTop: "30px",
                          border: "1px solid #f7f7f7",
                          textAlign: "center",
                          padding: "10px",
                          marginBottom: "20px",
                          background: "#f7f7f7",
                          color: "#2b2b2b",
                          fontSize: "15px",
                        }}
                      >
                        PRODUCT SUMMARY
                      </h3>
                      <div className="table-responsive">
                        <table className="table table-striped o-tbl">
                          <thead>
                            <tr className="line">
                              <td>
                                <strong>#</strong>
                              </td>
                              <td className="text-center">
                                <strong>IMAGE</strong>
                              </td>
                              <td className="text-center">
                                <strong>PRODUCT</strong>
                              </td>
                              <td className="text-center">
                                <strong>PRICE/UNIT</strong>
                              </td>
                              <td className="text-right">
                                <strong>QUANTITY</strong>
                              </td>
                              <td className="text-right">
                                <strong>SUBTOTAL</strong>
                              </td>
                            </tr>
                          </thead>
                          <tbody>
                            {currentOrder.orderItems?.map((order, index) => (
                              <tr>
                                <td>{index + 1}</td>
                                <td>
                                  <img
                                    className="product-img"
                                    style={{
                                      width: "50px",
                                      borderRadius: "15px",
                                    }}
                                    src={getImageUrl(order.product?.thumbnail!)}
                                    alt=""
                                  />
                                </td>
                                <td>
                                  <strong>{order.product?.name}</strong>
                                  <br />
                                  {order.product?.shortDesc}
                                </td>
                                <td className="text-center">
                                  {CURRENCY}
                                  {getPrice(order.product!)}
                                </td>
                                <td className="text-center">
                                  {order.quantity}
                                </td>
                                <td className="text-right">
                                  {" "}
                                  {CURRENCY}
                                  {order.price}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Track Order Content end */}
        </div>
      </section>
    </Layout>
  );
};

export default TrackOrderPage;
