import { Router } from "express";
import testMiddleware from "../utils/testMiddleware.mjs";

const testRouter = Router();

// Middleware is a request response chain.
// testRouter.get("/", (req, res) => res.sendStatus(200),(req, res) => res.sendStatus(200));
testRouter.get(
  "/",
  // (req, res, next) => {
  //   console.log("1");
  //   if (req.method === "GET") {
  //     return next(); // when the return keyword meets, the the latter part of the code scope will not be executed.
  //   }
  //   res.sendStatus(201);
  //   // next();
  // },
  testMiddleware,
  (req, res, next) => {
    console.log("2");
    res.sendStatus(200);
    next();
  },
  (req, res) => {
    console.log("3");
    // sendStatus will stop the connection as soon as the status was sent
    // res.sendStatus(401);
    // res.sendStatus(200);
  }
);

export default testRouter;
