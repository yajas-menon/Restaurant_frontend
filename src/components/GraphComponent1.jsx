import React from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement
);

const GraphComponent1 = () => {
  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Line Dataset 1",
        type: "line",
        data: [23, 11, 22, 27, 13, 37, 21],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y-axis-1",
      },
      {
        label: "Line Dataset 2",
        type: "line",
        data: [30, 25, 36, 30, 45, 64, 52],
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        yAxisID: "y-axis-2",
      },
    ],
  };

  const options = {};

  const data1 = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Bar Dataset 1",
        type: "bar",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        yAxisID: "y-axis-1",
      },
      {
        label: "Line Dataset 2",
        type: "bar",
        data: [30, 50, 10, 60, 40, 70, 90],
        fill: false,
        borderColor: "rgba(54, 162, 235, 1)",
        yAxisID: "y-axis-2",
      },
    ],
  };

  const options1 = {
    scales: {
      yAxes: [
        {
          type: "linear",
          display: true,
          position: "left",
          id: "y-axis-1",
        },
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-2",
          gridLines: {
            drawOnChartArea: false,
          },
        },
      ],
    },
  };

  return (
    <div>
      <body class="bg-gray-900 p-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h2 class="text-lg text-white font-semibold">Issues Impacted</h2>
                <hr className="h-px bg-white border-0 "></hr>
              </div>
              <select class="border border-black text-black p-1 rounded">
                <option>Day</option>
                <option selected>Week</option>
                <option>Month</option>
              </select>
            </div>
            <Line data={data} options={options} />
          </div>

          <div class="bg-gray-800 p-6 rounded-lg shadow">
            <div class="flex justify-between items-center mb-4">
              <div>
                <h2 class="text-lg text-white font-semibold">Issues WIP</h2>
                <hr className="h-px bg-white border-0 " />
              </div>
              <select class="border text-black border-black p-1 rounded">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            <Bar data={data1} options={options1} />
          </div>
        </div>
      </body>
    </div>
  );
};

export default GraphComponent1;
