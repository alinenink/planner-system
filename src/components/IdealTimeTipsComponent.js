import React, { useState } from "react";

const IdealTimeTipsComponent = ({ tips }) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const handleNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
  };

  const handlePreviousTip = () => {
    setCurrentTipIndex((prevIndex) =>
      prevIndex === 0 ? tips.length - 1 : prevIndex - 1
    );
  };

  if (!tips || tips.length === 0) {
    return (
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
        <h2 className="text-lg font-bold mb-2 dark:text-gray-100">
          Dicas de Horários Ideais
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Nenhuma dica disponível no momento.
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded shadow">
      <h2 className="text-lg font-bold mb-2 dark:text-gray-100">
        Dicas de Horários Ideais
      </h2>
      <div className="flex items-center justify-between">
        {/* Botão Anterior */}
        <button
          className="bg-blue-500 dark:bg-blue-700 text-white px-3 py-1 rounded shadow hover:bg-blue-600 dark:hover:bg-blue-800 transition"
          onClick={handlePreviousTip}
        >
          {"<"}
        </button>

        {/* Texto da Dica */}
        <div className="flex-1 text-center mx-4">
          <p className="text-lg font-semibold dark:text-gray-100">
            {tips[currentTipIndex]}
          </p>
        </div>

        {/* Botão Próximo */}
        <button
          className="bg-blue-500 dark:bg-blue-700 text-white px-3 py-1 rounded shadow hover:bg-blue-600 dark:hover:bg-blue-800 transition"
          onClick={handleNextTip}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default IdealTimeTipsComponent;
