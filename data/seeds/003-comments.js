/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const commentsData = [{ content: "asdasdsa", user_id: 1, tweet_id: 1 }];
exports.commentsData = commentsData;
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return await knex("comments").insert(commentsData);
};
