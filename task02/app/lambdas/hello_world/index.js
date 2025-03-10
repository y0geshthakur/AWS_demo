exports.handler = async (event) => {
    // TODO implement
    if(httpMethod === 'GET' && path === './hello'){
        return{
            statusCode: 200,
            "message": "Hello from Lambda"
        };
    }
    return{
        statusCode: 400,
        "error": "Bad Request",
        "message": `Endpoint ${path} with method ${httpMethod} is not configured`
    };
};