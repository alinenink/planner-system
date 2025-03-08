import React from "react";

const DailyDetailsModal = ({ isOpen, onClose, dayDetails }) => {
  if (!isOpen) return null;

  // Mock de resumo do dia para 12/01/2025
  const daySummary = dayDetails.date === "2025-01-12" ? {
    platforms: [
      { name: "TikTok", posts: 3 },
      { name: "Instagram", posts: 5 },
    ],
    tasks: {
      completed: 2,
      abandoned: 2,
      canceled: 3,
    },
  } : null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white">
            Detalhes de {dayDetails.date}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-800 dark:text-white hover:text-red-500 transition focus:outline-none"
          >
            ✕
          </button>
        </div>

        {/* Resumo do Dia */}
        {daySummary && (
          <div className="mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-4 shadow">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Resumo do Dia
            </h3>
            <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {daySummary.platforms.map((platform, index) => (
                <li key={index} className="flex justify-between">
                  <span>Postagens no {platform.name}:</span>
                  <span>{platform.posts}</span>
                </li>
              ))}
              <li className="flex justify-between mt-2">
                <span>Tarefas concluídas:</span>
                <span>{daySummary.tasks.completed}</span>
              </li>
              <li className="flex justify-between">
                <span>Tarefas abandonadas:</span>
                <span>{daySummary.tasks.abandoned}</span>
              </li>
              <li className="flex justify-between">
                <span>Tarefas canceladas:</span>
                <span>{daySummary.tasks.canceled}</span>
              </li>
            </ul>
          </div>
        )}

        {/* Posts Agendados */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Posts Agendados
          </h3>
          {dayDetails.posts.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {dayDetails.posts.map((post, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                >
                  <div>
                    <h4 className="font-bold text-gray-800 dark:text-white">
                      {post.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                      {post.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Nenhum post agendado para este dia.
            </p>
          )}
        </div>

        {/* Botão Fechar */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyDetailsModal;
