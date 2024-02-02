import { useOutletContext } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import mail from "../../assets/email.png";
import phoneIcone from "../../assets/telephone.png";

export default function Contact({
  id,
  name,
  email,
  phone,
  setIsUpdated,
  isClicked,
  openEditModal,
}) {
  const { auth } = useOutletContext();

  const deleteContact = () => {
    try {
      axios
        .delete(`${import.meta.env.VITE_BACKEND_URL}/api/contact/${id}`, {
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
    <div className="relative flex flex-col items-baseline gap-2 bg-sand py-2 px-4 w-fit rounded-md">
      {isClicked ? (
        <>
          <h1 className="text-3xl first-letter:capitalize">{name}</h1>
          <div className="flex flex-row gap-2 items-center">
            <img src={mail} alt="arobase" width="20" />
            <p className="text-xl">{email}</p>
          </div>
          {phone && (
            <div className="flex flex-row gap-2 items-center">
              <img src={phoneIcone} alt="telephone" width="20" />
              <p className="text-xl">{phone}</p>
            </div>
          )}
          <div className="flex flex-row gap-4 text-gray-700">
            <button
              type="button"
              onClick={() => openEditModal(id)}
              className="bg-green active:bg-dkGreen dark:bg-dkGreen dark:text-sand dark:active:bg-green active:text-sand text-xs shadow px-2 py-1 rounded-md w-20"
            >
              Modifier
            </button>
            <button
              type="button"
              onClick={deleteContact}
              className="bg-green active:bg-dkGreen dark:bg-dkGreen dark:text-sand dark:active:bg-green active:text-sand text-xs shadow px-2 py-1 rounded-md"
            >
              Supprimer
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-3xl first-letter:capitalize">{name}</h1>
          <div className="flex flex-row gap-2 items-center">
            <img src={mail} alt="arobase" width="20" />
            <p className="text-xl">{email}</p>
          </div>
          {phone && (
            <div className="flex flex-row gap-2 items-center">
              <img src={phoneIcone} alt="telephone" width="20" />
              <p className="text-xl">{phone}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

Contact.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
  isClicked: PropTypes.bool.isRequired,
  phone: PropTypes.string.isRequired,
  openEditModal: PropTypes.func.isRequired,
};
