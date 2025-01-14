import { useEffect } from "react";
import VendorLayout from "../../components/common/VendorLayout";
import LatestOrder from "../../components/store/VendorOrders";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchStoreOrders, fetchUserStores } from "../../slices/storeSlice";

const OrdersPage = () => {
  const dispatch = useAppDispatch();
  const { orders, loading, userStore } = useAppSelector((state) => state.store);
  useEffect(() => {
    dispatch(fetchUserStores());
  }, [dispatch]);

  useEffect(() => {
    if (userStore) dispatch(fetchStoreOrders(userStore?.id as string));
  }, [userStore]);

  return (
    <VendorLayout>
      <LatestOrder loading={loading} orders={orders} title="Orders" />
    </VendorLayout>
  );
};

export default OrdersPage;
