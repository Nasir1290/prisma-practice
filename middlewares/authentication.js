import jwt from "jsonwebtoken";
import prisma from "../prisma/index.js";

const authentication = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("authorization")?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Unauthorized request",
        data: {},
      });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedToken.userId) {
      return res.status(401).json({
        statusCode: 401,
        success: false,
        message: "Invalid token",
        data: {},
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: decodedToken?.userId,
      },
      // select: excludeFields(prisma.user, ["password"]),
    });

    if (!user) {
      throw new Error("AccessToken expired or invalid");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      message: error.message || "Something went wrong",
      data: {},
    });
    console.log({ error });
  }
};

export default authentication;
