import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

export default function MonthlyAgenda({ rdvGroupByD }) {
  moment.locale("fr");
  const currentMonth = moment().format("MMMM");
  const firstDayOfMonth = moment().startOf("month").format("d");
  const numberOfDaysInMonth = moment().daysInMonth();

  const arrayOfDay = [];
  moment.weekdays(true).forEach((d) => arrayOfDay.push(d.slice(0, 2)));

  const arrayOfNumberOfDay = [];
  for (let i = 1; i <= numberOfDaysInMonth; i += 1) {
    arrayOfNumberOfDay.push(i);
  }

  return (
    <div className="flex flex-col text-2xl gap-2 font-lexend">
      <h1 className="text-center pt-2 first-letter:capitalize">
        {currentMonth}
      </h1>
      <div className="grid grid-cols-7 text-center pb-2 border-b-green border-b-2">
        {arrayOfDay.map((d) => (
          <p className="first-letter:capitalize" key={d}>
            {d}
          </p>
        ))}
      </div>
      <div className="grid grid-cols-7 text-center">
        {arrayOfNumberOfDay.map((e) =>
          Object.keys(rdvGroupByD).includes(`${e}`) ? (
            <div className="relative">
              <p
                className={e === 1 ? `col-start-${firstDayOfMonth}` : null}
                key={e}
              >
                {e}
              </p>
              <p className="text-dkGreen text-[5rem] bottom-9 right-0 absolute">
                .
              </p>
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
      </div>
    </div>
  );
}

MonthlyAgenda.propTypes = {
  rdvGroupByD: PropTypes.shape().isRequired,
};
