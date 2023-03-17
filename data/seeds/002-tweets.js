/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const tweetData = [{ text: "hello world", user_id: 1 }];
exports.tweetData = tweetData;
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return await knex("tweets").insert(tweetData);
};
