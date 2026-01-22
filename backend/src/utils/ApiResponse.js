class ApiResponse{
    constructor(
        statusCode,
        data = [],
        message = "Success",
        success = null
    ){
        this.statusCode = statusCode 
        this.data = data
        this.message = message
        this.success = success | statusCode < 400
    }
}

export default ApiResponse