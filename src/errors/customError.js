export class CustomError {
    notFoundError(message =  'Not Found') {
        const error = new Error(message);
        error.status = 404;
        return error; 
    };

    badRequestError(message =  'Bad request') {
        const error = new Error(message);
        error.status = 400;
        return error; 
    };
    

    unauthorizedError(message = 'Unauthorized') {
        const error = new Error(message);
        error.status = 401;
        return error; 
    }

    internalServerError(message = 'Internal server error') {
        const error = new Error(message);
        error.status = 500;
        return error; 
    }
};

export const customError = new CustomError();