import { APIGatewayEvent } from "aws-lambda";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { getItem } from "../../aws/dynamodb/getItem";
import { returnData } from "../../utils/returnData";

export const handler = async (event: APIGatewayEvent) => {
  if (!event.body) {
    return returnData(400, "No body!");
  }

  const { TABLE_NAME_AUTH, JWT_SECRET } = process.env;

  if (!TABLE_NAME_AUTH || !JWT_SECRET) {
    return returnData(500, "Internal server error");
  }

  const { email, password } = JSON.parse(event.body);

  if (!email || !password) {
    return returnData(400, "Email and password are required");
  }

  const response = await getItem({
    TableName: TABLE_NAME_AUTH,
    Key: {
      email,
    },
  });

  if (!response.success || !response.item) {
    return returnData(401, "Invalid email or password");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    response.item.passwordHash,
  );

  if (!passwordMatches) {
    return returnData(401, "Invalid email or password");
  }

  const token = jwt.sign(
    {
      sub: response.item.userId,
      email: response.item.email,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );

  return returnData(200, "Login successful", {
    token,
  });
};
