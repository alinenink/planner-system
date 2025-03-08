import { FaHome, FaPlusCircle, FaListAlt, FaUserCircle } from "react-icons/fa";
import { AiFillLinkedin, AiFillGithub, AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const FooterComponent = () => {
  const navigate = useNavigate();

  // Links de contato
  const contactLinks = {
    linkedin: "https://www.linkedin.com/in/alinelink",
    email: "mailto:aline@example.com",
    github: "https://github.com/alinelink",
  };

  // Classes do Tailwind
  const iconClass = "text-gray-200 hover:text-[#9370DB] transition";

  return (
    <footer className="fixed bottom-0 w-full bg-[#4B0082] dark:bg-[#2C2C54] px-6 shadow-md z-50 border-t border-[#BA55D3]">
      <div className="flex justify-around items-center py-3">
        {/* Botão Home */}
        <button
          className={iconClass}
          onClick={() => navigate("/")}
          aria-label="Home"
        >
          <FaHome size={28} />
        </button>

        {/* Botão Novo Planejamento */}
        <button
          className={iconClass}
          onClick={() => navigate("/new-post")}
          aria-label="Novo Planejamento"
        >
          <FaPlusCircle size={28} />
        </button>

        {/* Botão Objetivos */}
        <button
          className={iconClass}
          onClick={() => navigate("/goals")}
          aria-label="Objetivos"
        >
          <FaListAlt size={28} />
        </button>

        {/* Botão Perfil */}
        <button
          className={iconClass}
          onClick={() => navigate("/profile")}
          aria-label="Perfil"
        >
          <FaUserCircle size={28} />
        </button>
      </div>

      {/* Separador */}
      <div className="border-t border-gray-600"></div>

      {/* Assinatura */}
      <div className="flex flex-col items-center py-2">
        <p className="text-xs text-gray-300">
          Desenvolvido por <span className="font-medium">Aline Nink</span>
        </p>
        <div className="flex space-x-4 mt-1">
          {/* LinkedIn */}
          <a
            href={contactLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="LinkedIn"
          >
            <AiFillLinkedin size={20} />
          </a>

          {/* Email */}
          <a
            href={contactLinks.email}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="Email"
          >
            <AiOutlineMail size={20} />
          </a>

          {/* GitHub */}
          <a
            href={contactLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={iconClass}
            aria-label="GitHub"
          >
            <AiFillGithub size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
