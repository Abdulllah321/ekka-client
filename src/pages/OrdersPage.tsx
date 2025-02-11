import { useDispatch } from "react-redux";
import Layout from "../components/common/Layout";
import { AppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { fetchOrderByUser } from "../slices/orderSlice";
import { Link } from "react-router-dom";
import { OrderStatus } from "../utils/types";
import { BsClock } from "react-icons/bs";
import {
  FaBoxOpen,
  FaCheckCircle,
  FaEye,
  FaShippingFast,
  FaTimesCircle,
  FaTruck,
} from "react-icons/fa";
import { formatDistanceToNow, differenceInDays } from "date-fns";
import { ProfileSidebar } from "./ProfilePage";
import { useCurrency } from "../context/CurrencyContext.tsx";

const OrdersPage = () => {
  const dispatch: AppDispatch = useDispatch();
  const { orders } = useAppSelector((state) => state.order);
  const { formatPrice } = useCurrency();

  useEffect(() => {
    dispatch(fetchOrderByUser());
  }, [dispatch]);

  const getStatusBadge = (status: OrderStatus) => {
    let badgeClass = "";
    let icon = null;

    switch (status) {
      case OrderStatus.pending:
        badgeClass = "bg-secondary text-white";
        icon = <BsClock className="mr-1" />;
        break;
      case OrderStatus.processing:
        badgeClass = "bg-info text-white";
        icon = <FaBoxOpen className="mr-1" />;
        break;
      case OrderStatus.outForDelivery:
        badgeClass = "bg-warning text-dark";
        icon = <FaTruck className="mr-1" />;
        break;
      case OrderStatus.shipped:
        badgeClass = "bg-primary text-white";
        icon = <FaShippingFast className="mr-1" />;
        break;
      case OrderStatus.delivered:
        badgeClass = "bg-success text-white";
        icon = <FaCheckCircle className="mr-1" />;
        break;
      case OrderStatus.cancelled:
        badgeClass = "bg-danger text-white";
        icon = <FaTimesCircle className="mr-1" />;
        break;
      default:
        badgeClass = "bg-secondary text-white";
    }

    return (
      <span className={`badge ${badgeClass} flex items-center`}>
        {icon}
        {status}
      </span>
    );
  };

  const formatDeliveryDate = (date: any) => {
    const parsedDate = new Date(date);
    const daysLeft = differenceInDays(parsedDate, new Date());

    if (daysLeft === 0) {
      return "Today";
    } else if (daysLeft === 1) {
      return "Tomorrow";
    } else if (daysLeft > 1) {
      return `${daysLeft} days left`;
    } else {
      return formatDistanceToNow(parsedDate, { addSuffix: true });
    }
  };

  const formatOrderDate = (date: any) => {
    return formatDistanceToNow(new Date(date), { addSuffix: true });
  };

  return (
    <Layout>
      {/* Breadcrumb Section */}
      <div className="ec-breadcrumb section-space-mb">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                  <h2 className="ec-breadcrumb-title">My Orders</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                  {/* ec-breadcrumb-list start */}
                  <ul className="ec-breadcrumb-list d-flex justify-content-end">
                    <li className="ec-breadcrumb-item">
                      <Link to="/" className="ec-breadcrumb-link">
                        Home
                      </Link>
                    </li>
                    <li className="ec-breadcrumb-item">
                      <Link to="/profile" className="ec-breadcrumb-link">
                        User Profile
                      </Link>
                    </li>
                    <li className="ec-breadcrumb-item active">My Orders</li>
                  </ul>
                  {/* ec-breadcrumb-list end */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
        <div className="container">
          <div className="row">
            {/* Sidebar */}
            {<ProfileSidebar />}

            {/* Orders Table Section */}
            <div className="ec-shop-rightside col-lg-9 col-md-12">
              {orders.length === 0 ? (
                <div className="alert alert-info">No orders found.</div>
              ) : (
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Order ID</th>
                      <th>Status</th>
                      <th>Total Items</th>
                      <th>Total Amount</th>
                      <th>Ordered At</th>
                      <th>Expected Delivery</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="align-middle">
                        <td>
                          <strong>{order.id}</strong>
                        </td>
                        <td>{getStatusBadge(order.status!)}</td>
                        <td>
                          <strong>{order.orderItems?.length!}</strong>
                        </td>
                        <td>
                          <strong>
                            {formatPrice(order.totalAmount.toFixed(2))}
                          </strong>
                        </td>
                        <td>{formatOrderDate(order.createdAt)}</td>
                        <td>
                          {formatDeliveryDate(order.expectedDeliveryDate)}
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Link
                              to={`/order/${order.id}`}
                              className="btn btn-sm btn-primary"
                              title="View Details"
                            >
                              <FaEye />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OrdersPage;
