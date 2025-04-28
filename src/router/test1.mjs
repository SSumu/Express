import { Router } from "express";
// import testMiddleware from "../utils/testMiddleware.mjs";
import {
  checkSchema,
  // body,
  matchedData,
  // param,
  // query,
  validationResult,
} from "express-validator";
import { validatorMethod } from "../utils/validatorMethod.mjs";

const testRouter1 = Router();

// Middleware is a request response chain.
// testRouter.get("/", (req, res) => res.sendStatus(200),(req, res) => res.sendStatus(200));
testRouter1.get(
  // Using query
  // "/abc",
  // query("name")
  //   .isEmail()
  //   .withMessage("not a email")
  //   .isBoolean()
  //   .withMessage("not a bool") /*isString() isEmpty() isEmail()*/, // withMessage() method allows us to send a error message which we want. This can be prolong as a chain.
  // query("age").isNumeric().withMessage("not a number"), // There it can be added further more queries by using middleware. This is a middleware.

  // Using path param
  // "/abc/:name/:age", // : This is to pick the param
  // param("name")
  //   .isEmail()
  //   .withMessage("not a email")
  //   .isBoolean()
  //   .withMessage("not a bool") /*isString() isEmpty() isEmail()*/, // withMessage() method allows us to send a error message which we want. This can be prolong as a chain.
  // param("age").isNumeric().withMessage("not a number"),

  // Using body
  // "/abc",
  // body("name")
  //   .isEmail()
  //   .withMessage("not a email")
  //   .isBoolean()
  //   .withMessage("not a bool") /*isString() isEmpty() isEmail()*/, // withMessage() method allows us to send a error message which we want. This can be prolong as a chain.
  // body("age").isNumeric().withMessage("not a number"),

  // "/abc",
  // [
  //   body("name")
  //     .isEmail()
  //     .withMessage("not a email")
  //     .isBoolean()
  //     .withMessage("not a bool") /*isString() isEmpty() isEmail()*/, // withMessage() method allows us to send a error message which we want. This can be prolong as a chain.
  //   body("age").isNumeric().withMessage("not a number"),
  // ],

  // "/abc",
  // validatorMethod(),
  // (req, res) => {
  //   // isString means that in which way query('name') should be exist.
  //   //   console.log(req.query?.name);
  //   //   console.log(req["express-validator#contexts"]); // This is where the place of the details of express-validator
  //   const r = validationResult(req); // This is a function from express-validator to form and prepare the details in pleasent way and then take that details in a regular way. Put the request from express-validation.
  //   const d = matchedData(req); // This method will only give the correct data for the process.

  //   // console.log(r);
  //   // console.log(r.array()); // array() method gives a array as the result in pleasent and regular way.
  //   console.log(d);
  //   if (r.array().length) return res.sendStatus(400); // This means if there is a length, there are errors or otherwise if there is not a length there are no errors.
  //   res.sendStatus(200);
  // }

  // using schema
  "/abc/:age",
  checkSchema({
    // This is to send data as a schema. schema will defaultly check the body for the data. Then it will also check the query and the path param for the data. It can identify the location where the data come from.
    // name:{
    //   // Here in this way errorMessage is only for isEmail.
    //   isEmail:true,
    //   errorMessage:'not a email'
    // }
    age: {
      isNumeric: {
        errorMessage: "not a number",
      },
    },
    name: {
      // This is the way to give errorMessage for unique fields.
      // Unique field
      isEmail: {
        errorMessage: "not a email",
      },
      // Unique field
      isBoolean: {
        errorMessage: "not a bool",
      },
    },
    city: {
      // This is the common way to give errorMessage for all the fields.
      isNumeric: true,
      errorMessage: "not a valid city",
    },
  }),
  (req, res) => {
    // isString means that in which way query('name') should be exist.
    //   console.log(req.query?.name);
    //   console.log(req["express-validator#contexts"]); // This is where the place of the details of express-validator
    const r = validationResult(req); // This is a function from express-validator to format and prepare the details in pleasent way and then take that details in a regular way. Put the request from express-validation.
    const d = matchedData(req); // This method will only give the correct data for the process.

    // console.log(r);
    // console.log(r.array()); // array() method gives a array as the result in pleasent and regular way.

    // console.log(d);
    console.log(r.array());
    if (r.array().length) return res.sendStatus(400); // This means if there is a length, there are errors or otherwise if there is not a length there are no errors.
    res.sendStatus(200);
  }
);

export default testRouter1;
