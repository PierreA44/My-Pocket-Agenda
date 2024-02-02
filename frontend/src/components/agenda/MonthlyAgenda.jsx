import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

export default function MonthlyAgenda({ rdvGroupByD }) {
  moment.locale("fr");
  const currentMonth = moment().format("MMMM YYYY");
  const firstDayOfMonth = moment().startOf("month").format("d");
  const numberOfDaysInMonth = moment().daysInMonth();

  const arrayOfDay = [];
  moment.weekdays(true).forEach((d) => arrayOfDay.push(d.slice(0, 2)));

  const arrayOfNumberOfDay = [];
  for (let i = 1; i <= numberOfDaysInMonth; i += 1) {
    arrayOfNumberOfDay.push(i);
  }

  return (
    <div className="flex flex-col text-2xl gap-2 font-lexend sm:mx-24 dark:text-sand">
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
      <div className="grid grid-cols-7 text-center">
        {arrayOfNumberOfDay.map((e) =>
          Object.keys(rdvGroupByD).includes(`${e}`) ? (
            <div
              className={e === 1 ? `col-start-${firstDayOfMonth}` : null}
              key={e}
            >
              <p className="relative">
                {e}
                <span className="text-dkGreen dark:text-beige text-[5rem] absolute -top-8 sm:right-2">
                  .
                </span>
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
