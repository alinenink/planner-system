import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  // Estado para gerenciar os posts por data
  const [postsByDate, setPostsByDate] = useState({});

  // Função para adicionar um novo post ao feed
  const addPostToFeed = (newPost) => {
    const postDate = new Date(newPost.date).toISOString().split("T")[0];
    setPostsByDate((prev) => ({
      ...prev,
      [postDate]: [...(prev[postDate] || []), newPost],
    }));
  };

  return (
    <Router>
      {/* Header fixo */}
      <HeaderComponent />

      {/* Conteúdo principal */}
      <div className="bg-gradient-to-br from-[#F8F8FF] to-[#E6E6FA] dark:from-[#2C2C54] dark:to-[#1A1A2E] min-h-screen p-6">
        <Routes>
          {/* Rota do Calendário Semanal */}
          <Route
            path="/"
            element={
              <WeeklyCalendarComponent
                postsByDate={postsByDate} // Passa os posts por data
              />
            }
          />

          {/* Rota de Novo Planejamento */}
          <Route
            path="/new-post"
            element={
              <NewPostComponent
                onAddPost={addPostToFeed} // Função para adicionar posts
              />
            }
          />

          {/* Rota de Objetivos */}
          <Route path="/goals" element={<GoalsComponent />} />

          {/* Rota de Perfil */}
          <Route path="/profile" element={<ProfileComponent />} />
        </Routes>
      </div>

      {/* Footer fixo */}
      <FooterComponent />
    </Router>
  );
}

export default App;
