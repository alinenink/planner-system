import React, { useState } from "react";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import HeaderComponent from "./components/HeaderComponent";
import WeeklyCalendarComponent from "./pages/WeeklyCalendarComponent";
import FooterComponent from "./components/FooterComponent";
import GoalsComponent from "./pages/GoalsComponent";
import NewPostComponent from "./pages/NewPostComponent";
import ProfileComponent from "./pages/ProfileComponent";

import Modal from "react-modal";

// Configura o elemento principal para o modal
Modal.setAppElement("#root");

function App() {
  // Estado global para armazenar posts organizados por data
  const [postsByDate, setPostsByDate] = useState({});

  // Função para adicionar um novo post ao feed
  const addPostToFeed = (newPost) => {
    const formattedDate = new Date(newPost.date).toISOString().split("T")[0]; // Garante formato correto
    setPostsByDate((prev) => ({
      ...prev,
      [formattedDate]: [...(prev[formattedDate] || []), newPost],
    }));
  };

  return (
    <Router>
      {/* Header fixo */}
      <HeaderComponent />

      {/* Conteúdo principal */}
      <div className="bg-gradient-to-br from-[#F8F8FF] to-[#E6E6FA] dark:from-[#2C2C54] dark:to-[#1A1A2E] min-h-screen p-6">
        <Routes>
          {/* Página Inicial: Redireciona para o Planejamento Semanal */}
          <Route path="/" element={<Navigate to="/weekly" />} />

          {/* Página do Calendário Semanal */}
          <Route
            path="/weekly"
            element={<WeeklyCalendarComponent postsByDate={postsByDate} />}
          />

          {/* Página de Novo Planejamento */}
          <Route
            path="/new-post"
            element={<NewPostComponent onAddPost={addPostToFeed} />}
          />

          {/* Página de Objetivos */}
          <Route path="/goals" element={<GoalsComponent />} />

          {/* Página de Perfil */}
          <Route path="/profile" element={<ProfileComponent />} />

          {/* Redirecionamento para páginas inexistentes */}
          <Route path="*" element={<Navigate to="/weekly" />} />
        </Routes>
      </div>

      {/* Footer fixo */}
      <FooterComponent />
    </Router>
  );
}

export default App;
