import jwt from "jsonwebtoken";

export const handler = async (event: any) => {
  const { JWT_SECRET } = process.env;

  if (!JWT_SECRET) {
    return {
      isAuthorized: false,
    };
  }

  const authHeader =
    event.headers?.authorization ?? event.headers?.Authorization;

  console.log("AUTH EVENT:", JSON.stringify(event, null, 2));
  console.log("AUTH HEADER:", authHeader);

  if (!authHeader) {
    return {
      isAuthorized: false,
    };
  }

  const token = authHeader.replace(/^Bearer\s+/i, "");

  try {
    console.log("AUTH HEADER:", authHeader);

    const decoded = jwt.verify(token, JWT_SECRET);

    console.log("DECODED:", decoded);

    return {
      isAuthorized: true,
      context: {
        user: JSON.stringify(decoded),
      },
    };
  } catch (error) {
    console.log("JWT VERIFY ERROR:", error);

    return {
      isAuthorized: false,
    };
  }
};
