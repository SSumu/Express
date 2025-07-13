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
// testRouter1.get(
//   // Using query
//   // "/abc",
//   // query("name")
//   //   .isEmail()
//   //   .withMessage("not a email")
//   //   .isBoolean()
//   //   .withMessage("not a bool") /*isString() isEmpty() isEmail()*/, // withMessage() method allows us to send a error message which we want. This can be prolong as a chain.
//   // query("age").isNumeric().withMessage("not a number"), // There it can be added further more queries by using middleware. This is a middleware.

//   // Using path param
//   // "/abc/:name/:age", // : This is to pick the param
//   // param("name")
//   //   .isEmail()
//   //   .withMessage("not a email")
//   //   .isBoolean()
//   //   .withMessage("not a bool") /*isString() isEmpty() isEmail()*/, // withMessage() method allows us to send a error message which we want. This can be prolong as a chain.
//   // param("age").isNumeric().withMessage("not a number"),

//   // Using body
//   // "/abc",
//   // body("name")
//   //   .isEmail()
//   //   .withMessage("not a email")
//   //   .isBoolean()
//   //   .withMessage("not a bool") /*isString() isEmpty() isEmail()*/, // withMessage() method allows us to send a error message which we want. This can be prolong as a chain.
//   // body("age").isNumeric().withMessage("not a number"),

//   // "/abc",
//   // [
//   //   body("name")
//   //     .isEmail()
//   //     .withMessage("not a email")
//   //     .isBoolean()
//   //     .withMessage("not a bool") /*isString() isEmpty() isEmail()*/, // withMessage() method allows us to send a error message which we want. This can be prolong as a chain.
//   //   body("age").isNumeric().withMessage("not a number"),
//   // ],

//   // "/abc",
//   // validatorMethod(),
//   // (req, res) => {
//   //   // isString means that in which way query('name') should be exist.
//   //   //   console.log(req.query?.name);
//   //   //   console.log(req["express-validator#contexts"]); // This is where the place of the details of express-validator
//   //   const r = validationResult(req); // This is a function from express-validator to form and prepare the details in pleasent way and then take that details in a regular way. Put the request from express-validation.
//   //   const d = matchedData(req); // This method will only give the correct data for the process.

//   //   // console.log(r);
//   //   // console.log(r.array()); // array() method gives a array as the result in pleasent and regular way.
//   //   console.log(d);
//   //   if (r.array().length) return res.sendStatus(400); // This means if there is a length, there are errors or otherwise if there is not a length there are no errors.
//   //   res.sendStatus(200);
//   // }

//   // using schema
//   "/abc/:age",
//   checkSchema({
//     // This is to send data as a schema. schema will defaultly check the body for the data. Then it will also check the query and the path param for the data. It can identify the location where the data come from.
//     // name:{
//     //   // Here in this way errorMessage is only for isEmail.
//     //   isEmail:true,
//     //   errorMessage:'not a email'
//     // }
//     age: {
//       isNumeric: {
//         errorMessage: "not a number",
//       },
//     },
//     name: {
//       // This is the way to give errorMessage for unique fields.
//       // Unique field
//       isEmail: {
//         errorMessage: "not a email",
//       },
//       // Unique field
//       isBoolean: {
//         errorMessage: "not a bool",
//       },
//     },
//     city: {
//       // This is the common way to give errorMessage for all the fields.
//       isNumeric: true,
//       errorMessage: "not a valid city",
//     },
//   }),
//   (req, res) => {
//     // isString means that in which way query('name') should be exist.
//     //   console.log(req.query?.name);
//     //   console.log(req["express-validator#contexts"]); // This is where the place of the details of express-validator
//     const r = validationResult(req); // This is a function from express-validator to format and prepare the details in pleasent way and then take that details in a regular way. Put the request from express-validation.
//     const d = matchedData(req); // This method will only give the correct data for the process.

//     // console.log(r);
//     // console.log(r.array()); // array() method gives a array as the result in pleasent and regular way.

//     // console.log(d);
//     console.log(r.array());
//     if (r.array().length) return res.sendStatus(400); // This means if there is a length, there are errors or otherwise if there is not a length there are no errors.
//     res.sendStatus(200);
//   }
// );

testRouter1.get("/get-cookie", (req, res) => {
  // Let's send a cookie to the client side as a response. We can add more cookies.
  // This is the registration of cookies. (Cookies's registering)
  res.cookie("sadeepal-cookie", "sadeepal sumudupriya", {
    maxAge: 1000 * 30, // maxAge is the main thing in the option. This means that how much time it takes to automatically expire the cookie. It must be given in milliseconds
    httpOnly: true, // The simple meaning of httpOnly is cookie is accessed (or can be accessed) through the http requests. This is to prevent the cookie from being accessed from the client side.
    signed: true, // This cookie is a signed cookie.
  }); // Parameters are name: string, val: string, options: CookieOptions
  res.cookie("sadeepal-cookie-2", "sadeepal", {
    maxAge: 1000 * 60, // maxAge is the main thing in the option. This means that how much time it takes to automatically expire the cookie. It must be given in milliseconds.
    httpOnly: true, // The simple meaning of httpOnly is cookie is accessed (or can be accessed) through the http requests. This is another option in the cookie and it is most important option. Even we give the httpOnly: true, ,cyber security persons know whether the cookie is accessible or not.
  }); // Parameters are name: string, val: string, options: CookieOptions
  // It is difficult to access a cookie through inbuilt JavaScript. It is not cannot but difficult.
  res.sendStatus(200); // Return response
});

// To check the cookie. This is to read the cookie in the server side. For that this end-point needs to do that. This end-point can be a any end-point.
testRouter1.get("/read-cookie", (req, res) => {
  // These two console.logs have two sides. We have to check which one get the response. It means that which one reads the cookie.
  console.log(req.cookies); // Read the cookies. We can directly access like this. From this we can check whether the data are there or not. Also we can check the validation. So its clearly see that the cookie we have put in here has been registered to the port related to the domain (localhost in here).
  console.log(req.signedCookies["sadeepal-cookie"]); // Now the sadeepal-cookie must be read in a different way. signedCookies are accessed like this. ['sadeepal-cookie'] means accessing the sadeepal-cookie cookie.
  // console.log(req.headers.cookie); We can also access this from the header.

  res.sendStatus(200);
});

// We have to register a session like above
testRouter1.get("/get-session", (req, res) => {
  // Session registration is different. This is the session registration.
  // Here the session registration is written to the request.
  // This is the writting of a session. But it belongs to the request.
  req.session["sadeepal-session"] = {
    // Data
    name: "sadeepal",
    age: 27,
  };
  req.session["sadeepal-session-2"] = {
    // Data
    name: "sumudupriya",
    age: 27,
  };
  // Same end-point is used for the both sessions.
  res.sendStatus(200);
});

testRouter1.get("/read-session", (req, res) => {
  console.log(req.sessionID);

  console.log(req.session);

  res.sendStatus(200);
});

// Both session registration and getting are done by the request.

export default testRouter1;
