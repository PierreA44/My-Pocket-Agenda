import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import CreateContact from "../components/contacts/CreateContact";
import plus from "../assets/plus.png";
import edition from "../assets/edition.png";
import Contact from "../components/contacts/Contact";

export default function ContactPage() {
  const { auth } = useOutletContext();
  const [contacts, setContacts] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isMounted, setIsMounted] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  const navigate = useNavigate();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

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
      <h1 className="text-4xl text-dkGreen px-4 pb-2">Répertoire :</h1>
      <div className="flex flex-wrap gap-2 text-gray-700">
        {contacts.map((c) => (
          <Contact
            key={c.id}
            id={c.id}
            name={c.name}
            email={c.email}
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
        overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        className="max-w-md mx-auto"
      >
        <CreateContact closeModal={closeModal} setIsUpdated={setIsUpdated} />
      </Modal>
      {contacts[0] && (
        <button
          type="button"
          className="absolute bottom-5 left-5 bg-green p-2.5 rounded-full border-black border-4"
          onClick={() => setIsClicked(!isClicked)}
        >
          <img src={edition} alt="modifier/supprimer" width="48" />
        </button>
      )}
      <button
        type="button"
        title="nouveau contact"
        onClick={openModal}
        className="absolute bottom-5 right-5 bg-green rounded-full w-fit p-1 border-4 border-black"
      >
        <img src={plus} alt="plus" width="60" />
      </button>
    </section>
  );
}
