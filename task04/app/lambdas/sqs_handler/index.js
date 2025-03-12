exports.handler = async (event) => {
    console.log("Received SQS event:", JSON.stringify(event, null, 2));
  
    event.Records.forEach((record) => {
        console.log("SQS Message Body:", record.body);
    });
  
    return {
        statusCode: 200,
        body: JSON.stringify("SQS message processed successfully")
    };
};