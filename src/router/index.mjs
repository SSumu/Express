import { Router } from "express";
import userRouter from "./user.mjs";
import productRouter from "./product.mjs";
import testRouter from "./test.mjs";
import testRouter1 from "./test1.mjs";
import profileRouter from "./profile.mjs";
import { checkAuth } from "../utils/authMiddleware.mjs";
import categoryRouter from "./category.mjs";

const rootRouter = Router();

rootRouter.get("/", (req, res) => res.sendStatus(200));
// rootRouter.use("/user-1", userRouter);
// rootRouter.use("/product-1", productRouter);
rootRouter.use("/user", userRouter);
rootRouter.use("/profile", /*checkAuth,*/ profileRouter); // The middleware in the Authchecker(checkAuth) is worked before the profileRouter. This is to apply checkAuth for whole file. After meeting the checkAuth middleware, then it can goes to the profile. This effects all the end-points in the profile.
rootRouter.use("/product", productRouter);
rootRouter.use("/category", categoryRouter);
rootRouter.use("/test", testRouter);
rootRouter.use("/test1", testRouter1);

export default rootRouter;
