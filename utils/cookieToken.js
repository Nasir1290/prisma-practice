import getJwtToken from "./getJWT.js";

const createCookieToken = (user, res) => {
  const token = getJwtToken(user.id);
  const options = {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  };
  res.status(200).cookie("token", token, options).json({
    success: true,
    message: "Successfully logged In.",
    token,
    user,
  });
};

export { createCookieToken };
