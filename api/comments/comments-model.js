const db = require("../../data/dbConfig");

async function getAll() {
  return await db("comments");
}

async function getByIdComment(commentid) {
  return await db("comments").where("comment_id", commentid).first();
}

async function insertComment(comment) {
  const [insertedId] = await db("comments").insert(comment);
  return await getByIdComment(insertedId);
}

async function removeComment(commentid) {
  return await db("comments").where("comment_id", commentid).del();
}
module.exports = {
  getAll,
  getByIdComment,
  insertComment,
  removeComment,
};
