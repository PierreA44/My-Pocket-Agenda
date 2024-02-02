import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import Modal from "react-modal";
import moment from "moment/min/moment-with-locales";
import edition from "../assets/edition.png";
import closeButton from "../assets/bouton-fermer.png";
import EditUser from "../components/user/EditUser";
import EditPassword from "../components/user/EditPassword";

export default function UserPage() {
  moment.locale("fr");
  const { auth } = useOutletContext();
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [user, setUser] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPass, setIsPass] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const openEditModal = () => {
    setIsEdit(true);
    setIsModalVisible(true);
  };
  const openPasswordModal = () => {
    setIsPass(true);
    setIsModalVisible(true);
  };
  const closeEditModal = () => {
    setIsModalVisible(false);
  };
  const closePasswordModal = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    if (isMounted || isUpdated) {
      if (auth) {
        axios
          .get(`${import.meta.env.VITE_BACKEND_URL}/api/user`, {
            headers: { Authorization: `Bearer ${auth}` },
          })
          .then((res) => setUser(res.data));

        setIsMounted(false);
        setIsUpdated(false);
        setIsEdit(false);
        setIsPass(false);
      } else {
        navigate("/");
      }
    }
  }, [isMounted, isUpdated]);

  return (
    <section className="flex flex-col gap-4 p-6 text-2xl text-dkGreen dark:text-sand font-commi h-screen">
      <h1 className="text-3xl font-lexend">Bonjour {user?.pseudo}</h1>
      <div className="flex flex-col p-4 gap-2">
        <p>Pseudo : {user?.pseudo}</p>
        <p>Email : {user?.email}</p>
        <p className="text-lg">
          Compte créé le{" "}
          {moment(user?.registration_date).format("Do MMMM YYYY")}
        </p>
      </div>
      {isClicked && (
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={openEditModal}
            className="bg-green active:bg-dkGreen dark:bg-dkGreen dark:text-sand dark:active:bg-green active:text-sand text-base shadow px-2 py-1 rounded-md w-56"
            type="button"
          >
            Modifier mes infos
          </button>
          <button
            onClick={openPasswordModal}
            className="bg-green active:bg-dkGreen dark:bg-dkGreen dark:text-sand dark:active:bg-green active:text-sand text-base shadow px-2 py-1 rounded-md w-56"
            type="button"
          >
            Changer mon mot-de-passe
          </button>
        </div>
      )}
      {!isClicked ? (
        <button
          type="button"
          className="fixed bottom-3 left-3 bg-green dark:bg-sand p-2.5 rounded-full border-black border-4"
          onClick={() => setIsClicked(!isClicked)}
        >
          <img src={edition} alt="modifier/supprimer" width="38" />
        </button>
      ) : (
        <button
          type="button"
          title="annuler"
          className="fixed bottom-3 left-3 border-black border-4 rounded-full bg-black"
          onClick={() => setIsClicked(false)}
        >
          <img src={closeButton} alt="fermer" width="58" />
        </button>
      )}
      <Modal
        isOpen={isModalVisible}
        onRequestClose={!isModalVisible}
        contentLabel="Edit Skin Types"
        overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        className="max-w-md mx-auto"
      >
        {isEdit && (
          <EditUser
            closeModal={closeEditModal}
            setIsUpdated={setIsUpdated}
            setIsEdit={setIsEdit}
          />
        )}
        {isPass && (
          <EditPassword
            closeModal={closePasswordModal}
            setIsUpdated={setIsUpdated}
            setIsNew={setIsPass}
          />
        )}
      </Modal>
    </section>
  );
}
