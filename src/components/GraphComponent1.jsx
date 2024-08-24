import React, { useEffect, useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import api from "../utils/api";

ChartJS.register(
  LineElement,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const GraphComponent1 = () => {
  // Initialize the data with an empty datasets array
  const [lineData, setLineData] = useState({
    labels: [],
    datasets: [],
  });
  const [barData, setBarData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    fetchLineData();
    fetchBarData();
  }, []);

  const fetchLineData = async () => {
    try {
      const response = await api.get('/api/auth/total-issues');
      const totalIssues = response.data.totalIssues;
      console.log(totalIssues)

      // Update line data with fetched total issues
      setLineData({
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [
          {
            label: "Total Issues",
            type: "line",
            data: [totalIssues, totalIssues, totalIssues, totalIssues, totalIssues, totalIssues, totalIssues], // Example data
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            yAxisID: "y-axis-1",
          },
        ],
      });
    } catch (err) {
      console.error("Error fetching line data", err);
    }
  };

  const fetchBarData = async () => {
    try {
      const response = await api.get('/api/auth/issues-status');
      const issuesStatus = response.data;

      setBarData({
        labels: ["Pending", "Open", "Pending Approval","Resolved","Rejected"],
        datasets: [
          {
            label: "Issues WIP",
            type: "bar",
            data: [
              issuesStatus["Pending"] || 0,
              issuesStatus["Open"] || 0,
              issuesStatus["Pending Approval"] || 0,
              issuesStatus["Resolved"] || 0,
              issuesStatus['Rejected'] || 0
            ],
            fill: false,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgba(54, 162, 235, 1)",
            yAxisID: "y-axis-1",
          },
        ],
      });
    } catch (err) {
      console.error("Error fetching bar data", err);
    }
  };

  return (
    <div className="mt-20">
      <div className="bg-white p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg text-black font-semibold">Issues Impacted</h2>
                <hr className="h-px bg-black border-0"></hr>
              </div>
              <select className="border border-black text-black p-1 rounded">
                <option>Day</option>
                <option selected>Week</option>
                <option>Month</option>
              </select>
            </div>
            {lineData.datasets.length > 0 && <Line data={lineData} />}
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-lg text-black font-semibold">Issues WIP</h2>
                <hr className="h-px bg-black border-0" />
              </div>
              <select className="border text-black border-black p-1 rounded">
                <option>This Week</option>
                <option>Last Week</option>
                <option>This Month</option>
              </select>
            </div>
            {barData.datasets.length > 0 && <Bar data={barData} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphComponent1;
