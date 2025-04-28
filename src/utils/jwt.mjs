import jwt from "jsonwebtoken"; // import the jwt package from jsonwebtoken

export const tokenGen = (payload) => {
  const token = jwt.sign(payload, "mykey"); // We use sign option of jwt to generate the tokens. sign option's output is a string. That output is the token. payload means some of the information of the user which will be attached with the token. Not all of the information of the user. These information are more important and useful to us and user can be specially identified by these information. These information can be userid, username and mostly used the username for this rather than the userid. Normally email is not used for this. rule can also be used for this. username and rule are primarily used for this. Furthermore information can be applied if it is needed. payload must be come from the location where function is used. secretOrPrivateKey means the thing to identify that token has been sent by us(The person who wants to send the token). That specific key has been used to identify the token. key means some amount of the words or anything we like or otherwise it must be a one which cannot or difficult to be guessed others. option is optional. There are three parameters in sign() which are payload, secretOrPrivateKey and option.
  // But this token is not actually secret because it's details can be viewed through the jwt.io website.
  return token;
};

export const decodToken = (token) => {
  // method
  const payload = jwt.decode(token); // payload is given when decode was happened
  return payload;
};

// sign(), decode() and verify() are methods of jwt
// third party person can see the payload of token of us and then he can regenerate another token. But that token also has our payload.
// Actually token does not give a security. Security is received from the way we handle the token. // the security will depend on how the way we control of the conditions(තත්‍ත්වයන්‍) occured by the token.

export const verifyToken = (token) => {
  // const payload = jwt.verify(token, "sadeepal");
  try {
    const payload = jwt.verify(token, "mykey");
    return payload;
  } catch (error) {
    console.log(error);
    return null;
  }
};
// For this situation, mykey is another one's token and sadeepal is the token of mine. Here the both tokens have equal payload.
// when a token is sent in a request, it is not included in the body.
// A response is sent to user after token's validity(correctness) is checked. To do that Authorization Middleware is used. It is also a Middleware.
// Token can be sent from body(), query() and path param. But that is not a very good way.
// There is a way to send the token. It is standard way to do that. We send the token under the header(in the Thunder Client or Postman) and that is the standard way.
