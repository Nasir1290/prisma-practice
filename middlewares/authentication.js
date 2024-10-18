import jwt from "jsonwebtoken";
import prisma from "../prisma/index.js";
import excludeFields from "../utils/excludeFields.js";

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.header("authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({
        stausCode: 401,
        success: false,
        message: "Unauthorized request",
        data: {},
      });
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    const user = prisma.user.findUnique({
      where: {
        id: decodedToken.id,
      },
      select: excludeFields(prisma.user, ["password"]),
    });

    if (!user) {
      throw new Error("AccessToken Expired or invalid");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new Error(error.message || "something went wrong");
  }
};

export default authentication;
