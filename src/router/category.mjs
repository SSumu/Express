import { Router } from "express";
import {
  comPValidate,
  comQValidate,
  comValidate,
} from "../utils/validatorMethod.mjs";
import DB from "../db/db.mjs";
import { matchedData, validationResult } from "express-validator";
import { resError } from "../utils/error-creator.mjs";
// import { productData } from "../data/product-data.mjs";

const categoryRouter = Router();

// get product by id
// categoryRouter.get("/:id", (req, res) => {
//   const product = productData.find((p) => p.id === Number(req.params.id));
//   res.status(200).json({
//     msg: "your product",
//     data: product,
//   });
// });

// get all products
categoryRouter.get("/all", async (_, res) => {
  // Since we do not use a request, we can ignore the req by replacing it with a underscore (_).
  try {
    const allProduct = await DB.product.findMany({
      // We can take the data that in the relation using select property.
      select: {
        // To select only required data, we can select the data which we want to fetch.
        Name: true, // To get only the name data
        User: {
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
      msg: "all user products",
      error: null,
      data: allProduct,
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

// get all products of a specific user
categoryRouter.get("/all-by-user", comQValidate("userId"), async (req, res) => {
  // Get the userId as a query parameter from comQValidate.
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
    const allProduct = await DB.product.findMany({
      // We can take the data that in the relation using select property.
      // Get the all products specific to the user.
      select: {
        // To select only required data, we can select the data which we want to fetch.
        Name: true, // To get only the name data
        User: {
          select: {
            Name: true,
            Username: true,
          },
        },
      },
      where: {
        UserId: Number(data.userId),
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
      msg:
        allProduct.length > 0
          ? `Products for ${allProduct[0]?.User?.Name}`
          : "no product for that user", // As a array comes as the output, there it has to select the user from that array. allProduct[0]?.User?.Name :- there the ? means that it maybe empty. Data will be sent only if the data are available. Otherwise the error will happen.
      error: null,
      data: allProduct,
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

// get product by id
categoryRouter.get(
  "/:id",
  // param("id").notEmpty().isNumeric().withMessage("Enter id as number"),
  comPValidate("id"),
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
      const product = await DB.product.findUnique({
        // We can take the data that in the relation using select property.
        select: {
          // To select only required data, we can select the data which we want to fetch.
          Name: true, // To get only the Name
          User: {
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
        msg: "User product",
        error: null,
        data: product,
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

// create new category
categoryRouter.post(
  "/create",
  comValidate("Name", "productIds"), // We want Name in the create. In here Name can be simple, But normally there it uses capital Name. As this is a category, it is better to come from body. We have to connect products to category in here. We want to know which products have to be connected to here. So we have to give new data to comValidate() which is productIds through body. In here we are going to send the productIds as a String. We have plan to separate every Id by a comma and it will be planned during the creation of the backend.
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

    // In here, this is the creation of the category.
    try {
      // First we have to migrate category. Then it will be suggested at here.
      const newCategory = await DB.category.create({
        // The thing which will be created one sent as newCategory.
        // data is necessarily have in here. userId necessarily has in here.
        data: {
          Name: data.Name, // Directly take the Name and put it.
          Products: {
            connect: `${data.productIds}`
              .split(",")
              .map((d) => ({ Id: Number(d) })), // productId is necessarily there. productIds are separated by commas.
          }, // In such situation this is the way how it is connected. // There it must connects products to this. So this means that ids in productIds String array are splitted by a comma. So the separator is the comma(,). We use map() method here as there is an arrary.
        },
      });
      // We can take the user's data also if we want. As we put the userId, it connect automatically.

      // Response of the Category creation
      return res.status(201).json({
        // 201 because this is a created one
        msg: "new category created",
        error: null,
        data: newCategory,
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

// update category
categoryRouter.put(
  "/update/:id", // We can update the UserId if we need. Because in here, there is a one to many connection.
  comPValidate("id"), // path parameter
  comValidate("Name", "productIds"), // The update must only be applied to the Name and other things must not be updated. User is not put in here. Because User is a thing used to connect. We do not need to put it in here specifically.
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
      const updateCategory = await DB.category.update({
        // data is necessarily have in here. userId necessarily has in here.
        data: {
          // UserId: Number(data.userId), UserId is not updated at here. // +data.userId :- By Adding + in here, we can convert this into number. Otherwise we can use parseInt here.
          Name: data.Name, // All updated data will be sent because select condition is not used in here.
          Products: {
            connect: `${data.productIds}`
              .split(",")
              .map((d) => ({ Id: Number(d) })), // productId is necessarily there. productIds are separated by commas. This means that it is going to connect productIds which are brought from there. Those products are splitted by commas. Because productIds are brought to here with putting commas for each productIds. Then the productIds are seperated by commas and then we get an array. We map the array because we need a return here. We need to return an array of Ids of products which are going to be connected. It is returned to Products(data). It is occured in map(). Id: Number(d) :- This is the way how Ids(Id) of products are taken. That is the story of Id. That id is converted to a number by Number() because Id array is an array of string productIds. So the productIds are taken by d parameter which is inside the Number().
          }, // In such situation this is the way how it is connected. // There it must connects products to this. So this means that ids in productIds String array are splitted by a comma. So the separator is the comma(,). We use map() method here as there is an arrary.
        },
        where: {
          // In this where condition :- In update, under where condition, field must be unique. Otherwise it is an error. Update is done using id.
          Id: Number(data.id),
        },
      });
      // We can take the user's data also if we want. As we put the userId, it connect automatically.

      // Response of the Category update
      return res.status(200).json({
        // All updated data will be sent.
        msg: "update category",
        error: null,
        data: updateCategory,
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
); // In the pathParamValidate we need id. We need Image through comValidate.

// We update the Image through query as UserId. We search through Id, then update the Image.

// delete category
// There it is able to give delete through userId.
categoryRouter.delete(
  "/delete/:id",
  comPValidate("id"), // id is taken through path param. If we need, we can search the category by the id and then we can update the category.
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

    // In here, this is the update of the category.
    try {
      // First we have to migrate category. Then it will be suggested at here.
      const deleteCategory = await DB.category.delete({
        // Delete the user through where condition.
        where: {
          Id: Number(data.id),
        },
        select: {
          Name: true, // Product name which has to be delete is given in here. There is no meaning in giving name of the user to delete a particular category.
        },
      });

      // Response of the category deletion
      return res.status(200).json({
        msg: "delete category",
        error: null,
        data: `${deleteCategory.Name}'s category deleted.`,
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
); // In the pathParamValidate we need userId. We need Image through comValidate.

export default categoryRouter;
