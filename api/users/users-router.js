const router = require("express").Router();
const userModel = require("./users-model");
const userMW = require("./users-middleware");
const { response } = require("../server");

router.get("/", async (req, res, next) => {
  const allUsers = await userModel.getAll();
  res.status(200).json(allUsers);
});

router.get("/:id", userMW.checkUserId, async (req, res, next) => {
  userModel
    .getById(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((error) =>
      next({ status: 404, message: "bu kullanıcı bulunamadı" })
    );
});
router.delete("/:id", userMW.checkUserId, async (req, res, next) => {
  userModel
    .remove(req.params.id)
    .then((response) =>
      res.status(200).json({ message: "kullanıcı silinmiştir" })
    );
});

router.use((err, req, res, next) => res.status(err.status).json(err.message));

module.exports = router;
