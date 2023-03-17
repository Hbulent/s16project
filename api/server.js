const express = require("express");
const server = express();

const authRouter = require("./auth/auth-router");
const usersRouter = require("./users/users-router");
const tweetsRouter = require("./tweets/tweets-router");
const commnetsRouter = require("./comments/comments-router");

const md = require("./auth/auth-middleware");
server.use(express.json());
server.use("/api/auth", authRouter);
server.use("/api/users", md.restricted, usersRouter);
server.use("/api/tweets", md.restricted, tweetsRouter);
server.use("/api/comments", md.restricted, commnetsRouter);

server.use((err, req, res, next) => {
  res.status(404).json({ message: err });
});

module.exports = server;
