import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import { updatePlan } from "../store/plansSlice";

const EditPostModal = ({ isOpen, onClose, post }) => {
  const dispatch = useDispatch();
  const platformsFromStore = useSelector((state) => state.profile.platforms); // Plataformas do Redux
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (post) {
      setTitle(post.title || "");
      setDate(post.date || "");
      setDescription(post.description || "");
      setSelectedPlatforms(post.platforms || []); // Carrega as plataformas do post
    }
  }, [post]);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = "O título é obrigatório.";
    if (!date.trim()) newErrors.date = "A data é obrigatória.";
    if (!description.trim()) newErrors.description = "A descrição é obrigatória.";
    if (selectedPlatforms.length === 0) newErrors.platforms = "Selecione pelo menos uma plataforma.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform) // Remove a plataforma
        : [...prev, platform] // Adiciona a plataforma
    );
  };

  const handleSave = () => {
    if (validate()) {
      dispatch(
        updatePlan({
          id: post.id,
          title,
          date,
          description,
          platforms: selectedPlatforms, // Envia as plataformas selecionadas
        })
      );
      onClose(); // Fecha o modal após salvar
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="modal bg-gradient-to-br from-[#F8F8FF] to-[#E6E6FA] dark:from-[#2C2C54] dark:to-[#1A1A2E] rounded-lg shadow-lg max-w-lg mx-auto p-6 border border-gray-300 dark:border-gray-700"
      overlayClassName="overlay bg-black bg-opacity-50 fixed inset-0 flex justify-center items-center"
    >
      <h2 className="text-lg font-bold mb-4 text-[#4B0082] dark:text-[#E6E6FA]">
        Editar Post
      </h2>
      <form>
        {/* Campo Título */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Título <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-600 bg-[#F8F8FF] dark:bg-[#2C2C54] text-gray-800 dark:text-[#E6E6FA] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#9370DB] dark:focus:ring-[#BA55D3] transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <span className="text-sm text-red-500">{errors.title}</span>}
        </div>

        {/* Campo Data */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Data <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 dark:border-gray-600 bg-[#F8F8FF] dark:bg-[#2C2C54] text-gray-800 dark:text-[#E6E6FA] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#9370DB] dark:focus:ring-[#BA55D3] transition"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          {errors.date && <span className="text-sm text-red-500">{errors.date}</span>}
        </div>

        {/* Campo Plataformas */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Plataformas <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {platformsFromStore.map((platform) => (
              <label key={platform} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-[#9370DB] border-gray-300 rounded focus:ring-[#BA55D3]"
                  checked={selectedPlatforms.includes(platform)}
                  onChange={() => handlePlatformToggle(platform)}
                />
                <span className="text-gray-800 dark:text-[#E6E6FA]">{platform}</span>
              </label>
            ))}
          </div>
          {errors.platforms && <span className="text-sm text-red-500">{errors.platforms}</span>}
        </div>

        {/* Campo Descrição */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descrição <span className="text-red-500">*</span>
          </label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-600 bg-[#F8F8FF] dark:bg-[#2C2C54] text-gray-800 dark:text-[#E6E6FA] rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#9370DB] dark:focus:ring-[#BA55D3] transition"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
          />
          {errors.description && (
            <span className="text-sm text-red-500">{errors.description}</span>
          )}
        </div>

        {/* Botões */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="bg-gray-200 dark:bg-[#2C2C54] text-gray-800 dark:text-[#E6E6FA] px-4 py-2 rounded-lg shadow hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="bg-gradient-to-r from-[#9370DB] to-[#BA55D3] text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
            onClick={handleSave}
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditPostModal;
