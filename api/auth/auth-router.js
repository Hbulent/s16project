const router = require("express").Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");
const db = require("../../data/dbConfig");
const mw = require("./auth-middleware");
const bcrypt = require("bcryptjs");
const userModel = require("../users/users-model");

router.post(
  "/register",
  mw.checkPayloadRegister,
  mw.epostaUnique,
  (req, res, next) => {
    const hashPassword = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashPassword;
    console.log("1");
    userModel
      .create(req.body)
      .then((response) => {
        console.log("2");
        res.status(201).json(response);
      })
      .catch((error) => {
        console.log("3");
        next({ status: 500, message: "database error" });
      });
  }
);

router.post(
  "/login",
  mw.checkPayloadLogin,
  mw.userNameCheck,

  async (req, res, next) => {
    const arananKisi = await db("users")
      .where("username", req.body.username)
      .first();
    const passwordStatus = bcrypt.compareSync(
      req.body.password,
      arananKisi.password
    );
    if (passwordStatus) {
      const token = generateToken(arananKisi);
      res
        .status(201)
        .json({ message: `${arananKisi.username} hoş geldin`, token: token });
    } else {
      next({ status: 402, message: "geçersiz şifre" });
    }
  }
);

function generateToken(user) {
  const payload = { name: user.name, surname: user.surname };
  const options = { expiresIn: "1d" };
  const token = jwt.sign(payload, JWT_SECRET, options);

  return token;
}
router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});

module.exports = router;
