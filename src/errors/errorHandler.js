import logger from "../utils/logger.js";

export const errorHandle = (error, req, res, next) => {
    const status = error.status || 500;
    const message = status === 500 ? "Internal server error" : error.message;

    res.status(status).json({status: "error", error: message});
};