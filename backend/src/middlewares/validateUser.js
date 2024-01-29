const z = require("zod");

const userSchema = z.object({
  pseudo: z.string().min(4),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
      message:
        "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    }),
});

const validateUser = async (req, res, next) => {
  try {
    delete req.body?.confirmEmail;
    delete req.body?.confirmPassword;
    userSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { validateUser };
