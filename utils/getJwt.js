import jwt from "jsonwebtoken";

const getJwtToken = (userId) => {
  if (!userId) null;

  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "100y",
  });
  return token;
};

export default getJwtToken;
