import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";
import Modal from "react-modal";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import EditRDV from "./EditRDV";
import edition from "../../assets/edition.png";
import closeButton from "../../assets/bouton-fermer.png";

export default function DailyAgenda({ dailyRDV, setIsUpdated }) {
  moment.locale("fr");
  const { auth } = useOutletContext();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editID, setEditID] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const openModal = (id) => {
    setIsModalVisible(true);
    setEditID(id);
  };
  const closeModal = () => setIsModalVisible(false);

  const deleteRDV = (id) => {
    try {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/rdv/${id}`, {
          headers: { Authorization: `Bearer ${auth}` },
        })
        .then((res) => {
          toast.success(res.data.message);
          setIsUpdated(true);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="flex flex-col sm:items-center gap-4 px-8 text-2xl font-lexend  dark:text-sand h-screen">
      <h1 className="first-letter:capitalize text-center py-4">
        {moment().format("dddd Do MMMM HH:mm")}
      </h1>
      <div className="flex sm:flex-row sm:flex-wrap sm:justify-center flex-col gap-8 sm:gap-16">
        {dailyRDV[0] ? (
          dailyRDV.map((d) => (
            <div
              className={
                moment(d.end_rdv).isBefore()
                  ? "bg-sand/40 text-[#b2b1b0] dark:bg-beige/40 rounded-r-lg flex flex-col border-l-4 justify-between font-commi border-green dark:border-beige p-2 gap-2"
                  : "bg-sand/40 dark:bg-beige/40 rounded-r-lg flex flex-col border-l-4 justify-between font-commi border-green dark:border-beige p-2 gap-2"
              }
              key={d.id}
            >
              <div className="flex flex-row justify-between sm:w-72">
                <p className="text-lg font-bold ">
                  {moment(d.start_rdv).format("LT")}
                </p>
                {isClicked && (
                  <div className="flex flex-row gap-2 text-xs text-gray-700">
                    <button
                      type="button"
                      onClick={() => openModal(d.id)}
                      className="bg-green dark:bg-dkGreen dark:text-sand active:bg-dkGreen text-xs text-gray-700 active:text-sand shadow px-2 py-1 rounded-md w-20"
                    >
                      Modifier
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteRDV(d.id)}
                      className="bg-green dark:bg-dkGreen dark:text-sand active:bg-dkGreen active:text-sand shadow px-2 py-1 rounded-md"
                    >
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
              <p className="font-lexend px-2 first-letter:capitalize">
                {d.title}
              </p>

              {d.description && (
                <p className="px-4 text-xl font-bold">{d.description}</p>
              )}
              {d.contact_rdv && (
                <p className="px-4 text-xl font-bold">avec : {d.contact_rdv}</p>
              )}
              <p className="text-lg  font-bold">
                {moment(d.end_rdv).format("LT")}
              </p>
            </div>
          ))
        ) : (
          <h2 className="text-start p-2 mt-8">
            Aujourd'hui, vous n'avez aucun rendez-vous.
          </h2>
        )}
        <Modal
          isOpen={isModalVisible}
          onRequestClose={closeModal}
          contentLabel="Edit Skin Types"
          overlayClassName="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
          className="max-w-md mx-auto"
        >
          <EditRDV
            closeModal={closeModal}
            setIsUpdated={setIsUpdated}
            editID={editID}
          />
        </Modal>
      </div>
      {dailyRDV && !isClicked ? (
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
    </section>
  );
}

DailyAgenda.propTypes = {
  dailyRDV: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
