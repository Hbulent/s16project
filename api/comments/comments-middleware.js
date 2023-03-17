const db = require("../../data/dbConfig");

const checkCommentId = async (req, res, next) => {
  const searchComment = await db("comments")
    .where("comment_id", req.params.id)
    .first();
  searchComment
    ? next()
    : next({
        status: 404,
        message: `${req.params.id} no'lu yorum bulunamamıştır`,
      });
};

module.exports = { checkCommentId };
