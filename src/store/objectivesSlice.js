import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Calcula a data no formato local
const getTodayDate = () =>
  new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

// Estado inicial com objetivos padrão
const initialState = [
  {
    id: uuidv4(),
    name: "Postar 5 vezes no Instagram",
    goal: 5,
    progress: 2,
    date: getTodayDate(),
  },
  {
    id: uuidv4(),
    name: "Criar 3 vídeos para o TikTok",
    goal: 3,
    progress: 1,
    date: getTodayDate(),
  },
  {
    id: uuidv4(),
    name: "Planejar 7 posts para o LinkedIn",
    goal: 7,
    progress: 4,
    date: getTodayDate(),
  },
];

const objectivesSlice = createSlice({
  name: "objectives",
  initialState,
  reducers: {
    addObjective(state, action) {
      const { name, goal } = action.payload;

      if (!name || !Number.isInteger(goal) || goal <= 0) {
        console.error("Dados inválidos ao adicionar objetivo:", action.payload);
        return;
      }

      state.push({
        id: uuidv4(),
        name,
        goal,
        progress: 0,
        date: getTodayDate(),
      });
    },
    removeObjective(state, action) {
      return state.filter((objective) => objective.id !== action.payload.id);
    },
    updateProgress(state, action) {
      const { id, value } = action.payload;
      const objective = state.find((obj) => obj.id === id);

      if (!objective || !Number.isInteger(value)) {
        console.error(
          "Objetivo não encontrado ou valor inválido em updateProgress:",
          action.payload
        );
        return;
      }

      // Atualiza o progresso, garantindo que não ultrapasse os limites
      objective.progress = Math.min(
        Math.max(objective.progress + value, 0),
        objective.goal
      );
    },
    updateGoal(state, action) {
      const { id, newGoal } = action.payload;
      const objective = state.find((obj) => obj.id === id);

      if (!objective || !Number.isInteger(newGoal) || newGoal <= 0) {
        console.error(
          "Objetivo não encontrado ou meta inválida em updateGoal:",
          action.payload
        );
        return;
      }

      // Atualiza a meta e ajusta o progresso se necessário
      objective.goal = newGoal;
      if (objective.progress > newGoal) {
        objective.progress = newGoal;
      }
    },
  },
});

export const {
  addObjective,
  removeObjective,
  updateProgress,
  updateGoal,
} = objectivesSlice.actions;

export default objectivesSlice.reducer;
