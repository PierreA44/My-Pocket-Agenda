import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

import Todo from "../components/todos/Todo";
import plus from "../assets/plus.png";
import CreateTodo from "../components/todos/CreateTodo";

export default function TodolistPage() {
  const { auth } = useOutletContext();
  const [todos, setTodos] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isMounted, setIsMounted] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);
  useEffect(() => {
    if (isMounted || isUpdated) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/todo`, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        })
        .then((res) => setTodos(res.data));
      setIsMounted(false);
      setIsUpdated(false);
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
        onClick={openModal}
        className="absolute bottom-5 right-5 bg-green rounded-full w-fit p-1 border-4 border-black"
      >
        <img src={plus} alt="plus" width="60px" />
      </button>
    </section>
  );
}
