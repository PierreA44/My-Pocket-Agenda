import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Todo from "../components/todos/Todo";
import CreateTodo from "../components/todos/CreateTodo";
import EditTodo from "../components/todos/EditTodo";
import edition from "../assets/edition.png";
import plus from "../assets/plus.png";
import closeButton from "../assets/bouton-fermer.png";

export default function TodolistPage() {
  const { auth } = useOutletContext();
  const [todos, setTodos] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editID, setEditID] = useState("");

  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openEditModal = (id) => {
    setEditID(id);
    setIsEdit(true);
    setIsModalVisible(true);
  };
  const openCreateModal = () => {
    setIsNew(true);
    setIsModalVisible(true);
  };
  const closeEditModal = () => {
    setIsEdit(false);
    setIsModalVisible(false);
  };
  const closeCreateModal = () => {
    setIsNew(false);
    setIsModalVisible(false);
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
        setIsEdit(false);
        if (!todos[0]) {
          setIsClicked(false);
        }
      } else {
        navigate("/");
      }
    }
  }, [isMounted, isUpdated]);

  return (
    <section className="flex flex-col font-lexend gap-2 h-screen">
      <h1 className="text-4xl text-dkGreen dark:text-sand px-4 pb-2">
        Notes :
      </h1>
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
            openEditModal={openEditModal}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={!isModalVisible}
        contentLabel="Edit Skin Types"
        overlayClassName="fixed inset-0 bg-black/50 flex justify-center items-center"
        className="max-w-md mx-auto"
      >
        {isEdit && (
          <EditTodo
            closeModal={closeEditModal}
            setIsUpdated={setIsUpdated}
            setIsEdit={setIsEdit}
            editID={editID}
          />
        )}
        {isNew && (
          <CreateTodo
            closeModal={closeCreateModal}
            setIsUpdated={setIsUpdated}
            setIsNew={setIsNew}
          />
        )}
      </Modal>
      {todos[0] && !isClicked ? (
        <button
          type="button"
          className="fixed bottom-5 left-5 bg-green dark:bg-sand p-2.5 rounded-full border-black border-4"
          onClick={() => setIsClicked(!isClicked)}
        >
          <img src={edition} alt="modifier/supprimer" width="38" />
        </button>
      ) : null}
      {todos[0] && isClicked ? (
        <button
          type="button"
          title="annuler"
          className="fixed bottom-5 left-5 border-black border-4 rounded-full bg-black"
          onClick={() => setIsClicked(false)}
        >
          <img src={closeButton} alt="fermer" width="58" />
        </button>
      ) : null}
      <button
        type="button"
        title="nouvelle note"
        onClick={openCreateModal}
        className="fixed bottom-5 right-5 bg-green dark:bg-sand rounded-full w-fit p-1 border-4 border-black"
      >
        <img src={plus} alt="plus" width="50px" />
      </button>
    </section>
  );
}
