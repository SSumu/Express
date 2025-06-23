import { Router } from "express";
// import { userInfor } from "../data/user-infor.mjs";
import DB from "../db/db.mjs";
import { comValidate, registerValidate } from "../utils/validatorMethod.mjs";
import { matchedData, validationResult } from "express-validator";
import { /*loginError,*/ resError } from "../utils/error-creator.mjs";
import { /*decodToken,*/ tokenGen /*, verifyToken*/ } from "../utils/jwt.mjs";
import { checkAuth } from "../utils/authMiddleware.mjs";

const userRouter = Router();

// get all users
userRouter.get(/*"/api/v1/user/all-user/"*/ "/all-user", async (_, res) => {
  try {
    const userData = await DB.user.findMany();
    return res.status(200).json({
      msg: "user data",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "error",
      error: "your error msg",
      data: null,
    });
  }
  // res.status(200).json({
  //   msg: "user data",
  //   data: userInfor,
  // });
});

// get user by id
userRouter.get(/*"/api/v1/user/by-id"*/ "/by-id", async (req, res) => {
  //   console.log(req.query);
  const { id } = req.query;
  if (id !== undefined && id !== "") {
    try {
      const userData = await DB.user.findUnique({
        where: {
          Id: Number(id),
        },
      });
      if (userData !== null)
        return res.status(200).json({
          msg: "error",
          error: "your error msg",
          data: userData,
        });

      return res.status(404).json({
        msg: "error",
        error: "user data not found",
        data: userData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "error",
        error: "your error msg",
        data: null,
      });
    }
    // const user = userInfor.find((u) => u.id === Number(id));
    // return res.status(200).json({
    //   msg: "user data",
    //   data: user,
    // });
  }
  return res.status(400).json({
    msg: "some error",
    data: null,
  });
});

// Get the profile and product from user's side
// For the profile
// Directly to the profile through the user
// Get the profile from user's side
userRouter.get(
  /*"/api/v1/user/by-id"*/ "/profile/:userId",
  async (req, res) => {
    //   console.log(req.query);
    const { userId } = req.params; // Get the userId from path params
    if (userId !== undefined && userId !== "") {
      try {
        const userData = await DB.user.findUnique({
          select: {
            Profile: {
              select: {
                Image: true, // An object will be get as the response. But the thing will work as the same way even it is an object.
              },
            }, // To remove all the unneccessary data and keep only the neccessary in the profile as usual.
          },
          where: {
            Id: Number(userId),
          },
        });
        if (userData !== null)
          return res.status(200).json({
            msg: "error",
            error: "your error msg",
            data: userData,
          });

        return res.status(404).json({
          msg: "error",
          error: "user data not found",
          data: userData,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          msg: "error",
          error: "your error msg",
          data: null,
        });
      }
      // const user = userInfor.find((u) => u.id === Number(id));
      // return res.status(200).json({
      //   msg: "user data",
      //   data: user,
      // });
    }
    return res.status(400).json({
      msg: "some error",
      data: null,
    });
  }
);

// Delete the products from user's side
// soft delete
userRouter.get(
  /*"/api/v1/user/by-id"*/ "/product/:userId",
  async (req, res) => {
    //   console.log(req.query);
    const { userId } = req.params; // Get the userId from path params
    if (userId !== undefined && userId !== "") {
      try {
        const userData = await DB.user.findUnique({
          select: {
            Products: {
              select: {
                Name: true, // Even if there is an array for product in product's side, we can give like this to select. Then only Name will be selected and got as the response.
                ProductCategory: {
                  select: {
                    Name: true,
                  },
                }, //When taking products from user's side
              },
            },
          },
          where: {
            Id: Number(userId),
          },
        });
        if (userData !== null)
          return res.status(200).json({
            msg: "error",
            error: "your error msg",
            data: userData,
          });

        return res.status(404).json({
          msg: "error",
          error: "user data not found",
          data: userData,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).json({
          msg: "error",
          error: "your error msg",
          data: null,
        });
      }
      // const user = userInfor.find((u) => u.id === Number(id));
      // return res.status(200).json({
      //   msg: "user data",
      //   data: user,
      // });
    }
    return res.status(400).json({
      msg: "some error",
      data: null,
    });
  }
);

// create new user
userRouter.post("/create-user", async (req, res) => {
  const userData = req.body;
  // console.log(userData);

  try {
    const newUser = await DB.user.create({ data: userData });
    // return res.status(201).json({ newUser });
    return res.status(201).json({
      msg: "user data",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// update user data
userRouter.put(/*"/update-user/:id"*/ "/update-user", async (req, res) => {
  const { id } = req.query;
  const updateData = req.body;
  if (id !== undefined && id !== "") {
    try {
      const updatedUserData = await DB.user.update({
        where: {
          Id: Number(id),
        },
        data: updateData,
      });

      return res.status(200).json({
        msg: "user data",
        data: updatedUserData,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "error",
        error: "your error msg",
        data: null,
      });
    }
  }
  return res.status(400).json({
    msg: "error",
    error: "your error msg",
    data: null,
  });
});

// delete user
userRouter.delete("/delete-user/:id", async (req, res) => {
  const userId = req.params.id;
  if (userId !== undefined && userId !== "") {
    try {
      await DB.user.delete({
        where: {
          Id: Number(userId),
        },
      });
      return res.status(200).json({
        msg: "user deleted",
        data: null,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        msg: "error",
        error: "your error msg",
        data: null,
      });
    }
  }

  return res.status(400).json({
    msg: "error",
    error: "your error msg",
    data: null,
  });
});

// login
// There this must check whether the specific user is exists in the database and the password is in the database.
userRouter.post(
  "/login",
  comValidate("Username", "Password"),
  async (req, res) => {
    // '/login' is the path. First we have to find whether the data we want have been came to the req. comValidate is created in validatorMethod.mjs and it is put in here.
    const error = validationResult(req);
    // console.log(error.array()); // Get the error set as an array. Send data to client side in a ordered manner.
    const lerr = /*loginError*/ resError(error.array()); // Import loginError to here. loginError is the previous function name and new fuction name is resError which is a common function name.
    // console.log(lerr);

    if (error.array().length) {
      // Here the error has taken as an array. It's length property has been used to identify whether there is an error or not.
      return res.status(400).json({
        msg: "error",
        error: lerr,
        data: null,
      });
    }
    const data = matchedData(req); // This will give us the data which we want. This will give the real data if the data has come correcly.Then we can make it to put it into the database.
    // we can see what is include in the data if we want.
    console.log(data); // data will be filtered and they will be shown if those data are in the manner we have given.

    // *** As the same thing is repeated in here, we can use a middleware here. ***

    // Here we check if there is a username which we have given at the login.
    try {
      const user = await DB.user.findUnique({
        where: { Username: data.Username },
      }); // We can find through unique field. We give a condition through where property. We can spread the data. Then we can get the relevant user.

      // Here this checks if the user is in the database.
      if (user !== null) {
        // Here this checks if the given password is in the database.
        if (user.Password === data.Password) {
          // To generate the token
          // gen token
          // payload creates as a object
          const payload = {
            username: user.Username, // payload is created by Username has been taken from database
          };
          const token = tokenGen(payload); // tokenGen is created in tokenGen.mjs and it is put in here.
          console.log(token);

          return res.status(200).json({
            msg: "login success",
            error: null,
            data: {
              token,
            },
          });
        }
        return res.status(400).json({
          msg: "error",
          error: "password is not correct",
          data: null,
        });
      }
      return res.status(404).json({
        msg: "error",
        error: "this username not in the system.",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        msg: "error",
        error: "database error",
        data: null,
      });
    }
  }
);

// register
userRouter.post("/register", registerValidate, async (req, res) => {
  // '/register' is the path. First we have to find whether the data we want have been came to the req. registerValidate is created in validatorMethod.mjs and it is put in here.
  const error = validationResult(req);
  // console.log(error.array()); // Get the error set as an array. Send data to client side in a ordered manner.
  const lerr = /*loginError*/ resError(error.array()); // Import loginError to here. loginError is the previous function name and new fuction name is resError which is a common function name.
  // console.log(lerr);

  if (error.array().length) {
    // Here the error has taken as an array. It's length property has been used to identify whether there is an error or not.
    return res.status(400).json({
      msg: "error",
      error: lerr,
      data: null,
    });
  }
  const data = matchedData(req); // This will give us the data which we want. This will give the real data if the data has come correcly.Then we can make it to put it into the database.
  // we can see what is include in the data if we want.
  console.log(data); // data will be filtered and they will be shown if those data are in the manner we have given.

  try {
    await DB.user.create({ data }); // Send only the user was created and that is enough.
    return res.status(201).json({
      // 201 for user creation
      msg: "user created",
      error: null,
      data: null,
    });
  } catch (error) {
    // if the error occur in the databse, we can send it like this(the database error).
    console.log(error);
    if (error.code === "P2002") {
      // This will catch the error code and send the message after checking this error code.
      return res.status(500).json({
        msg: "error",
        error: "this username already used.",
        data: null,
      });
    }
    return res.status(500).json({
      msg: "error",
      error: "database error",
      data: null,
    });
  }
  // res.sendStatus(200);
});

userRouter.post(
  "/validate",
  checkAuth,
  (req, res) => {
    return res.status(200).json({
      msg: "success",
      error: null,
      data: "token verified",
    });
  }
  /*(req, res,next) => { // we are going to use this as a middleware. This function is not async further.
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
  const token = auth.split(' ')[1]

  // console.log(auth);

  const payload = verifyToken(token)

  // If the token is invalid or expired, then the payload will be null
  if(payload===null){
    return res.status(401).json({
      msg: "error",
      error: "token expired.",
      data: null,
    });
  }

  // console.log(verifyToken(token)); //If the response of this is null, then the token is invalid(expired).

  // res.sendStatus(200);
  next()
}*/
  /*async*/
); // This function can be put in a jwt.mjs as middleware

export default userRouter;
