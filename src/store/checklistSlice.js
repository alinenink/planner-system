import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Calcula a data no formato local
const getTodayDate = () =>
  new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const initialState = {
  date: getTodayDate(), // Data atual para o checklist
  tasks: [
    { id: uuidv4(), name: "Revisar os posts planejados para hoje", completed: false },
    { id: uuidv4(), name: "Responder comentários nas redes sociais", completed: true },
    { id: uuidv4(), name: "Criar esboço para os vídeos da semana", completed: false },
  ],
};

const checklistSlice = createSlice({
  name: "checklist",
  initialState,
  reducers: {
    addTask(state, action) {
      const { name } = action.payload;

      if (!name || typeof name !== "string" || name.trim() === "") {
        console.error("Nome inválido ao adicionar tarefa:", action.payload);
        return;
      }

      state.tasks.push({
        id: uuidv4(),
        name: name.trim(),
        completed: false,
      });
    },
    toggleTask(state, action) {
      const task = state.tasks.find((task) => task.id === action.payload.id);

      if (!task) {
        console.error("Tarefa não encontrada para alternar:", action.payload);
        return;
      }

      task.completed = !task.completed;
    },
    removeTask(state, action) {
      const { id } = action.payload;

      if (!state.tasks.some((task) => task.id === id)) {
        console.error("Tarefa não encontrada para remoção:", action.payload);
        return;
      }

      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
  },
});

export const { addTask, toggleTask, removeTask } = checklistSlice.actions;

export default checklistSlice.reducer;
