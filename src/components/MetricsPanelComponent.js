import React, { useState, useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const MetricsPanelComponent = ({
  metrics = { labels: [], reach: [], growth: [], engagement: [] },
}) => {
  const [currentMetric, setCurrentMetric] = useState("reach");

  const handleMetricChange = (metric) => {
    setCurrentMetric(metric);
  };

  // Memoiza os dados do gráfico para evitar recriações desnecessárias
  const chartData = useMemo(() => {
    return {
      labels: metrics.labels || [],
      datasets: [
        {
          label: currentMetric,
          data: metrics[currentMetric] || [],
          backgroundColor: [
            "#4caf50",
            "#ff9800",
            "#f44336",
            "#2196f3",
            "#9c27b0",
          ],
          borderColor: "#ffffff",
          borderWidth: 1,
        },
      ],
    };
  }, [metrics, currentMetric]);

  return (
    <div className=" max-w-3xl mx-auto p-4 bg-gray-100 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-4 text-center">Painel de Métricas</h2>
      <div className="flex justify-center gap-2 mb-4">
        {["reach", "growth", "engagement"].map((metric) => (
          <button
            key={metric}
            className={`px-3 py-1 rounded ${
              currentMetric === metric
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => handleMetricChange(metric)}
          >
            {metric === "reach"
              ? "Alcance"
              : metric === "growth"
              ? "Crescimento"
              : "Engajamento"}
          </button>
        ))}
      </div>
      <div className="chart-container">
        {currentMetric === "reach" && <Bar data={chartData} />}
        {currentMetric === "growth" && <Pie data={chartData} />}
        {currentMetric === "engagement" && <Bar data={chartData} />}
      </div>
    </div>
  );
};

export default MetricsPanelComponent;
