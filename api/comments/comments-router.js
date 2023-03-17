const router = require("express").Router();
const { response } = require("../server");
const mw = require("./comments-middleware");
const commentsModel = require("./comments-model");

router.get("/", async (req, res, next) => {
  commentsModel
    .getAll()
    .then((response) => res.status(200).json(response))
    .catch((error) => next({ status: 500, message: "database problem" }));
});

router.post("/", async (req, res, next) => {
  commentsModel
    .insertComment(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => next({ status: 500, message: "database problem" }));
});

router.delete("/:id", mw.checkCommentId, async (req, res, next) => {
  commentsModel
    .removeComment(req.params.id)
    .then((response) => res.status(200).json({ message: "yorum silinmiştir" }))
    .catch((error) => next({ status: 500, message: "database problem" }));
});

router.use((err, req, res, next) =>
  res.status(err.status).json({ message: err.message })
);

module.exports = router;
