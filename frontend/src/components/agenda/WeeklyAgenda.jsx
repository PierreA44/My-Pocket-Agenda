import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

export default function WeeklyAgenda({ rdvGroupByDays }) {
  moment.locale("fr");
  const startOfWeek = moment().startOf("week");
  const weekDays = [startOfWeek.format("dddd Do MMMM")];
  for (let i = 1; i < 7; i += 1) {
    weekDays.push(startOfWeek.add(1, "d").format("dddd Do MMMM"));
  }

  return (
    <div className="flex flex-col text-2xl font-lexend">
      <h1 className="text-center pt-2">Semaine {moment().week()}</h1>
      <div className="flex flex-col text-xl font-commi gap-4 px-4">
        {weekDays.map((e) =>
          Object.keys(rdvGroupByDays).includes(e.split(" ")[0]) ? (
            <div className="">
              <h2 key={e} className="first-letter:capitalize font-lexend pb-1">
                {e} :
              </h2>
              <ul className="border-l-2 border-green px-0.5 ml-4">
                {rdvGroupByDays[e.split(" ")[0]].map((r) => (
                  <li key={r.id}>
                    <p className="text-sm">{r.start_rdv}</p>
                    <p className="pl-4 font-bold">{r.title}</p>
                    <p className="pl-6 text-lg">{r.description}</p>
                    <p className="text-sm">{r.end_rdv}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <h2 key={e} className="first-letter:capitalize font-lexend">
              {e}
            </h2>
          )
        )}
      </div>
    </div>
  );
}

WeeklyAgenda.propTypes = {
  rdvGroupByDays: PropTypes.shape().isRequired,
};
