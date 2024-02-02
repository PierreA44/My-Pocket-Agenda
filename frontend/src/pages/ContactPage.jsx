import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import Contact from "../components/contacts/Contact";
import CreateContact from "../components/contacts/CreateContact";
import plus from "../assets/plus.png";
import edition from "../assets/edition.png";
import closeButton from "../assets/bouton-fermer.png";
import EditContact from "../components/contacts/EditContact";

export default function ContactPage() {
  const { auth } = useOutletContext();
  const [contacts, setContacts] = useState([]);
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
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/contact`, {
            headers: {
              Authorization: `Bearer ${auth}`,
            },
          })
          .then((res) => setContacts(res.data));
        setIsMounted(false);
        setIsUpdated(false);
        setIsEdit(false);
        if (!contacts[0]) {
          setIsClicked(false);
        }
      } else {
        navigate("/");
      }
    }
  }, [isUpdated, isMounted]);

  return (
    <section className="flex flex-col font-lexend gap-2">
      <h1 className="text-4xl text-dkGreen dark:text-sand px-4 pb-2">
        Répertoire :
      </h1>
      <div className="flex flex-wrap gap-2 text-gray-700">
        {contacts.map((c) => (
          <Contact
            key={c.id}
            id={c.id}
            name={c.name}
            email={c.email}
            phone={c.phone_number}
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
        overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        className="max-w-md mx-auto"
      >
        {isEdit && (
          <EditContact
            closeModal={closeEditModal}
            setIsUpdated={setIsUpdated}
            setIsEdit={setIsEdit}
            editID={editID}
          />
        )}
        {isNew && (
          <CreateContact
            closeModal={closeCreateModal}
            setIsUpdated={setIsUpdated}
            setIsNew={setIsNew}
          />
        )}
      </Modal>
      {contacts[0] && !isClicked ? (
        <button
          type="button"
          className="fixed bottom-3 left-3 bg-green dark:bg-sand p-2.5 rounded-full border-black border-4"
          onClick={() => setIsClicked(!isClicked)}
        >
          <img src={edition} alt="modifier/supprimer" width="38" />
        </button>
      ) : null}
      {contacts[0] && isClicked ? (
        <button
          type="button"
          title="annuler"
          className="fixed bottom-3 left-3 border-black border-4 rounded-full bg-black"
          onClick={() => setIsClicked(false)}
        >
          <img src={closeButton} alt="fermer" width="58" />
        </button>
      ) : null}
      <button
        type="button"
        title="nouveau contact"
        onClick={openCreateModal}
        className="fixed bottom-3 right-3 bg-green dark:bg-sand rounded-full w-fit p-1 border-4 border-black"
      >
        <img src={plus} alt="plus" width="50" />
      </button>
    </section>
  );
}
