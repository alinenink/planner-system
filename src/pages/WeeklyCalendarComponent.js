import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import FeedPreviewComponent from "../components/FeedPreviewComponent";
import DailyDetailsModal from "../components/DailyDetailsModal";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import GeneralInsightsComponent from "../components/GeneralInsightsComponent";

const formatDateForDisplay = (dateISO) => {
  const [year, month, day] = dateISO.split("-");
  return `${day}-${month}-${year}`;
};

const getCurrentWeek = () => {
  const today = new Date();
  const week = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - today.getDay() + i);
    week.push(day.toISOString().split("T")[0]); // Retorna no formato ISO
  }
  return week;
};

const WeeklyCalendarComponent = () => {
  const todayISO = new Date().toISOString().split("T")[0];
  const [currentWeek, setCurrentWeek] = useState(getCurrentWeek());
  const [selectedDay, setSelectedDay] = useState(todayISO);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const todayRef = useRef(null);

  const handleTodayClick = () => {
    setCurrentWeek(getCurrentWeek());
    setSelectedDay(todayISO);
    if (todayRef.current) {
      todayRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  };

  // Recuperar os posts planejados da store
  const postsFromStore = useSelector((state) => state.plans);

  // Agrupar posts por data no formato ISO
  const postsByDate = Array.isArray(postsFromStore)
    ? postsFromStore.reduce((acc, post) => {
        acc[post.date] = acc[post.date] || [];
        acc[post.date].push(post);
        return acc;
      }, {})
    : {};
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handlePreviousWeek = () => {
    const previousWeek = currentWeek.map((date) => {
      const previousDate = new Date(date);
      previousDate.setDate(previousDate.getDate() - 7);
      return previousDate.toISOString().split("T")[0];
    });
    setCurrentWeek(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = currentWeek.map((date) => {
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 7);
      return nextDate.toISOString().split("T")[0];
    });
    setCurrentWeek(nextWeek);
  };

  const isPastDate = (date) => {
    const currentDate = new Date(date);
    return currentDate < new Date();
  };

  return (
    <div className="mt-6 pt-16 py-6 px-4 bg-gradient-to-br from-[#F8F8FF] to-[#E6E6FA] dark:from-[#2C2C54] dark:to-[#1A1A2E] min-h-screen">
      {/* Título principal */}

      <div className="text-center mb-4 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-[#9370DB] dark:text-[#E6E6FA] mb-2">
          Planejamento Semanal
        </h2>
        <p className="text-base text-[#708090] dark:text-gray-400">
          Escolha uma data para visualizar ou adicionar postagens planejadas.
        </p>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Use as{" "}
          <span className="font-semibold text-[#9370DB]">setas laterais</span>{" "}
          para avançar ou retornar semanas. Você também pode navegar na semana
          atual deslizando pelo
          <span className="font-semibold text-[#9370DB]"> carrossel</span>.
        </p>
      </div>

      {/* Carrossel de datas */}
      <div className="relative flex flex-col items-center py-6">
        <div className="mb-4">
          <button
            onClick={handleTodayClick}
            className="px-10 py-3 rounded-full bg-gradient-to-r from-[#9370DB] to-[#BA55D3] text-white font-semibold hover:scale-105 hover:shadow-lg transition-all"
            aria-label="Hoje"
          >
            Hoje
          </button>
        </div>
        <div className="relative w-full flex items-center justify-center">
          <button
            onClick={handlePreviousWeek}
            className="absolute left-0 p-3 rounded-full bg-gradient-to-r from-[#9370DB] to-[#BA55D3] text-white transition-all shadow-lg z-10"
            aria-label="Semana Anterior"
          >
            <AiOutlineLeft size={24} />
          </button>
          <div className="flex gap-4 overflow-x-scroll p-[0.8em] no-scrollbar carousel-container mx-12">
            {currentWeek.map((date, index) => {
              const isSelected = selectedDay === date;

              return (
                <div
                  key={index}
                  ref={date === todayISO ? todayRef : null}
                  className={`relative flex-shrink-0 w-[120px] h-[180px] flex flex-col justify-center items-center p-4 rounded-xl transition-all ${
                    isSelected
                      ? "bg-gradient-to-t from-[#9370DB] via-[#BA55D3] to-[#E6E6FA] text-white border-4 border-[#BA55D3] shadow-2xl"
                      : "bg-gradient-to-br from-[#F8F8FF] via-[#E6E6FA] to-[#F8F8FF] text-[#9370DB] border border-gray-300 shadow-md dark:bg-gradient-to-br dark:from-[#2C2C54] dark:via-[#3A3A54] dark:to-[#1A1A2E] dark:text-[#A9A9A9] dark:border-[#444444]"
                  }`}
                  onClick={() => handleDayClick(date)}
                >
                  <div className="text-sm font-semibold uppercase">
                    {new Date(date).toLocaleDateString("pt-BR", {
                      weekday: "short",
                    })}
                  </div>
                  <div className="text-3xl font-extrabold mt-2">
                    {formatDateForDisplay(date).split("-")[0]}
                  </div>
                  <div className="text-sm mt-2">
                    {postsByDate[date]?.length || 0} posts
                  </div>

                  {/* Condicional para "Ver Detalhes" */}
                  {isPastDate(date) && (
                    <button
                      className={`mt-2 text-sm underline transition-all ${
                        isSelected
                          ? "text-white"
                          : "text-[#9370DB] hover:text-[#BA55D3] dark:text-[#A9A9A9] dark:hover:text-[#FFFFFF]"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDay(date);
                        setIsDetailsModalOpen(true);
                      }}
                    >
                      Ver Detalhes
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={handleNextWeek}
            className="absolute right-0 p-3 rounded-full bg-gradient-to-r from-[#9370DB] to-[#BA55D3] text-white transition-all shadow-lg z-10"
            aria-label="Próxima Semana"
          >
            <AiOutlineRight size={24} />
          </button>
        </div>
      </div>

      {/* FeedPreviewComponent */}
      {selectedDay >= todayISO && (
        <div className="mb-12">
          <FeedPreviewComponent selectedDay={selectedDay} today={todayISO} />
        </div>
      )}

      {/* Insights Gerais */}
      <div className="mt-16">
        <h2 className="text-3xl font-extrabold text-[#9370DB] dark:text-[#E6E6FA] text-center mb-2">
          Insights Gerais
        </h2>
        <p className="text-base text-[#708090] dark:text-gray-400 text-center mb-8">
          Visualize o desempenho e comparativo entre suas plataformas de posts.
        </p>
        <div className="flex justify-center">
          <GeneralInsightsComponent selectedDay={todayISO} />
        </div>
      </div>

      {/* Modal de detalhes do dia */}
      <DailyDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        dayDetails={{
          date: selectedDay,
          posts: postsByDate[selectedDay] || [],
        }}
      />
    </div>
  );
};

export default WeeklyCalendarComponent;
