import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useAppDispatch, useAppSelector } from "../../store";
import { Store } from "../../utils/types";
import { fetchUserStores } from "../../slices/storeSlice";

// Register the necessary Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface GrowthState {
  labels: string[];
  uploads: number[];
  earnings: number[];
  sales: number[];
  returns: number[];
}

const DynamicGrowthChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const [growthState, setGrowthState] = useState<GrowthState>({
    labels: [],
    uploads: [],
    earnings: [],
    sales: [],
    returns: [],
  });
  const { userStore, orders } = useAppSelector((state) => state.store);

  // Function to get the last 12 months excluding the current month
  const getLast12Months = () => {
    const currentDate = new Date();
    const labels: string[] = [];
    for (let i = 0; i < 12; i++) {
      const month = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      labels.unshift(
        month.toLocaleString("default", { month: "short", year: "2-digit" })
      );
    }
    return labels;
  };

  useEffect(() => {
    if (userStore && orders) processDynamicData(userStore, orders);
  }, [userStore, orders]);

  // Function to process dynamic data
  const processDynamicData = (store: Store, orders: any[]) => {
    const labels = getLast12Months();
    const uploads: number[] = Array(12).fill(0);
    const earnings: number[] = Array(12).fill(0);
    const sales: number[] = Array(12).fill(0);
    const returns: number[] = Array(12).fill(0);

    store.products.forEach((product: any) => {
      const createdAt = new Date(product.createdAt);
      const monthIndex = labels.findIndex((label) =>
        label.startsWith(
          createdAt.toLocaleString("default", { month: "short" })
        )
      );
      if (monthIndex !== -1) {
        uploads[monthIndex]++;
      }
    });

    
    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const monthIndex = labels.findIndex((label) =>
        label.startsWith(
          createdAt.toLocaleString("default", { month: "short" })
        )
      );
      if (monthIndex !== -1) {
        earnings[monthIndex] += order.totalAmount;
        sales[monthIndex] += order.orderItems.length;
        returns[monthIndex] += Math.floor(order.orderItems.length * 0.1);
      }
    });

    setGrowthState({ labels, uploads, earnings, sales, returns });
  };

  useEffect(() => {
    dispatch(fetchUserStores());
  }, [dispatch]);

  // Chart data
  const data = {
    labels: growthState.labels,
    datasets: [
      {
        label: "Uploads",
        data: growthState.uploads,
        fill: false,
        borderColor: "#2196f3",
        backgroundColor: "#2196f3",
        borderWidth: 1,
      },
      {
        label: "Earnings",
        data: growthState.earnings,
        fill: false,
        borderColor: "#ff6191",
        backgroundColor: "#ff6191",
        borderWidth: 1,
      },
      {
        label: "Sales",
        data: growthState.sales,
        fill: false,
        borderColor: "#33317d",
        backgroundColor: "#33317d",
        borderWidth: 1,
      },
      {
        label: "Returns",
        data: growthState.returns,
        fill: false,
        borderColor: "#f79165",
        backgroundColor: "#f79165",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="ec-vendor-card-body">
      <Line data={data} options={options} />
    </div>
  );
};

export default DynamicGrowthChart;
