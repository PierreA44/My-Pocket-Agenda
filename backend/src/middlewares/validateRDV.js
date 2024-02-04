const moment = require("moment");
const tables = require("../tables");

moment.locale("fr");

const validateRdv = async (req, res, next) => {
  try {
    const { startRdv, endRdv } = req.body;
    const { sub } = req.auth;
    const { id } = req.params;

    const existantsRdv = await tables.rdv.readByDateAndUserId(
      moment(startRdv).format("YYYY-MM-DD"),
      Number(sub)
    );

    if (existantsRdv === null) {
      next();
    } else {
      const authorized = [];

      for (let i = 0; i < existantsRdv.length; i += 1) {
        if (existantsRdv[i].id === Number(id)) {
          // eslint-disable-next-line no-continue
          continue;
        }
        authorized.push(
          moment(startRdv).isBetween(
            existantsRdv[i].start_rdv,
            existantsRdv[i].end_rdv
          )
        );
        authorized.push(
          moment(endRdv).isBetween(
            existantsRdv[i].start_rdv,
            existantsRdv[i].end_rdv
          )
        );
      }
      if (authorized.includes(true)) {
        res
          .status(403)
          .json({ message: "Vous avez déjà un rdv sur cette plage horaire !" });
      } else {
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { validateRdv };
