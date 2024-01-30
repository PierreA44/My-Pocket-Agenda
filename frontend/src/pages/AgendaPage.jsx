import { useEffect, useState } from "react";
// import { useOutletContext } from "react-router-dom";
// import axios from "axios";
import Modal from "react-modal";
import CreateRDV from "../components/agenda/CreateRDV";
import plus from "../assets/plus.png";

export default function AgendaPage() {
  // const { auth } = useOutletContext();
  // const [rdv, setRdv] = useState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  useEffect(() => {}, []);

  return (
    <section className="flex flex-col font-lexend gap-2">
      <h1 className="text-4xl text-dkGreen px-4 pb-2">Agenda :</h1>
      <Modal
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        contentLabel="Edit Skin Types"
        overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        className="max-w-md mx-auto"
      >
        <CreateRDV />
      </Modal>
      <button
        type="button"
        title="nouveau RDV"
        onClick={openModal}
        className="absolute bottom-5 right-5 bg-green rounded-full w-fit p-1 border-4 border-black"
      >
        <img src={plus} alt="plus" width="60px" />
      </button>
    </section>
  );
}
