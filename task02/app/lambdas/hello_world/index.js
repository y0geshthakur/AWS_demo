exports.handler = async (event) => {
    // Check if the path is /hello
    if (event.rawPath === "/hello") {
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          statusCode: 200,
          message: "Hello from Lambda",
        }),
      };
    }
   
    // Return 400 for any other path
    return {
      statusCode: 400,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        statusCode: 400,
        message: `Bad request syntax or unsupported method. Request path: ${event.rawPath}. HTTP method: ${event.requestContext.http.method}`,
      }),
    };
  };