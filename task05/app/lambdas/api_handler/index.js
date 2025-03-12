const { DynamoDBClient, PutItemCommand } = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require("uuid");

const client = new DynamoDBClient();

const convertContentToDynamoMap = (content) => {
  const map = {};
  for (const key in content) {
    if (content.hasOwnProperty(key)) {
      map[key] = { S: content[key].toString() };
    }
  }
  return map;
};

exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);
    const { principalId, content } = requestBody;

    // Validate required fields
    if (typeof principalId === 'undefined' || !content) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Missing required fields" })
      };
    }

    // Generate event data
    const eventId = uuidv4();
    const createdAt = new Date().toISOString();

    // Prepare DynamoDB put parameters
    const params = {
      TableName: process.env.TARGET_TABLE,
      Item: {
        id: { S: eventId },
        principalId: { N: principalId.toString() },
        createdAt: { S: createdAt },
        body: { M: convertContentToDynamoMap(content) }
      }
    };

    // Save to DynamoDB
    await client.send(new PutItemCommand(params));

    // Prepare response
    const responseBody = {
      statusCode: 201,
      event: {
        id: eventId,
        principalId: principalId,
        createdAt: createdAt,
        body: content
      }
    };

    return {
      statusCode: 201,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(responseBody)
    };

  } catch (error) {
    console.error("Error processing request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error", error: error.message })
    };
  }
};