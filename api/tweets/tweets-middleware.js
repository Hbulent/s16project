const tweetModel = require("./tweets-model");
const db = require("../../data/dbConfig");

const checkTweetId = async function (req, res, next) {
  const arananKisi = await db("tweets")
    .where("tweet_id", req.params.id)
    .first();
  arananKisi
    ? next()
    : next({ status: 404, message: `id:${req.params.id} no'lu tweet yok` });
};

module.exports = { checkTweetId };
