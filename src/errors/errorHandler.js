export const errorHandle = (error, req, res, next) => {
    const status = error.status;
    const message = error.message;

    res.status(status).json({status: "Unespected error", error: message});
};