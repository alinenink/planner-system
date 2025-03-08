import React, { useState } from "react";
import Modal from "react-modal";

const CreatePostModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    if (!title || !date) {
      alert("Título e data são obrigatórios!");
      return;
    }

    const newPost = {
      title,
      date: new Date(date),
      description,
    };

    onSave(newPost);
    setTitle("");
    setDate("");
    setDescription("");
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="bg-white dark:bg-gray-900 rounded-lg shadow-lg max-w-md w-full p-6 mx-auto"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      ariaHideApp={false}
    >
      <h2 className="text-2xl font-bold text-[#4682B4] dark:text-[#E6E6FA] mb-4">
        Criar Novo Post
      </h2>
      <form>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Título *
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Data *
          </label>
          <input
            type="date"
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Descrição
          </label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            onClick={onClose}
            aria-label="Cancelar"
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#5F9EA0] to-[#4682B4] text-white font-semibold hover:opacity-90 transition"
            onClick={handleSave}
            aria-label="Salvar"
          >
            Salvar
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreatePostModal;
