const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';
    const extraDetails = err.extraDetails || "Error from Backend";
    
    return res.status(status).json({
        success: false,
        error: message,
        details: extraDetails
      });
}

module.exports = errorMiddleware;