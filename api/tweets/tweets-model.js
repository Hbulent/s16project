const db = require("../../data/dbConfig");
const commentModel = require("../comments/comments-model");

async function dataAdjuster() {
  const allComments = await db("comments as c")
    .leftJoin("tweets as t", "t.tweet_id", "c.tweet_id")
    .leftJoin("users as u", "u.user_id", "t.user_id")
    .select("u.*", "t.*", "c.*");
  const allTweets = await db("tweets as t")
    .leftJoin("users as u", "u.user_id", "t.user_id")
    .select("u.*", "t.*");

  let newArr = allTweets.map((tweet) => {
    let newCommentArr = [];
    allComments.forEach((comment) => {
      if (comment.tweet_id === tweet.tweet_id) {
        newCommentArr.push(comment);
      }
    });
    let newTweetObj = {
      tweet_id: tweet.tweet_id,
      text: tweet.text,
      comment: newCommentArr,
    };
    return newTweetObj;
  });

  return newArr;
}
async function getAll() {
  return await dataAdjuster();
}

async function getByTweetId(tweetid) {
  const allUsers = await dataAdjuster();
  let istenenTweet = allUsers.filter((user) => user.tweet_id == tweetid);
  return istenenTweet;
}
async function createTweet(tweet) {
  const [insertedTweet] = await db("tweets").insert(tweet);
  const allUsers = await dataAdjuster();
  let istenenTweet = allUsers.filter((user) => user.tweet_id == tweet.tweet_id);
  return istenenTweet;
}

module.exports = {
  getAll,
  getByTweetId,
  createTweet,
};
