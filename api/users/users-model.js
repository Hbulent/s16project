const db = require("../../data/dbConfig");

async function dataAdjuster() {
  const allComments = await db("comments as c")
    .leftJoin("tweets as t", "t.tweet_id", "c.tweet_id")
    .leftJoin("users as u", "u.user_id", "t.user_id")
    .select("u.*", "t.*", "c.*");
  const allTweets = await db("tweets as t")
    .leftJoin("users as u", "u.user_id", "t.user_id")
    .select("u.*", "t.*");
  const allUsers = await db("users");
  let newArr = allUsers.map((user) => {
    let newTweetArr = [];
    allTweets.forEach((tweet) => {
      let newCommentArr = [];
      allComments.forEach((comment) => {
        if (comment.tweet_id === tweet.tweet_id) {
          let newCommentObj = {
            comment_id: comment.comment_id,
            content: comment.content,
          };
          newCommentArr.push(newCommentObj);
        }
      });
      let newTweetObj = {
        tweet_id: tweet.tweet_id,
        text: tweet.text,
        comment: newCommentArr,
      };
      if (tweet.user_id === user.user_id) newTweetArr.push(newTweetObj);
    });
    let newUserObj = {
      userid: user.user_id,
      name: user.name,
      surname: user.surname,
      username: user.username,
      tweets: newTweetArr,
    };
    return newUserObj;
  });
  return newArr;
}
async function getAll() {
  return await dataAdjuster();
}

async function getById(id) {
  const insertedId = await db("users").where({ user_id: id }).first();
  let newObje = {
    user_id: insertedId.user_id,
    name: insertedId.name,
    surname: insertedId.surname,
    email: insertedId.email,
  };
  const allUsers = await dataAdjuster();
  let istenenTweet = allUsers.filter(
    (user) => user.userid == insertedId.user_id
  );
  return istenenTweet;
}

async function create(payload) {
  console.log("buradayım");
  const [insertedId] = await db("users").insert(payload);
  console.log(insertedId);
  const allUsers = await dataAdjuster();
  let istenenTweet = allUsers.filter((user) => user.userid == insertedId);
  return istenenTweet;
}
async function remove(userid) {
  return await db("users").where("user_id", userid).del();
}

module.exports = {
  getAll,
  getById,
  remove,
  create,
};
