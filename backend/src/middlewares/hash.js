const argon2 = require("argon2");
const tables = require("../tables");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hash = async (req, res, next) => {
  try {
    const { password } = req.body;

    const hashed = await argon2.hash(password, hashingOptions);
    delete req.body.password;
    req.body.hashedPassword = hashed;

    next();
  } catch (error) {
    next(error);
  }
};

const validatePassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await tables.user.readByEmail(email);
    if (user) {
      const validated = await argon2.verify(user.password, password);

      if (validated) {
        req.body.id = user.id;
        delete req.body.email;
        delete req.body.password;
        next();
      } else {
        res
          .status(401)
          .json({ message: "Combinaison email / mot-de-passe invalide" });
      }
    } else {
      res
        .status(401)
        .json({ message: "Combinaison email / mot-de-passe invalide" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { hash, validatePassword };
