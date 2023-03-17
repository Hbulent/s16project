const db = require("../../data/dbConfig");
const userModel = require("./users-model");

const checkUserId = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const isExist = await db("users").where({ user_id }).first();
    if (!isExist) {
      res
        .status(404)
        .json({ message: `${user_id} id\'li kullanıcı bulunamadı` });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUserId };
