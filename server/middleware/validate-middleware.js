const validate = (schema) => async (req, res, next) => {
    try {
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    } catch (error) {
        const status = 422;
        const message = 'Fill the input fields correctly';
        const extraDetails = error.errors?.[0]?.message || "Invalid request data";
        // Convert Zod errors to object with field names as keys
        const errors = error.errors.reduce((acc, curr) => {
            const field = curr.path[0];
            acc[field] = curr.message;
            return acc;
        }, {});
        const err = {
            status,
            message,
            extraDetails: errors
        };
        
        next(err);  // Pass the full error object instead of just the message
    }
};

module.exports = validate;
