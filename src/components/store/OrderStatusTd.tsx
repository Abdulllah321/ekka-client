import { useState } from "react";
import { updateOrderStatus } from "../../slices/orderSlice";
import { AppDispatch } from "../../store";
import toast from "react-hot-toast";
import { Order, OrderStatus } from "../../utils/types";
import { fetchUserStores } from "../../slices/storeSlice";

const OrderStatusTd = ({
  order,
  dispatch,
}: {
  order: Order;
  dispatch: AppDispatch;
}) => {
  const [isStatusEdit, setIsStatusEdit] = useState<boolean>(false);
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(order.status!);

  const getBadgeStyle = (status: OrderStatus): React.CSSProperties => {
    switch (status) {
      case OrderStatus.pending:
        return { backgroundColor: "#ffc107", color: "#fff" }; // badge-warning
      case OrderStatus.processing:
        return { backgroundColor: "#17a2b8", color: "#fff" }; // badge-info
      case OrderStatus.outForDelivery:
        return { backgroundColor: "#007bff", color: "#fff" }; // badge-primary
      case OrderStatus.shipped:
        return { backgroundColor: "#6c757d", color: "#fff" }; // badge-secondary
      case OrderStatus.delivered:
        return { backgroundColor: "#28a745", color: "#fff" }; // badge-success
      case OrderStatus.cancelled:
        return { backgroundColor: "#dc3545", color: "#fff" }; // badge-danger
      default:
        return { backgroundColor: "#f8f9fa", color: "#000" }; // badge-light
    }
  };

  const handleUpdateOrderStatus = async (
    orderId: string,
    newStatus: OrderStatus
  ) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status: newStatus }));
      await dispatch(fetchUserStores())
    } catch (error) {
      console.error("Failed to update order status", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <td onDoubleClick={() => setIsStatusEdit(true)}>
      <span
        className="mb-2 mr-2 badge px-2 py-0 "
        style={getBadgeStyle(order.status!)}
      >
        {isStatusEdit ? (
          <select
            value={orderStatus}
            onChange={(e) => setOrderStatus(e.target.value as OrderStatus)}
            onBlur={() => {
              handleUpdateOrderStatus(order.id!, orderStatus);
              setIsStatusEdit(false);
            }}
            autoFocus
          >
            <option value={OrderStatus.pending}>Pending</option>
            <option value={OrderStatus.processing}>Processing</option>
            <option value={OrderStatus.outForDelivery}>Out for Delivery</option>
            <option value={OrderStatus.shipped}>Shipped</option>
            <option value={OrderStatus.delivered}>Delivered</option>
          </select>
        ) : (
          order.status
        )}
      </span>
    </td>
  );
};

export default OrderStatusTd;
