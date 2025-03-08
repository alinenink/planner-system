import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, toggleTask, removeTask } from "../store/checklistSlice";

const ChecklistComponent = () => {
  const dispatch = useDispatch();
  const { date, tasks } = useSelector((state) => state.checklist);

  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (!newTask.trim()) {
      alert("Por favor, insira uma tarefa.");
      return;
    }
    dispatch(addTask({ name: newTask.trim() }));
    setNewTask("");
  };

  const handleToggleTask = (id) => {
    dispatch(toggleTask({ id }));
  };

  const handleRemoveTask = (id) => {
    dispatch(removeTask({ id }));
  };

  return (
    <div className="mt-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-[#4B0082] dark:text-[#E6E6FA] mb-4">
        Checklist de Tarefas - {date}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
        Nessa seção, você pode acompanhar e gerenciar suas tarefas do dia.
      </p>

      {tasks.length > 0 ? (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-gradient-to-br from-[#F8F8FF] via-[#E6E6FA] to-[#F8F8FF] dark:from-[#2C2C54] dark:via-[#3A3A54] dark:to-[#1A1A2E] p-4 rounded-xl shadow-lg border border-gray-300 dark:border-gray-700"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleTask(task.id)}
                  className="mr-3 w-5 h-5 text-[#A3D9A5] bg-gray-100 border-gray-300 rounded focus:ring-[#4682B4] dark:focus:ring-[#E6E6FA] dark:bg-gray-700 dark:border-gray-600"
                />
                <span
                  className={`${
                    task.completed
                      ? "line-through text-gray-400 dark:text-gray-500"
                      : "text-gray-800 dark:text-gray-100"
                  }`}
                >
                  {task.name}
                </span>
              </div>
              <button
                className="bg-gradient-to-r from-[#FF6B6B] to-[#FF4B4B] text-white px-3 py-1 rounded-lg shadow-md hover:scale-105 transition"
                onClick={() => handleRemoveTask(task.id)}
              >
                Remover
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Nenhuma tarefa cadastrada. Comece adicionando uma nova tarefa abaixo.
        </p>
      )}

      <div className="mt-6">
        <label
          htmlFor="new-task"
          className="block text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2"
        >
          Nova Tarefa
        </label>
        <input
          id="new-task"
          type="text"
          placeholder="Digite o nome da nova tarefa"
          className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-800 dark:text-gray-100 bg-white dark:bg-[#2C2C54] focus:outline-none focus:ring-2 focus:ring-[#4682B4] dark:focus:ring-[#E6E6FA] transition"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="mt-4 px-10 py-3 rounded-full bg-gradient-to-r from-[#9370DB] to-[#BA55D3] text-white font-semibold hover:scale-105 hover:shadow-lg transition-all"
          onClick={handleAddTask}
        >
          Adicionar Tarefa
        </button>
      </div>
    </div>
  );
};

export default ChecklistComponent;
