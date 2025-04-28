import { Router } from "express";
import { comQValidate, comValidate } from "../utils/validatorMethod.mjs";
import { matchedData, validationResult } from "express-validator";
import { resError } from "../utils/error-creator.mjs";

const profileRouter = Router();

//Lets put validate

// get all profiles

// create new profile
profileRouter.post(
  "/create",
  comQValidate("userId"),
  comValidate("Image"),
  (req, res) => {
    const error = validationResult(req);
    const err = /*loginError*/ resError(error.array()); // We can use middleware if we need.

    if (error.array().length) {
      // Here the error has taken as an array. It's length property has been used to identify whether there is an error or not.
      return res.status(400).json({
        msg: "error",
        error: err,
        data: null,
      });
    }
    const data = matchedData(req); // This will give us the data which we want. This will give the real data if the data has come correcly.Then we can make it to put it into the database.
    // we can see what is include in the data if we want.
    console.log(data);

    res.sendStatus(200);

    // We are going to build this in the way that token is to be required.

    // We can use a middleware for the above whole process as the above code snippet is written in the same way(form).
  }
); // We take create in here because we want to take query. In the queryValidate we need userId. We need Image through comValidate.

export default profileRouter;
