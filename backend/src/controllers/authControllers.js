const jwt = require("jsonwebtoken");
// Import access to database tables
const tables = require("../tables");

const add = async (req, res, next) => {
  try {
    const { id } = req.body;
    const user = await tables.user.read(Number(id));
    const rdvCount = await tables.rdv.readCount(Number(user.id));
    const token = await jwt.sign(
      { sub: user.id, email: user.email, isAdmin: user.isAdmin },
      process.env.APP_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res.status(200).json({
      token,
      message: `Bienvenue ${user.pseudo}, vous avez ${rdvCount.count} rdv aujourd'hui !`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { add };
