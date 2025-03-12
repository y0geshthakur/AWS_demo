exports.handler = async (event) => {
    console.log("Received SNS event:", JSON.stringify(event, null, 2));
  
    event.Records.forEach((record) => {
        console.log("SNS Message:", record.Sns);
    });
  
    return {
      statusCode: 200,
        body: JSON.stringify("SNS message processed successfully")
    };
};  