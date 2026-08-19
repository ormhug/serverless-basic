import { GetCommand, GetCommandInput } from "@aws-sdk/lib-dynamodb";
import { ddbDocClient } from "./libs/ddbDocClient";

export const getItem = async (params: GetCommandInput) => {
  try {
    const data = await ddbDocClient.send(new GetCommand(params));

    return {
      success: true,
      item: data.Item,
    };
  } catch (error: any) {
    console.log("Error", error.stack);

    return {
      success: false,
      error,
    };
  }
};
