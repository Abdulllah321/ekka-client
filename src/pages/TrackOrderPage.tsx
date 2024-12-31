import { useParams } from "react-router";
import Layout from "../components/common/Layout";
import { AppDispatch, useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../slices/orderSlice";
import NoDataFound from "../components/common/NoDataFound";
import Loader from "../components/common/Loader";
import { OrderStatus } from "../utils/types";

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
    "Out for Delivery",
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
                  {currentOrder.orderComment ? (
                    <div>
                      Order Comment{" "}
                      <strong>{currentOrder?.orderComment}</strong>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="ec-trackorder-bottom">
                <div className="ec-progress-track">
                  <ul id="ec-progressbar">
                    {orderSteps.map((orderStep, index) => {
                      const isActive =
                        index <= orderSteps.indexOf(currentOrder.status);
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
                          <span className="ec-track-title">{orderStep}</span>
                        </li>
                      );
                    })}
                  </ul>
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
