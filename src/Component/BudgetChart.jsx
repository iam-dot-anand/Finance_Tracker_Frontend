import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BudgetChart({ data }) {
  const chartData = {
    labels: data.map((item) => item.category),
    datasets: [
      {
        label: "Budget",
        data: data.map((item) => item.budget),
        backgroundColor: "blue",
      },
      {
        label: "Spent",
        data: data.map((item) => item.spent),
        backgroundColor: "red",
      },
    ],
  };

  return <Bar data={chartData} />;
}