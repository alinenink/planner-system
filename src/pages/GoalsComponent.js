import React from "react";
import ChecklistComponent from "../components/ChecklistComponent";
import GoalTrackingComponent from "../components/GoalTrackingComponent";

const GoalsComponent = () => {
  return (
    <div className="p-4 mt-6 pt-16 bg-white bg-gradient-to-br from-[#F8F8FF] to-[#E6E6FA] dark:from-[#2C2C54] dark:to-[#1A1A2E] min-h-screen pb-32">
      {/* Componente de Rastreamento de Metas */}
      <GoalTrackingComponent />

      {/* Componente de Checklist */}
      <ChecklistComponent />
    </div>
  );
};

export default GoalsComponent;
