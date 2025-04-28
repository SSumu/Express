import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./product.mjs";
import testRouter from "./test.mjs";
import testRouter1 from "./test1.mjs";
import profileRouter from "./profile.mjs";

const rootRouter = Router();

rootRouter.get("/", (req, res) => res.sendStatus(200));
// rootRouter.use("/user-1", userRouter);
// rootRouter.use("/product-1", productRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/profile", profileRouter);
rootRouter.use("/product", productRouter);
rootRouter.use("/test", testRouter);
rootRouter.use("/test1", testRouter1);

export default rootRouter;
