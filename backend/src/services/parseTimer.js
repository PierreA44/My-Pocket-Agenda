const parseTimer = async (req, res, next) => {
  try {
    const { startH, startM, endH, endM } = req.body;

    let start = "";
    let end = "";

    if (startH < 10 && startM < 10) {
      start = `0${startH}:0${startM}`;
    }
    if (startH < 10 && startM > 10) {
      start = `0${startH}:${startM}`;
    }
    if (startH > 10 && startM < 10) {
      start = `${startH}:0${startM}`;
    }
    if (startH > 10 && startM > 10) {
      start = `${startH}:${startM}`;
    }

    if (endH < 10 && endM < 10) {
      end = `0${endH}:0${endM}`;
    }
    if (endH < 10 && endM > 10) {
      end = `0${endH}:${endM}`;
    }
    if (endH > 10 && endM < 10) {
      end = `${endH}:0${endM}`;
    }
    if (endH > 10 && endM > 10) {
      end = `${endH}:${endM}`;
    }

    req.body.start = start;
    req.body.end = end;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { parseTimer };
