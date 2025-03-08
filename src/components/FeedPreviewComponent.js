import React, { useState, useRef } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiEdit, FiTrash, FiFlag, FiCheck } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updatePlansOrder } from "../store/plansSlice";
import EditPostModal from "./EditPostModal";

const ItemType = {
  POST: "post",
};

const FeedPreviewComponent = ({ selectedDay }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  // Obtém os posts do Redux
  const postsForSelectedDate = useSelector((state) =>
    state.plans.filter((post) => post.date === selectedDay)
  );

  const handleMovePost = (dragIndex, hoverIndex) => {
    const reorderedPosts = [...postsForSelectedDate];
    const [movedItem] = reorderedPosts.splice(dragIndex, 1);
    reorderedPosts.splice(hoverIndex, 0, movedItem);

    // Atualiza a ordem dos planos no Redux
    dispatch(
      updatePlansOrder({ date: selectedDay, updatedPlans: reorderedPosts })
    );
  };

  const handleEditPost = (post) => {
    setCurrentPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveEditedPost = (updatedPost) => {
    const updatedPosts = postsForSelectedDate.map((post) =>
      post.id === updatedPost.id ? updatedPost : post
    );

    // Atualiza o plano editado no Redux
    dispatch(
      updatePlansOrder({ date: updatedPost.date, updatedPlans: updatedPosts })
    );

    setIsModalOpen(false); // Fecha o modal após salvar
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Tem certeza que deseja excluir este post?")) {
      const filteredPosts = postsForSelectedDate.filter(
        (post) => post.id !== id
      );

      dispatch(
        updatePlansOrder({ date: selectedDay, updatedPlans: filteredPosts })
      );
    }
  };

  const handleAbandonPost = (id) => {
    const updatedPosts = postsForSelectedDate.map((post) =>
      post.id === id ? { ...post, abandoned: true, completed: false } : post
    );

    dispatch(
      updatePlansOrder({ date: selectedDay, updatedPlans: updatedPosts })
    );
  };

  const handleCompletePost = (id) => {
    const updatedPosts = postsForSelectedDate.map((post) =>
      post.id === id ? { ...post, completed: true, abandoned: false } : post
    );

    dispatch(
      updatePlansOrder({ date: selectedDay, updatedPlans: updatedPosts })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-center">
        <div className="p-8 w-full max-w-5xl">
          <h2 className="text-lg font-bold mb-4 text-center text-[#4B0082] dark:text-[#E6E6FA]">
            Feed Planejado
          </h2>
          {postsForSelectedDate.length > 0 ? (
            <>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 text-center">
                Arraste os eventos e organize da forma que desejar.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
                Você também pode{" "}
                <span className="font-semibold text-[#9370DB]">abandonar</span>{" "}
                ou{" "}
                <span className="font-semibold text-[#9370DB]">concluir</span>{" "}
                tarefas planejadas diretamente no feed.
              </p>
              <ul className="space-y-4">
                {postsForSelectedDate.map((post, index) => (
                  <DraggablePost
                    key={post.id}
                    index={index}
                    post={post}
                    movePost={handleMovePost}
                    onDelete={() => handleDeletePost(post.id)}
                    onEdit={() => handleEditPost(post)}
                    onAbandon={() => handleAbandonPost(post.id)}
                    onComplete={() => handleCompletePost(post.id)}
                  />
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Nenhum post planejado para o dia atual ou dias futuros.
            </p>
          )}
        </div>
      </div>

      {/* Modal para editar post */}
      <EditPostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        post={currentPost}
        onSave={handleSaveEditedPost}
      />
    </DndProvider>
  );
};

const DraggablePost = ({
  post,
  index,
  movePost,
  onDelete,
  onEdit,
  onAbandon,
  onComplete,
}) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: ItemType.POST,
    hover(item) {
      if (!ref.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) return;

      movePost(dragIndex, hoverIndex);
      item.index = hoverIndex; // Atualiza o índice do item arrastado
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.POST,
    item: { id: post.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <li
      ref={ref}
      className={`flex flex-col md:flex-row justify-between items-center p-4 rounded-xl shadow-lg transition-transform ${
        isDragging
          ? "bg-gradient-to-r from-[#BA55D3] to-[#9370DB] dark:from-[#4B0082] dark:to-[#2C2C54]"
          : "bg-gradient-to-r from-[#F8F8FF] to-[#E6E6FA] dark:from-[#2C2C54] dark:to-[#1A1A2E]"
      } hover:scale-105`}
    >
      <div className="flex-1 text-center md:text-left">
        <h4 className="font-semibold text-lg text-[#4B0082] dark:text-[#E6E6FA]">
          {post.title}
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {post.platforms?.join(", ")}
        </p>
        {post.abandoned && (
          <span className="text-xs text-red-500 dark:text-red-400">
            Abandonado
          </span>
        )}
        {post.completed && (
          <span className="text-xs text-green-500 dark:text-green-400">
            Concluído
          </span>
        )}
      </div>

      <div className="flex gap-4 mt-4 md:mt-0">
        <button
          className="text-[#4682B4] dark:text-[#B0E0E6] hover:scale-110 transition-all"
          onClick={onEdit}
          aria-label="Editar"
        >
          <FiEdit size={20} />
        </button>
        <button
          className="text-red-500 dark:text-red-400 hover:scale-110 transition-all"
          onClick={onDelete}
          aria-label="Excluir"
        >
          <FiTrash size={20} />
        </button>
        <button
          className="text-yellow-500 dark:text-yellow-400 hover:scale-110 transition-all"
          onClick={onAbandon}
          aria-label="Abandonar"
        >
          <FiFlag size={20} />
        </button>
        <button
          className="text-green-500 dark:text-green-400 hover:scale-110 transition-all"
          onClick={onComplete}
          aria-label="Concluir"
        >
          <FiCheck size={20} />
        </button>
      </div>
    </li>
  );
};

export default FeedPreviewComponent;
