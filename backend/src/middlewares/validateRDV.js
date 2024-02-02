// const tables = require("../tables");

// const validateRdv = aync (req, res, next) => {
//   try {
//     const { date, start, end } = req.body;
//     const { sub } = req.auth;

//     const existantsRdv = await tables.rdv.readByDateAndUserId(
//       date,
//       Number(sub)
//     );

//     if (existantsRdv) {
//       const startH = [];
//       const startM = [];
//       const endH = [];
//       const endM = [];

//       existantsRdv.forEach((e) => {
//         startH.push(parseInt(e.start_rdv.slice(0, 2), 10));
//         startM.push(parseInt(e.start_rdv.slice(3, 5), 10));
//         endH.push(parseInt(e.end_rdv.slice(0, 2), 10));
//         endM.push(parseInt(e.end_rdv.slice(3, 5), 10));
//       });

//       const A = parseInt(start.slice(0, 2), 10);
//       const B = parseInt(start.slice(3, 5), 10);
//       const C = parseInt(end.slice(0, 2), 10);
//       const D = parseInt(end.slice(3, 5), 10);

//       for (let i = 0; i < startH.length; i += 1) {
//         if (A > startH[i] && A < endH[i]) {
//           return res.status(403).json({
//             message: "Vous avez déjà un rdv de prévu sur cette plage horaire !",
//           });
//         }
//         if (A === startH[i] && B > startM[i]) {
//           return res.status(403).json({
//             message: "Vous avez déjà un rdv de prévu sur cette plage horaire !",
//           });
//         }
//         if (A === startH[i] && B < startM[i] && C > startH[i]) {
//           return res.status(403).json({
//             message: "Vous avez déjà un rdv de prévu sur cette plage horaire !",
//           });
//         }
//         if (
//           A === startH[i] &&
//           B < startM[i] &&
//           C === startH[i] &&
//           D > startM[i]
//         ) {
//           return res.status(403).json({
//             message: "Vous avez déjà un rdv de prévu sur cette plage horaire !",
//           });
//         }
//         if (
//           A === startH[i] &&
//           B < startM[i] &&
//           C === startH[i] &&
//           D < startM[i]
//         ) {
//           return next();
//         }
//         if (A < startH[i] && C < startH[i]) {
//           return next();
//         }
//         if (A < startH[i] && C === startH[i] && D <= startM[i]) {
//           return next();
//         }
//         if (A < startH[i] && C === startH[i] && D > startM[i]) {
//           return res.status(403).json({
//             message: "Vous avez déjà un rdv de prévu sur cette plage horaire !",
//           });
//         }
//         if (A > startH[i]) {
//           return next();
//         }
//       }
//     }
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = { validateRdv };
