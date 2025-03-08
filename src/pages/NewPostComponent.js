import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addPlan } from "../store/plansSlice";

const NewPostComponent = () => {
  const dispatch = useDispatch();
  const platforms = useSelector((state) => state.profile.platforms);
  const platformOptions = ["Todas as Plataformas", ...platforms];

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [platform, setPlatform] = useState(platformOptions[0]);
  const [touchedFields, setTouchedFields] = useState({});

  const today = new Date();
  const todayISO = today.toISOString().split("T")[0];
  const endOfYear = `${today.getFullYear()}-12-31`;

  // Função para validar campos obrigatórios
  const isFormValid = () => title && date && platform && description;

  // Função para salvar o planejamento
  const handleSave = () => {
    if (!isFormValid()) {
      alert("Todos os campos obrigatórios devem ser preenchidos!");
      return;
    }

    const selectedDate = new Date(date);
    const endOfYearDate = new Date(`${endOfYear}T23:59:59`);

    if (selectedDate > endOfYearDate || isNaN(selectedDate)) {
      alert("A data selecionada é inválida ou excede o final do ano atual!");
      return;
    }

    const selectedPlatforms =
      platform === "Todas as Plataformas" ? platforms : [platform];

    dispatch(
      addPlan({
        title,
        date,
        platforms: selectedPlatforms,
        description,
      })
    );

    // Exibe feedback ao usuário
    alert("Planejamento adicionado com sucesso!");

    // Reseta o formulário
    setTitle("");
    setDate("");
    setDescription("");
    setPlatform(platformOptions[0]);
    setTouchedFields({});
  };

  // Função para controlar o blur nos campos
  const handleBlur = (field) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="mt-6 pt-16 py-6 px-4 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-extrabold mb-2 text-[#4B0082] dark:text-[#E6E6FA]">
          Incluir Novo Planejamento
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6">
          Preencha as informações abaixo para adicionar um novo planejamento às
          suas plataformas de postagem.
        </p>

        {/* Campo Título */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-2">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => handleBlur("title")}
            className="w-full border border-[#9370DB] dark:border-[#5F9EA0] rounded-lg p-3 bg-white dark:bg-[#2C2C54] text-gray-800 dark:text-gray-200"
          />
          {touchedFields.title && !title && (
            <span className="text-sm text-red-500 mt-1">
              O título é obrigatório.
            </span>
          )}
        </div>

        {/* Campo Data */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-2">
            Data <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            onBlur={() => handleBlur("date")}
            max={endOfYear}
            className="w-full border border-[#9370DB] dark:border-[#5F9EA0] rounded-lg p-3 bg-white dark:bg-[#2C2C54] text-gray-800 dark:text-gray-200"
          />
          {touchedFields.date && !date && (
            <span className="text-sm text-red-500 mt-1">
              A data é obrigatória.
            </span>
          )}
        </div>

        {/* Campo Plataforma */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-2">
            Plataforma <span className="text-red-500">*</span>
          </label>
          {platformOptions.length > 0 ? (
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              onBlur={() => handleBlur("platform")}
              className="w-full border border-[#9370DB] dark:border-[#5F9EA0] rounded-lg p-3 bg-white dark:bg-[#2C2C54] text-gray-800 dark:text-gray-200"
            >
              {platformOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <span className="text-sm text-red-500">
              Nenhuma plataforma disponível. Adicione no perfil.
            </span>
          )}
        </div>

        {/* Campo Descrição */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-300 mb-2">
            Descrição <span className="text-red-500">*</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onBlur={() => handleBlur("description")}
            className="w-full border border-[#9370DB] dark:border-[#5F9EA0] rounded-lg p-3 bg-white dark:bg-[#2C2C54] text-gray-800 dark:text-gray-200"
          ></textarea>
          {touchedFields.description && !description && (
            <span className="text-sm text-red-500 mt-1">
              A descrição é obrigatória.
            </span>
          )}
        </div>

        {/* Botão Salvar */}
        <button
          onClick={handleSave}
          className={`bg-gradient-to-r from-[#9370DB] to-[#BA55D3] text-white font-semibold px-6 py-3 rounded-lg ${
            !isFormValid()
              ? "opacity-50 cursor-not-allowed"
              : "hover:scale-105"
          }`}
          disabled={!isFormValid()}
        >
          Salvar
        </button>
      </div>
    </div>
  );
};

export default NewPostComponent;
