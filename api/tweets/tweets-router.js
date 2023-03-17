const express = require("express");
const router = require("express").Router();
const tweetModel = require("./tweets-model");
const mw = require("./tweets-middleware");
const { response } = require("../server");

router.get("/", async (req, res, next) => {
  tweetModel
    .getAll()
    .then((response) => res.status(200).json(response))
    .catch((error) => next({ status: 500, message: "database problem" }));
});
router.get("/:id", mw.checkTweetId, (req, res, next) => {
  tweetModel
    .getByTweetId(req.params.id)
    .then((response) => res.status(200).json(response))
    .catch((error) => next({ status: 500, message: "database problem" }));
});

router.post("/", async (req, res, next) => {
  tweetModel
    .createTweet(req.body)
    .then((response) => res.status(200).json(response))
    .catch((error) => next({ status: 500, message: "database problem" }));
});

router.use((err, req, res, next) => {
  res.status(err.status).json({ message: err.message });
});
module.exports = router;
