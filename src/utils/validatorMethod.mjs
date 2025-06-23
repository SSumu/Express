import { body, param, query } from "express-validator";

export const validatorMethod = () => [
  // This is not necessarily need to be a function. If there is any other other logic, it can be applied.
  body("name").isEmail().withMessage("not a email"),
  // .isBoolean()
  // .withMessage("not a bool") /*isString() isEmpty() isEmail()*/, // withMessage() method allows us to send a error message which we want. This can be prolong as a chain.
  body("age").isNumeric().withMessage("not a number"),
  query("city").isString().withMessage("invalid data"), // These are validators
];

export const registerValidate = [
  // This is a array to validate login.
  body("Username").notEmpty().withMessage("Plz enter username"),
  body("Password")
    .notEmpty()
    .withMessage("Password not found")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 2,
      minNumbers: 3,
      minSymbols: 2,
      minUppercase: 1,
    })
    .withMessage("Plz enter strong password with min char 8,"), // min defines the minimum character limit. With every method withMessage() gives a message.
  body("Name").notEmpty().withMessage("Plz enter the name"),
];

export const comValidate = (...keys) => {
  // ...keys means that in the validatorMethod.mjs some specific keys will be come to here from there. If the remaining bodies are taken as the same way, We can use common validate instead of this loginValidate. If the same way is functioning. I think this ...keys menas the information that user enters to the text boxes at the login.
  const bodyVa = [];
  keys.forEach((k) => {
    bodyVa.push(body(k).notEmpty().withMessage(`Plz Enter The ${k}`));
  });

  return bodyVa;
};

export const comQValidate = (...keys) => {
  // ...keys means that in the validatorMethod.mjs some specific keys will be come to here from there. If the remaining bodies are taken as the same way, We can use common query validate instead of this loginValidate. If the same way is functioning. I think this ...keys means the information that user enters to the text boxes at the login.
  const qVa = [];
  keys.forEach((k) => {
    qVa.push(query(k).notEmpty().withMessage(`Plz Enter The ${k}`));
  });

  return qVa;
};

export const comPValidate = (...keys) => {
  // ...keys means that in the validatorMethod.mjs some specific keys will be come to here from there. If the remaining bodies are taken as the same way, We can use common path validate instead of this loginValidate. If the same way is functioning. I think this ...keys means the information that user enters to the text boxes at the login.
  const pVa = [];
  keys.forEach((k) => {
    pVa.push(
      param(k)
        .notEmpty()
        .isNumeric()
        .withMessage(`Plz Enter The ${k} as Number`)
    );
  });

  return pVa;
};
