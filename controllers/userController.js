import prisma from "../prisma/index.js";
import { createCookieToken } from "../utils/cookieToken.js";

const signUpUser = async (req, res) => {
  try {
    // take all the information from the request
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const isExisUser = await prisma.user.findFirst({
      where: { email },
    });
    if (isExisUser) {
      throw new Error("Email already exists");
    }
    // create user
    const user = await prisma.user.create({ data: { name, email, password } });
    if (!user) {
      throw new Error("Failed to create user");
    }
    // create token by user information
    createCookieToken(user, res);
    // catch the error
  } catch (error) {
    res.status(404).json({
      success: false,
      data: {},
      message: error.message || "something went wrong",
    });
    console.log(error);
  }
};

const logInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required");
    }
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      throw new Error("User not found with this email");
    }
    if (user.password !== password) {
      throw new Error("Incorrect password");
    }
    createCookieToken(user, res);
  } catch (error) {
    res.status(400).json({
      success: false,
      data: {},
      message: error.message || "something went wrong",
    });
    console.log(error);
  }
};

const logOutUser = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).clearCookie("token").json({
      successToken: 200,
      success: true,
      message: "Successfully logged out.",
      data: {},
    });
  } catch (error) {
    res.status(400).json({
      statusCode: 400,
      success: false,
      data: {},
      message: error.message || "something went wrong",
    });
  }
};

export { signUpUser, logInUser, logOutUser };


