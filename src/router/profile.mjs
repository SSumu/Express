import { Router } from "express";
import { comQValidate, comValidate } from "../utils/validatorMethod.mjs";
import { matchedData, param, validationResult } from "express-validator";
import { resError } from "../utils/error-creator.mjs";
import DB from "../db/db.mjs";

const profileRouter = Router();

//Lets put validate

// get all profiles
profileRouter.get("/all", async (req, res) => {
  try {
    const allProfile = await DB.profile.findMany({
      // We can take the data that in the relation using select property.
      select: {
        // To select only required data, we can select the data which we want to fetch.
        Image: true, // To get only the image data
        AccountDetails: {
          select: {
            Name: true,
            Username: true,
          },
        },
      },

      // There it cannot use both the select and include at the same time. We can take the data from both include and select but both cannot be used at the same time.

      // include: {
      //   AccountDetails: {
      //     select: {
      //       // select property allows us to select which details should be shown when the response has been come. Only selected components below will be fetched. This tells that select only Name and Username from AccountDetails. Others are not come.
      //       Name: true,
      //       Username: true,
      //     },
      //   },
      // },
    }); // include is a key. include:{AccountDetails:true} ---> This is to get with the user. AccountDetails has came from schema.prisma.
    return res.status(200).json({
      msg: "all user profiles",
      error: null,
      data: allProfile,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      msg: "error",
      error: "database error",
      data: null,
    });
  }
}); // This is the way how to take it with the user information.

// get profile by id
profileRouter.get(
  "/:id",
  param("id").notEmpty().isNumeric().withMessage("Enter id as number"),
  async (req, res) => {
    // We can put a validate if we need.
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

    try {
      const profile = await DB.profile.findUnique({
        // We can take the data that in the relation using select property.
        select: {
          // To select only required data, we can select the data which we want to fetch.
          Image: true, // To get only the image data
          AccountDetails: {
            select: {
              Name: true,
              Username: true,
            },
          },
        },
        where: {
          // where condition can be added before the select or after the select.
          Id: Number(data.id), // Through Id, Number method for convert to the number
        },

        // There it cannot use both the select and include at the same time. We can take the data from both include and select but both cannot be used at the same time.

        // include: {
        //   AccountDetails: {
        //     select: {
        //       // select property allows us to select which details should be shown when the response has been come. Only selected components below will be fetched. This tells that select only Name and Username from AccountDetails. Others are not come.
        //       Name: true,
        //       Username: true,
        //     },
        //   },
        // },
      }); // include is a key. include:{AccountDetails:true} ---> This is to get with the user. AccountDetails has came from schema.prisma.
      return res.status(200).json({
        msg: "User profile",
        error: null,
        data: profile,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        msg: "error",
        error: "database error",
        data: null,
      });
    }
  }
); // This is the way how to take it with the user information.

// create new profile
profileRouter.post(
  "/create",
  comQValidate("userId"),
  comValidate("Image"),
  async (req, res) => {
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

    // In here, this is the creation of the profile.
    try {
      // First we have to migrate profile. Then it will be suggested at here.
      const newProfile = await DB.profile.create({
        // The thing which will be created one sent as newProfile.
        // data is necessarily have in here. userId necessarily has in here.
        data: {
          UserId: Number(data.userId), // +data.userId :- By Adding + in here, we can convert this into number. Otherwise we can use parseInt here.
          Image: data.Image,
        },
      });
      // We can take the user's data also if we want. As we put the userId, it connect automatically.

      // Response of the profile creation
      return res.status(201).json({
        // 201 because this is a created one
        msg: "new profile created",
        error: null,
        data: newProfile,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        msg: "error",
        error: "database error",
        data: null,
      });
    }

    // res.sendStatus(200);

    // We are going to build this in the way that token is to be required.

    // We can use a middleware for the above whole process as the above code snippet is written in the same way(form).
  }
); // We take create in here because we want to take query. In the queryValidate we need userId. We need Image through comValidate.

// update profile
profileRouter.put(
  "/update",
  comQValidate("userId"), // id is taken through query. If we need, we can search the profile by the UserId and then we can update the profile.
  comValidate("Image"),
  async (req, res) => {
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

    // In here, this is the update of the profile.
    try {
      // First we have to migrate profile. Then it will be suggested at here.
      const updateProfile = await DB.profile.update({
        // data is necessarily have in here. userId necessarily has in here.
        data: {
          // UserId: Number(data.userId), UserId is not updated at here. // +data.userId :- By Adding + in here, we can convert this into number. Otherwise we can use parseInt here.
          Image: data.Image, // Only the Image is updated. All updated data will be sent because select condition is not used in here.
        },
        where: {
          // In this where condition :- In update, under where condition, field must be unique. Otherwise it is an error.
          UserId: Number(data.userId),
        },
      });
      // We can take the user's data also if we want. As we put the userId, it connect automatically.

      // Response of the profile update
      return res.status(200).json({
        // All updated data will be sent.
        msg: "update profile",
        error: null,
        data: updateProfile,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        msg: "error",
        error: "database error",
        data: null,
      });
    }

    // res.sendStatus(200);

    // We are going to build this in the way that token is to be required.

    // We can use a middleware for the above whole process as the above code snippet is written in the same way(form).
  }
); // In the queryValidate we need userId. We need Image through comValidate.

// We update the Image through query as UserId. We search through Id, then update the Image.

// delete profile
// There it is able to give delete through userId.
profileRouter.delete(
  "/delete",
  comQValidate("userId"), // id is taken through query. If we need, we can search the profile by the UserId and then we can update the profile.
  async (req, res) => {
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

    // In here, this is the update of the profile.
    try {
      // First we have to migrate profile. Then it will be suggested at here.
      const deleteProfile = await DB.profile.delete({
        // Delete the user through where condition.
        where: {
          UserId: Number(data.userId),
        },
        select: {
          AccountDetails: {
            select: {
              Name: true,
            },
          },
        },
      });

      // Response of the profile deletion
      return res.status(200).json({
        msg: "delete profile",
        error: null,
        data: `${deleteProfile.AccountDetails.Name}'s profile deleted.`,
      });
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        msg: "error",
        error: "database error",
        data: null,
      });
    }

    // res.sendStatus(200);

    // We are going to build this in the way that token is to be required.

    // We can use a middleware for the above whole process as the above code snippet is written in the same way(form).
  }
); // In the queryValidate we need userId. We need Image through comValidate.

// Profile deletion is not done at profile side.

export default profileRouter;
