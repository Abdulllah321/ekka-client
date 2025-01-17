import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import VendorDashboardStats from "../../components/store/VendorDashboardStats";
import LatestOrder from "../../components/store/VendorOrders";
import ProductList from "../../components/store/VendorProductList";
import DynamicGrowthChart from "../../components/store/GrowthChart";
import MonthlyDetailsChart from "../../components/store/MonthlyDetailsChart"; // New Chart Component
import { fetchStoreOrders, fetchUserStores } from "../../slices/storeSlice";
import VendorLayout from "../../components/common/VendorLayout";

const VendorDashboardPage = () => {
  const { userStore, loading, orders } = useAppSelector((state) => state.store);
  const navigate = useNavigate();

  // Redirect if the store is not set up yet
  if (!loading && !userStore) {
    return <Navigate to={`/setup-store`} />;
  }

  const dispatch = useAppDispatch();

  // Fetch the user's store and orders
  useEffect(() => {
    dispatch(fetchUserStores());
  }, [dispatch]);

  useEffect(() => {
    if (userStore) dispatch(fetchStoreOrders(userStore?.id));
  }, [userStore]);

  // Calculate dynamic stats based on the orders
  const totalEarnings =
    orders?.reduce((acc, order) => acc + order.totalAmount, 0) || 0;
  const ordersReceivedToday =
    orders?.filter(
      (order) =>
        new Date(order.createdAt!).toDateString() === new Date().toDateString()
    ).length || 0;
  const totalProductsSold =
    orders?.reduce(
      (acc, order) =>
        order.status === "delivered"
          ? acc + (order.orderItems?.length || 0)
          : acc,
      0
    ) || 0;

  // Calculate current month stats
  // const currentMonth = new Date().getMonth();
  // const currentMonthOrders =
  //   orders?.filter(
  //     (order) => new Date(order.createdAt!).getMonth() === currentMonth
  //   ) || [];
  // const currentMonthEarnings = currentMonthOrders.reduce(
  //   (acc, order) => acc + order.totalAmount,
  //   0
  // );
  // const currentMonthProductsSold = currentMonthOrders.reduce(
  //   (acc, order) => acc + (order.orderItems?.length || 0),
  //   0
  // );

  const storeStats = {
    products: userStore?.products?.length || 0,
    ordersReceivedToday,
    totalEarnings,
    totalProductsSold,
  };

  // const currentMonthStats = {
  //   orders: currentMonthOrders.length,
  //   earnings: currentMonthEarnings,
  //   productsSold: currentMonthProductsSold,
  // };

  return (
    <VendorLayout>
      <VendorDashboardStats stats={storeStats} />
      <LatestOrder
        orders={orders!}
        onViewAll={() => navigate("/vendor/orders")}
        loading={loading}
      />
      <ProductList
        products={userStore?.products!}
        onViewAll={() => navigate("/vendor/products")}
        onAddProduct={() => navigate("/product-form")}
      />
      <div className="ec-vendor-dashboard-card">
        <div className="ec-vendor-card-header">
          <h5>Growth Statistics</h5>
          <div className="ec-header-btn">
            <a className="btn btn-lg btn-primary" href="#">
              View All
            </a>
          </div>
        </div>
        <DynamicGrowthChart />
      </div>
      <div className="ec-vendor-dashboard-card">
        <div className="ec-vendor-card-header">
          <h5>Current Month Details</h5>
        </div>
        <MonthlyDetailsChart />
      </div>
    </VendorLayout>
  );
};

export default VendorDashboardPage;
