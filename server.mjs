import express from "express";
// import routers
// import userRouter from "./src/router/user.mjs";
// import productRouter from "./src/router/product.mjs";
import rootRouter from "./src/router/index.mjs";

const server = express();

server.use(express.json());
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
