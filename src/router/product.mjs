import { Router } from "express";
import { productData } from "../data/product-data.mjs";

const productRouter = Router();

// get product by id
productRouter.get("/:id", (req, res) => {
  const product = productData.find((p) => p.id === Number(req.params.id));
  res.status(200).json({
    msg: "your product",
    data: product,
  });
});

export default productRouter;
