import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateProfile } from "../store/profileSlice";
import {
  FaInstagram,
  FaYoutube,
  FaTiktok,
  FaGlobe,
  FaEdit,
} from "react-icons/fa";

const ProfileComponent = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleSave = (updatedPlatforms) => {
    dispatch(updateProfile({ platforms: updatedPlatforms }));
    setIsEditModalOpen(false);
  };

  return (
    <div className="mt-12 pt-12 px-4 bg-gradient-to-br from-[#F8F8FF] to-[#E6E6FA] dark:from-[#2C2C54] dark:to-[#1A1A2E] min-h-screen">
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-[#F8F8FF] via-[#E6E6FA] to-[#E6E6FA] dark:from-[#2C2C54] dark:via-[#3A3A54] dark:to-[#2C2C54] rounded-lg shadow-lg p-8 text-center border border-gray-300 dark:border-gray-700">
        {/* Seção de Exibição do Perfil */}
        <img
          src={profile.photoUrl}
          alt="Foto de Perfil"
          className="w-32 h-32 mx-auto rounded-full border-4 border-[#9370DB] dark:border-[#BA55D3] mb-4"
        />

        <h2 className="text-3xl font-bold text-[#4B0082] dark:text-[#E6E6FA] mb-2">
          {profile.name}
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
          {profile.bio}
        </p>
        <div className="flex justify-center gap-4 mb-6">
          {profile.platforms.includes("Instagram") && (
            <a
              href={profile.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E1306C] hover:scale-110 transition"
            >
              <FaInstagram size={24} />
            </a>
          )}
          {profile.platforms.includes("YouTube") && (
            <a
              href={profile.socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FF0000] hover:scale-110 transition"
            >
              <FaYoutube size={24} />
            </a>
          )}
          {profile.platforms.includes("TikTok") && (
            <a
              href={profile.socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black dark:text-white hover:scale-110 transition"
            >
              <FaTiktok size={24} />
            </a>
          )}
          {profile.platforms.includes("LinkedIn") && (
            <a
              href={profile.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#9370DB] dark:text-[#BA55D3] hover:scale-110 transition"
            >
              <FaGlobe size={24} />
            </a>
          )}
        </div>
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="bg-gradient-to-r from-[#9370DB] to-[#BA55D3] text-white px-4 py-2 rounded-lg shadow hover:scale-105 transition"
        >
          <FaEdit className="inline mr-2" /> Editar Perfil
        </button>
      </div>

      {/* Modal de Edição */}
      {isEditModalOpen && (
        <EditProfileModal
          profile={profile}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

const EditProfileModal = ({ profile, onClose, onSave }) => {
  const [updatedPlatforms, setUpdatedPlatforms] = useState(profile.platforms);

  const handlePlatformToggle = (platform) => {
    setUpdatedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="modal bg-gradient-to-br from-[#F8F8FF] to-[#E6E6FA] dark:from-[#2C2C54] dark:to-[#1A1A2E] rounded-lg shadow-lg max-w-lg mx-auto p-6 border border-gray-300 dark:border-gray-700">
        <h3 className="text-lg font-bold text-[#4B0082] dark:text-[#E6E6FA] mb-4">
          Editar Perfil
        </h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
            Nome
          </label>
          <input
            type="text"
            value={profile.name}
            disabled
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-400 dark:text-gray-600 bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
            Biografia
          </label>
          <textarea
            value={profile.bio}
            disabled
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg p-3 text-gray-400 dark:text-gray-600 bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
            rows="4"
          ></textarea>
        </div>
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-300 mb-2">
            Plataformas Favoritas
          </h3>
          {["Instagram", "YouTube", "TikTok", "LinkedIn"].map((platform) => (
            <div key={platform} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={updatedPlatforms.includes(platform)}
                onChange={() => handlePlatformToggle(platform)}
                id={platform}
                className="mr-2 accent-[#9370DB] dark:accent-[#BA55D3]"
              />
              <label
                htmlFor={platform}
                className="capitalize text-gray-800 dark:text-gray-300"
              >
                {platform}
              </label>
            </div>
          ))}
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={() => onSave(updatedPlatforms)}
            className="bg-gradient-to-r from-[#9370DB] to-[#BA55D3] text-white px-4 py-2 rounded-lg shadow-md hover:opacity-90 transition"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
