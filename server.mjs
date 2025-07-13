import express from "express";
import cookieParser from "cookie-parser";
import expressSession from "express-session";
// import routers
// import userRouter from "./src/router/user.mjs";
// import productRouter from "./src/router/product.mjs";
import rootRouter from "./src/router/index.mjs";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import DB from "./src/db/db.mjs";

const server = express();

server.use(express.json());
server.use(cookieParser("mykey")); // Register the cookie-parser as a middleware. Inside the cookieParser(), there are parameters as secret. This is to join the cookieParser. There it can put key as a secret key for secret parameter. options parameter are optional. The important thing is putting the key and what is the advantage and disadvantage of it and what happens from it. The incident happens there is creating a sign cookie. sign cookie is putting(applying) a signature to it. Simple opinion of sign cookie is putting a small code to cookie.
server.use(
  expressSession({
    secret: "mykey", // In here the secret key is same as in the secret key in the cookies.
    resave: false, // When we call the session every time, it saves the session even the session is exist or not. Most times it should be keep as false. It saves the session even if the changes happen or not in the session. But it should not be happened. So that is why we keep it false.
    saveUninitialized: true, // if it not initialized, then it is not saved. When we keep this to false, at each call Previous Session is "immediately" changed to the New Session. It is a unnecessary thing because if already a session is initialized, then there is no need to initialize a new session. If a session is Uninitialized, then it needs to be saved. So that is why we keep it as true. There it is not practical that to put a New Session ID when every times the Sessions are created.

    // In the Session, this cookie keeps the data set. (Even if the Cookie keeps string in it.)
    cookie: {
      maxAge: 1000 * 60, // Expiration time. How long the cookie will exist?
      httpOnly: true,
      signed: true,
    }, // Small description about the session goes to client side as a cookie. Those details must be given inside the brackets. Those details are the things related to the expiration of the session.

    // prisma-session-store is installed in here after the cookies.
    // As we already have a prisma client, we do not need a new prisma client.
    // prisma client can be brought to here from db method.
    store: new PrismaSessionStore(DB, {
      checkPeriod: 2 * 60 * 1000, //ms (2 is minutes. Function of the checkPeriod is to check sessions per the given time(2 * 60 * 1000 ms = 2 minutes) and if the sessions were expired then remove those expired sessions.)
      dbRecordIdIsSessionId: true, // This says that use the sid in the database as session id.
      dbRecordIdFunction: undefined, // This says about session id generate function. But in here, it does not need as it is already in here. Because it is automatically generated.
    }), // First one is DB because we have initialized it. Second one is the parameters which are inside the curly brackets.
  }) // Session's basic facts(options) are prepared.
);
// server.use("/api/v2/", rootRouter);
server.use("/api/v1", rootRouter);
// server.use("/api/v1/user", userRouter);
// server.use("/api/v1/product", productRouter);

// server.get("/", (req, res) => {
//   console.log(req);
//   // res.send("<h1>sadeepal sumudupriya</h1>");
//   res.json({
//     msg: "hi",
//   });
// });

// server.get("/api/v1/hello", async (req, res) => {
//   // res.status(400);
//   // res.status(500).json({ msg: "error" });
//   // res.sendStatus(500).json({ msg: "error" });
//   // res.json({ msg: "error" });
//   res.status(500);
//   res.json({ msg: "error" });
// });

server.listen(4000, () => console.log("server is running"));
