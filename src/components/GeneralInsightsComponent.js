import React from "react";
import { useSelector } from "react-redux";
import { Bar, Pie } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const GeneralInsightsComponent = ({ selectedDay }) => {
// Seleciona os planos do Redux e converte para array
const plans = useSelector((state) => 
  Object.values(state.plans).filter((plan) => plan.date === selectedDay)
);

// Log para depuração dos planos filtrados
console.log("Plans for selected day:", plans);

// Calcula métricas
const platformsMetrics = plans.reduce((acc, plan) => {
  plan.platforms.forEach((platform) => {
    if (!acc[platform]) {
      acc[platform] = 0;
    }
    acc[platform] += 1;
  });
  return acc;
}, {});


  // Log para depuração das métricas de plataformas
  console.log("Platforms metrics:", platformsMetrics);

  const performanceMetrics = plans.reduce(
    (acc, plan) => {
      if (plan.completed) {
        acc.completed += 1;
      } else if (plan.abandoned) {
        acc.abandoned += 1;
      } else {
        acc.planned += 1;
      }
      return acc;
    },
    { planned: 0, completed: 0, abandoned: 0 }
  );

  // Log para depuração das métricas de desempenho
  console.log("Performance metrics:", performanceMetrics);

  // Dados para gráficos
  const platformsData = {
    labels: Object.keys(platformsMetrics),
    datasets: [
      {
        label: "Posts Planejados",
        data: Object.values(platformsMetrics),
        backgroundColor: ["#A3D9A5", "#F9E79F", "#B0E0E6", "#F8B4B4"],
      },
    ],
  };

  const performanceData = {
    labels: ["Planejados", "Concluídos", "Abandonados"],
    datasets: [
      {
        data: [
          performanceMetrics.planned,
          performanceMetrics.completed,
          performanceMetrics.abandoned,
        ],
        backgroundColor: ["#A3D9A5", "#F9E79F", "#F5A623"],
      },
    ],
  };

  const isDarkMode = document.documentElement.classList.contains("dark");

  return (
    <div className="max-w-3xl mx-auto">
      <div className="grid grid-cols-1 gap-8 pb-24 max-w-3xl mx-auto">
        {/* Gráfico de Barras */}
        <div className="bg-gradient-to-br from-[#F8F8FF] via-[#E6E6FA] to-[#F8F8FF] dark:from-[#2C2C54] dark:via-[#3A3A54] dark:to-[#1A1A2E] p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-center text-[#4B0082] dark:text-[#E6E6FA] mb-4">
            Posts Planejados
          </h3>
          <Bar
            data={platformsData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: isDarkMode ? "#E6E6FA" : "#333",
                    font: { size: 14 },
                  },
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: isDarkMode ? "#E6E6FA" : "#333",
                  },
                },
                x: {
                  ticks: {
                    color: isDarkMode ? "#E6E6FA" : "#333",
                  },
                },
              },
            }}
          />
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
            Aqui você consegue ver qual plataforma você mais realizou postagens.
          </p>
        </div>

        {/* Gráfico de Pizza */}
        <div className="bg-gradient-to-br from-[#F8F8FF] via-[#E6E6FA] to-[#F8F8FF] dark:from-[#2C2C54] dark:via-[#3A3A54] dark:to-[#1A1A2E] p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-center text-[#4B0082] dark:text-[#E6E6FA] mb-4">
            Desempenho Geral
          </h3>
          <Pie
            data={performanceData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                  labels: {
                    color: isDarkMode ? "#E6E6FA" : "#333",
                    font: { size: 14 },
                  },
                },
              },
            }}
          />
          <p className="mt-4 text-center text-gray-600 dark:text-gray-300 text-sm">
            Aqui você pode ver o desempenho geral dos seus posts: planejados,
            concluídos e abandonados.
          </p>
        </div>

        {/* Bloco de Sugestões */}
        <div className="bg-gradient-to-br from-[#F8F8FF] via-[#E6E6FA] to-[#F8F8FF] dark:from-[#2C2C54] dark:via-[#3A3A54] dark:to-[#1A1A2E] p-6 rounded-lg shadow-lg border border-gray-300 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-4 text-[#4B0082] dark:text-[#E6E6FA]">
            Sugestões
          </h3>
          <ul className="list-disc ml-6 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Poste consistentemente nas plataformas favoritas.</li>
            <li>Experimente novos horários para testar engajamento.</li>
            <li>Reveja conteúdos abandonados para tentar otimizações.</li>
            <li>Priorize os posts concluídos para análise de desempenho futuro.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GeneralInsightsComponent;
