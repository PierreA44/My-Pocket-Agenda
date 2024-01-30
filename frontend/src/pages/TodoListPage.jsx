import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Todo from "../components/todos/Todo";
import plus from "../assets/plus.png";
import edition from "../assets/edition.png";
import CreateTodo from "../components/todos/CreateTodo";

export default function TodolistPage() {
  const { auth } = useOutletContext();
  const [todos, setTodos] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  const handleClick = () => {
    if (isClicked) {
      setIsClicked(false);
    } else {
      setIsClicked(true);
    }
  };

  useEffect(() => {
    if (isMounted || isUpdated) {
      if (auth) {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/todo`, {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          })
          .then((res) => setTodos(res.data));
        setIsMounted(false);
        setIsUpdated(false);
      } else {
        navigate("/");
      }
    }
  }, [isMounted, isUpdated]);

  return (
    <section className="flex flex-col font-lexend gap-2">
      <h1 className="text-4xl text-dkGreen px-4 pb-2">Notes :</h1>
      <div className="flex flex-wrap gap-2 text-gray-700">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            note={todo.note}
            creationDate={todo.creation_date}
            setIsUpdated={setIsUpdated}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        contentLabel="Edit Skin Types"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="max-w-md mx-auto"
      >
        <CreateTodo closeModal={closeModal} setIsUpdated={setIsUpdated} />
      </Modal>
      <button
        type="button"
        className="absolute bottom-5 left-5 bg-green p-2.5 rounded-full border-black border-4"
        onClick={handleClick}
      >
        <img src={edition} alt="modifier/supprimer" width="48" />
      </button>
      <button
        type="button"
        title="nouvelle note"
        onClick={openModal}
        className="absolute bottom-5 right-5 bg-green rounded-full w-fit p-1 border-4 border-black"
      >
        <img src={plus} alt="plus" width="60px" />
      </button>
    </section>
  );
}
