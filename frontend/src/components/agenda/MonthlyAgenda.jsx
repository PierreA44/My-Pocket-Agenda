import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";
import { useRef, useState } from "react";

export default function MonthlyAgenda({ rdvGroupByD }) {
  moment.locale("fr");
  const [isVisible, setIsVisible] = useState(false);
  const [rdvVisible, setRdvVisible] = useState();
  const currentMonth = moment().format("MMMM YYYY");
  const firstDayOfMonth = moment().startOf("month").format("d");
  const numberOfDaysInMonth = moment().daysInMonth();

  const arrayOfDay = [];
  moment.weekdays(true).forEach((d) => arrayOfDay.push(d.slice(0, 2)));

  const arrayOfNumberOfDay = [];
  for (let i = 1; i <= numberOfDaysInMonth; i += 1) {
    arrayOfNumberOfDay.push(i);
  }

  const divRef = useRef(null);
  const handleClick = (id) => {
    setIsVisible(true || !isVisible);
    setRdvVisible(id);
    divRef.current.scrollIntoView();
  };

  return (
    <div className="flex flex-col text-2xl gap-2 font-lexend sm:mx-24 dark:text-sand h-screen">
      <h1 className="text-center pt-2 first-letter:capitalize">
        {currentMonth}
      </h1>
      <div className="grid grid-cols-7 text-center pb-2 border-b-green dark:border-b-beige pt-4 border-b-4">
        {arrayOfDay.map((d) => (
          <p className="first-letter:capitalize" key={d}>
            {d}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        {arrayOfNumberOfDay.map((e) =>
          Object.keys(rdvGroupByD).includes(`${e}`) ? (
            <div
              className={e === 1 ? `col-start-${firstDayOfMonth}` : null}
              key={e}
            >
              <button type="button" onClick={() => handleClick(e)}>
                <p className="relative">
                  {e}
                  <span className="text-dkGreen dark:text-beige text-[5rem] absolute -top-8">
                    .
                  </span>
                </p>
              </button>
            </div>
          ) : (
            <p
              className={e === 1 ? `col-start-${firstDayOfMonth}` : null}
              key={e}
            >
              {e}
            </p>
          )
        )}
        <div className="col-span-7 mt-8" ref={divRef}>
          <div className="flex flex-col items-center gap-4">
            {isVisible && (
              <h1 className="border-b-2 border-green dark:border-beige p-2">
                Rendez-vous du{" "}
                {moment(rdvGroupByD[rdvVisible][0].scheduled_date).format(
                  "Do MMMM"
                )}{" "}
                :
              </h1>
            )}
            {isVisible &&
              rdvGroupByD[rdvVisible].map((r) => (
                <div className="text-lg" key={r.d}>
                  <h2 className="text-3xl">{r.title}</h2>
                  <p>débute à {r.start_rdv}</p>
                  <p>et termine à {r.end_rdv}</p>
                  <p>Informations :</p>
                  <p>{r?.description}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

MonthlyAgenda.propTypes = {
  rdvGroupByD: PropTypes.shape().isRequired,
};
