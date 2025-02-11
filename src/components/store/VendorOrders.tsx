import React from "react";
import { Order } from "../../utils/types";
import { getImageUrl } from "../../constants";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import OrderStatusTd from "./OrderStatusTd";
import { useAppDispatch } from "../../store";
import { useCurrency } from "../../context/CurrencyContext.tsx";

interface LatestOrderProps {
  orders: Order[];
  onViewAll?: () => void; // Callback for "View All" button
  loading: boolean; // Loading state
  title?: string;
}

const LatestOrder: React.FC<LatestOrderProps> = ({
  orders,
  onViewAll,
  loading,
  title = "Latest Order",
}) => {
  const dispatch = useAppDispatch();
  const { formatPrice } = useCurrency();

  return (
    <div className="ec-vendor-dashboard-card space-bottom-30">
      <div className="ec-vendor-card-header">
        <h5>{title}</h5>
        {onViewAll && (
          <div className="ec-header-btn">
            <button className="btn btn-lg btn-primary" onClick={onViewAll}>
              View All
            </button>
          </div>
        )}
      </div>
      <div className="ec-vendor-card-body">
        <div className="ec-vendor-card-table">
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <table className="table ec-table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Image</th>
                  <th scope="col">Name</th>
                  <th scope="col">Method</th>
                  <th scope="col">Status</th>
                  <th scope="col">Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order) =>
                    order?.orderItems?.map((orderItem) => (
                      <tr key={order.id}>
                        <th scope="row">
                          <span>{order.id}</span>
                        </th>
                        <td>
                          <img
                            className="prod-img"
                            src={getImageUrl(orderItem?.product?.thumbnail!)}
                            alt={orderItem?.productId}
                          />
                        </td>
                        <td>
                          <span>{orderItem?.product?.name}</span>{" "}
                        </td>
                        <td>
                          <span>{order.selectedPaymentMethod}</span>
                        </td>
                        <OrderStatusTd order={order} dispatch={dispatch} />
                        <td>
                          <span>
                            {formatPrice(order.totalAmount.toFixed(2))}
                          </span>
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
                    )),
                  )
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center">
                      No orders available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestOrder;
