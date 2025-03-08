import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Define as datas atuais
const today = new Date();
const todayISO = new Date().toISOString().split("T")[0];
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const yesterdayISO = yesterday.toISOString().split("T")[0];

// Planejamentos iniciais
const initialPlans = [
  {
    id: uuidv4(),
    date: yesterdayISO,
    title: "Revisar Estratégias de Postagem",
    platforms: ["Instagram"],
    description: "Revisar as estratégias de postagem do dia anterior.",
    completed: false,
    abandoned: false,
  },
  {
    id: uuidv4(),
    date: yesterdayISO,
    title: "Responder Comentários Pendentes",
    platforms: ["Instagram"],
    description: "Responder os comentários acumulados no Instagram.",
    completed: false,
    abandoned: false,
  },
  {
    id: uuidv4(),
    date: todayISO,
    title: "Criar Posts de Promoção",
    platforms: ["Instagram", "TikTok"],
    description: "Criar posts para promover o produto em destaque.",
    completed: false,
    abandoned: false,
  },
  {
    id: uuidv4(),
    date: todayISO,
    title: "Agendar Stories no Instagram",
    platforms: ["Instagram"],
    description: "Agendar 5 stories para engajamento diário.",
    completed: false,
    abandoned: false,
  },
  {
    id: uuidv4(),
    date: todayISO,
    title: "Planejar Live no YouTube",
    platforms: ["YouTube"],
    description: "Criar roteiro para a live programada.",
    completed: false,
    abandoned: false,
  },
  {
    id: uuidv4(),
    date: todayISO,
    title: "Escrever Blog Post",
    platforms: ["Linkedin"],
    description: "Escrever um post para o blog com SEO otimizado.",
    completed: false,
    abandoned: false,
  },
  {
    id: uuidv4(),
    date: todayISO,
    title: "Responder Comentários de Hoje",
    platforms: ["TikTok", "Instagram"],
    description: "Garantir que todos os comentários de hoje sejam respondidos.",
    completed: false,
    abandoned: false,
  },
];

const plansSlice = createSlice({
  name: "plans",
  initialState: initialPlans,
  reducers: {
    addPlan(state, action) {
      const { date, ...rest } = action.payload;
      const validatedDate = new Date(date).toISOString().split("T")[0];
      if (!/^\d{4}-\d{2}-\d{2}$/.test(validatedDate)) {
        console.error("Formato de data inválido:", validatedDate);
        return;
      }
      state.push({
        id: uuidv4(),
        date: validatedDate,
        completed: false,
        abandoned: false,
        ...rest,
      });
    },
    updatePlansOrder(state, action) {
      const { date, updatedPlans } = action.payload;
      return [...state.filter((plan) => plan.date !== date), ...updatedPlans];
    },
    removePlan(state, action) {
      return state.filter((plan) => plan.id !== action.payload.id);
    },
    updatePlan(state, action) {
      const { id, ...updatedFields } = action.payload;
      const index = state.findIndex((plan) => plan.id === id);
      if (index !== -1) {
        state[index] = { ...state[index], ...updatedFields };
      }
    },
    markAsCompleted(state, action) {
      const { id } = action.payload;
      const index = state.findIndex((plan) => plan.id === id);
      if (index !== -1) {
        state[index].completed = true;
        state[index].abandoned = false; // Garante que não esteja abandonado
      }
    },
    markAsAbandoned(state, action) {
      const { id } = action.payload;
      const index = state.findIndex((plan) => plan.id === id);
      if (index !== -1) {
        state[index].abandoned = true;
        state[index].completed = false; // Garante que não esteja concluído
      }
    },
  },
});

export const {
  addPlan,
  updatePlansOrder,
  removePlan,
  updatePlan,
  markAsCompleted,
  markAsAbandoned,
} = plansSlice.actions;

export default plansSlice.reducer;
