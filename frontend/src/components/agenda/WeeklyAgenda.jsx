import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast } from "react-toastify";
import edition from "../../assets/edition.png";
import EditRDV from "./EditRDV";
import closeButton from "../../assets/bouton-fermer.png";

export default function WeeklyAgenda({ rdvGroupByDays, setIsUpdated }) {
  moment.locale("fr");
  const { auth } = useOutletContext();
  const startOfWeek = moment().startOf("week");
  const weekDays = [startOfWeek.format("dddd Do MMMM")];
  for (let i = 1; i < 7; i += 1) {
    weekDays.push(startOfWeek.add(1, "d").format("dddd Do MMMM"));
  }

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
    <div className="flex flex-col text-2xl font-lexend pb-12 dark:text-sand ">
      <h1 className="text-center pt-2">Semaine {moment().week()}</h1>
      <div className="flex flex-col sm:grid sm:grid-cols-4 text-xl font-commi gap-8 px-8 py-4 sm:px-0">
        {weekDays.map((e) =>
          Object.keys(rdvGroupByDays).includes(e.split(" ")[0]) ? (
            <div key={e}>
              <h2 className="first-letter:capitalize font-lexend pb-1 sm:text-center">
                {e} :
              </h2>
              <ul className="bg-sand/40 dark:bg-beige/50 rounded-r-lg flex flex-col border-l-4 sm:justify-between font-commi border-green dark:border-beige px-2 py-2 gap-6">
                {rdvGroupByDays[e.split(" ")[0]].map((r) => (
                  <li key={r.id}>
                    <div className="flex flex-row justify-between sm:w-68">
                      <p className="text-sm">{r.start_rdv}</p>
                      {isClicked && (
                        <div className="flex flex-row gap-2 text-xs text-gray-700">
                          <button
                            type="button"
                            onClick={() => openModal(r.id)}
                            className="bg-green dark:bg-dkGreen dark:text-sand active:bg-dkGreen text-xs text-gray-700 active:text-sand shadow px-2 py-1 rounded-md w-20"
                          >
                            Modifier
                          </button>
                          <button
                            type="button"
                            onClick={() => deleteRDV(r.id)}
                            className="bg-green dark:bg-dkGreen dark:text-sand active:bg-dkGreen active:text-sand shadow px-2 py-1 rounded-md"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
                    <p className="pl-4 font-bold">{r.title}</p>
                    <p className="pl-6 text-lg">{r.description}</p>
                    <p className="text-sm">{r.end_rdv}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2
              key={e}
              className="first-letter:capitalize font-lexend sm:text-center"
            >
              {e}
            </h2>
          )
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
      {rdvGroupByDays && !isClicked ? (
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
    </div>
  );
}

WeeklyAgenda.propTypes = {
  rdvGroupByDays: PropTypes.shape().isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};
