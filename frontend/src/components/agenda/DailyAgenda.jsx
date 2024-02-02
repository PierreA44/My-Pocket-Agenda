import PropTypes from "prop-types";
import moment from "moment/min/moment-with-locales";

export default function DailyAgenda({ dailyRDV }) {
  moment.locale("fr");
  return (
    <section className="flex flex-col gap-4 text-2xl font-lexend dark:text-sand">
      <h1 className="first-letter:capitalize text-center pt-2">
        {moment().format("dddd Do MMMM HH:mm")}
      </h1>
      {dailyRDV[0] ? (
        dailyRDV.map((d) => (
          <div
            className="flex flex-col border-l-4 font-commi border-green dark:border-beige px-2 ml-2 gap-2"
            key={d.id}
          >
            <p className="text-lg font-bold">{d.start_rdv}</p>
            <p className="font-lexend px-2">{d.title}</p>
            {d.description && (
              <p className="px-4 text-xl font-bold">{d.description}</p>
            )}
            <p className="text-lg  font-bold">{d.end_rdv}</p>
          </div>
        ))
      ) : (
        <h2 className="text-start p-2 mt-8">
          Aujourd'hui, vous n'avez aucun rendez-vous.
        </h2>
      )}
    </section>
  );
}

DailyAgenda.propTypes = {
  dailyRDV: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
