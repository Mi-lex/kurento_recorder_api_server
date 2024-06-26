exports.wrapAsyncMiddleware = function wrapAsyncMiddleware(middleware) {
    return (req, res, next) => {
        middleware(req, res, next)
            .catch(next);
    };
};
