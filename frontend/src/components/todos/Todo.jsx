/* eslint-disable react/jsx-props-no-spreading */
import moment from "moment/min/moment-with-locales";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

export default function Todo({
  id,
  note,
  creationDate,
  setIsUpdated,
  isClicked,
  openEditModal,
}) {
  const { auth } = useOutletContext();
  moment.locale("fr");
  const deleteTodo = () => {
    try {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/todo/${id}`, {
          headers: {
            Authorization: `Bearer ${auth}`,
          },
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
    <div className="relative flex flex-col items-baseline gap-2 bg-sand py-2 px-4 w-fit rounded-md shadow">
      {isClicked ? (
        <>
          <p className="text-[10px]">{moment(creationDate).format("LL")}</p>
          <h1 className="text-3xl first-letter:capitalize">{note}</h1>

          <div className="flex flex-row gap-4 text-gray-700">
            <button
              type="button"
              onClick={() => openEditModal(id)}
              className="bg-green active:bg-dkGreen active:text-sand shadow px-2 py-1 rounded-md w-20"
            >
              Modifier
            </button>
            <button
              type="button"
              onClick={deleteTodo}
              className="bg-green active:bg-dkGreen active:text-sand shadow px-2 py-1 rounded-md"
            >
              Supprimer
            </button>
          </div>
        </>
      ) : (
        <>
          <p className="text-[10px]">{moment(creationDate).format("LL")}</p>
          <h1 className="text-3xl first-letter:capitalize">{note}</h1>
        </>
      )}
    </div>
  );
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  note: PropTypes.string.isRequired,
  creationDate: PropTypes.string.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
  openEditModal: PropTypes.func.isRequired,
};
