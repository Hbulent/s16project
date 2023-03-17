require("dotenv").config();

module.exports = {
  PORT: process.env.PORT || 9000,
  JWT_SECRET: process.env.JWT_SECRET || "açıl susam açıl",
};
