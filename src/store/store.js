import { configureStore } from "@reduxjs/toolkit";
import profileReducer from "./profileSlice";
import plansReducer from "./plansSlice";
import objectivesReducer from "./objectivesSlice";
import checklistReducer from "./checklistSlice";

const store = configureStore({
  reducer: {
    profile: profileReducer, // Reducer para o perfil do usuário
    plans: plansReducer, // Reducer para planos
    objectives: objectivesReducer, // Reducer para objetivos
    checklist: checklistReducer, // Reducer para checklist
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Desativa verificação de serializabilidade
    }),
});

export default store;
