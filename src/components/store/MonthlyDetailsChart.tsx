import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EnhancedChart: React.FC = () => {
  const data = {
    labels: ["Orders", "Earnings ($)", "Products Sold"],
    datasets: [
      {
        label: "Current Month Stats",
        data: [1, 764 / 100, 1], // Scale earnings for visualization
        backgroundColor: ["#2196f3", "#ff6191", "#33317d"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Current Month Performance",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (context.label === "Earnings ($)") {
              return `Earnings: $${context.raw * 100}`; // Reverse scaling for tooltip
            }
            return `${context.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="ec-vendor-card-body">
      <Bar data={data} options={options} />
    </div>
  );
};

export default EnhancedChart;
