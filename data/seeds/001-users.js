/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
const userData = [
  {
    username: "bulent",
    password: "1234",
    email: "asdasd@",
    name: "bülent",
    surname: "hacı",
  },
];

exports.userData = userData;
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  return await knex("users").insert(userData);
};
