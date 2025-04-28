const testMiddleware = (req, res, next) => {
  console.log("1");
  if (req.method === "GET") {
    return next(); // when the return keyword meets, the the latter part of the code scope will not be executed.
  }
  res.sendStatus(201);
};

export default testMiddleware;
