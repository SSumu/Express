import { verifyToken } from "./jwt.mjs";

// This is the authentication middleware for securing routes
export const checkAuth = (req, res, next) => {
  // we are going to use this as a middleware. This function is not async further.
  // const token = req.body.token; // token has been taken from the body but the token is not sent by the body.
  // console.log(decodToken(token)); // decodToken is the function that we have created previously
  // console.log(token);

  // When middleware are used
  const auth = req.headers.authorization; // Here token is sent from headers in the request. Here the auth is taken firstly because it may be(or possibly) not come.
  if (auth === undefined) {
    return res.status(401).json({
      msg: "error",
      error: "token not found",
      data: null,
    });
  }

  // Checks if the key is ours. Additional validate
  if (auth.split(" ")[0] !== "ssdev") {
    return res.status(400).json({
      msg: "error",
      error: "bad request",
      data: null,
    });
  }

  // token is come to index 1 if the above part was corrected. That is the location of the token.
  const token = auth.split(" ")[1];

  // console.log(auth);

  const payload = verifyToken(token); // verifyToken() must be imported.

  // If the token is invalid or expired, then the payload will be null
  if (payload === null) {
    return res.status(401).json({
      msg: "error",
      error: "token expired.",
      data: null,
    });
  }

  // console.log(verifyToken(token)); //If the response of this is null, then the token is invalid(expired).

  // res.sendStatus(200);
  next();
};
