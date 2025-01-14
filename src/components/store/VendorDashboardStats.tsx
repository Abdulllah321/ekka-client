import React from "react";
import { CURRENCY } from "../../constants";

interface DashboardStats {
  products: number;
  ordersReceivedToday: number;
  totalEarnings: number;
  totalProductsSold: number;
}

interface VendorDashboardStatsProps {
  stats: DashboardStats;
}

const VendorDashboardStats: React.FC<VendorDashboardStatsProps> = ({
  stats,
}) => {
  return (
    <div className="row">
      <div className="col-lg-3 col-md-6">
        <div className="ec-vendor-dashboard-sort-card color-blue">
          <h5>Products</h5>
          <h3>{stats.products}</h3>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="ec-vendor-dashboard-sort-card color-pink">
          <h5>Orders Today</h5>
          <h3>{stats.ordersReceivedToday}</h3>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="ec-vendor-dashboard-sort-card color-green">
          <h5>Total Earnings</h5>
          <h3>{CURRENCY}{stats.totalEarnings.toFixed(2)}</h3>
        </div>
      </div>
      <div className="col-lg-3 col-md-6">
        <div className="ec-vendor-dashboard-sort-card color-orange">
          <h5>Total Products Sold</h5>
          <h3>{stats.totalProductsSold}</h3>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboardStats;
