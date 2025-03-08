import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addObjective,
  removeObjective,
  updateProgress,
} from "../store/objectivesSlice";

const ObjectivesTrackerComponent = () => {
  const dispatch = useDispatch();
  const objectives = useSelector((state) => state.objectives);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newObjective, setNewObjective] = useState({ name: "", goal: 1 });

  const today = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const handleAddObjective = () => {
    if (!newObjective.name || newObjective.goal < 1) {
      alert("Nome e meta devem ser preenchidos!");
      return;
    }
    dispatch(
      addObjective({
        name: newObjective.name,
        goal: newObjective.goal,
      })
    );
    setNewObjective({ name: "", goal: 1 });
    setIsModalOpen(false);
  };

  const handleRemoveObjective = (id) => {
    dispatch(removeObjective({ id }));
  };

  const handleProgressUpdate = (id, value) => {
    dispatch(updateProgress({ id, value }));
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#4B0082] dark:text-[#E6E6FA] mb-4">
        Objetivos do Dia - {today}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Nessa seção você pode incluir os seus objetivos do dia e acompanhar seu
        progresso em tempo real.
      </p>

      {objectives.length > 0 ? (
        <ul className="space-y-4">
          {objectives.map((obj) => (
            <li
              key={obj.id}
              className="bg-gradient-to-br from-[#E6E6FA] via-[#F8F8FF] to-[#E6E6FA] dark:from-[#4B0082] dark:via-[#3A3A54] dark:to-[#2C2C54] p-4 rounded-xl shadow-lg"
            >
              <h3 className="font-bold text-gray-800 dark:text-gray-100">
                {obj.name}
              </h3>
              <div className="flex items-center justify-between mt-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-4 rounded relative">
                  <div
                    className="bg-gradient-to-r from-[#5F9EA0] to-[#4682B4] h-4 rounded"
                    style={{
                      width: `${(obj.progress / obj.goal) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                  {obj.progress}/{obj.goal}
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-gradient-to-r from-[#5F9EA0] to-[#4682B4] text-white px-3 py-1 rounded-lg"
                  onClick={() => handleProgressUpdate(obj.id, 1)}
                >
                  +1
                </button>
                <button
                  className="bg-gradient-to-r from-[#F8B4B4] to-[#F08080] text-white px-3 py-1 rounded-lg"
                  onClick={() => handleProgressUpdate(obj.id, -1)}
                >
                  -1
                </button>
                <button
                  className="bg-gradient-to-r from-[#FF6B6B] to-[#FF4B4B] text-white px-3 py-1 rounded-lg"
                  onClick={() => handleRemoveObjective(obj.id)}
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Nenhum objetivo cadastrado.
        </p>
      )}

      <button
        className="mt-4 px-10 py-3 rounded-full bg-gradient-to-r from-[#9370DB] to-[#BA55D3] text-white font-semibold hover:scale-105"
        onClick={() => setIsModalOpen(true)}
      >
        Adicionar Objetivo
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h2 className="text-lg font-bold mb-4">Novo Objetivo</h2>
            <input
              type="text"
              placeholder="Nome"
              value={newObjective.name}
              onChange={(e) =>
                setNewObjective({ ...newObjective, name: e.target.value })
              }
              className="mb-4 w-full"
            />
            <input
              type="number"
              placeholder="Meta"
              value={newObjective.goal}
              onChange={(e) =>
                setNewObjective({ ...newObjective, goal: +e.target.value })
              }
              className="mb-4 w-full"
            />
            <button onClick={handleAddObjective}>Salvar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectivesTrackerComponent;
