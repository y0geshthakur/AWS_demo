exports.handler = async (event) => {
    console.log("Received SQS event:", JSON.stringify(event, null, 2));
  
    // Iterate through each record and log the message body.
    event.Records.forEach((record) => {
      console.log("SQS Message Body:", record.body);
    });
  
    return {
      statusCode: 200,
      body: JSON.stringify("SQS message processed successfully")
    };
  };
  