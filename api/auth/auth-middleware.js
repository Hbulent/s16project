const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../../config/index");
const db = require("../../data/dbConfig");

const restricted = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, tokenPayload) => {
      if (err) {
        next({ status: 401, message: "token geçersiz!..." });
      } else {
        req.userInfo = tokenPayload;
        next();
      }
    });
  } else {
    next({ status: 401, message: "token yok" });
  }
};

const protected = (req, res, next) => {
  next();
};

async function userNameCheck(req, res, next) {
  const arananKisi = await db("users")
    .where("username", req.body.username)
    .first();
  arananKisi ? next() : next({ status: 404, message: "söz konusu kişi yok!" });
}
function checkPayloadLogin(req, res, next) {
  if (!req.body.username || !req.body.password) {
    next({ status: 402, message: "eksik bilgi girişi" });
  } else {
    next();
  }
}

function checkPayloadRegister(req, res, next) {
  if (
    !req.body.name ||
    !req.body.surname ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    next({ status: 402, message: "eksik bilgi girişi" });
  } else {
    next();
  }
}
async function epostaUnique(req, res, next) {
  const arananKisi = await db("users")
    .where("username", req.body.username)
    .first();
  arananKisi && next({ status: 402, message: "username kullanılıyor" });
  const arananKisi2 = await db("users").where("email", req.body.email).first();
  arananKisi2 && next({ status: 402, message: "email kullanılıyor" });
  next();
}

module.exports = {
  restricted,
  protected,
  userNameCheck,
  checkPayloadLogin,
  checkPayloadRegister,
  epostaUnique,
};
