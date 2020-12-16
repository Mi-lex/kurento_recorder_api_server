exports.ApiError = class ApiError extends Error {
    constructor(status, ...errors) {
        super();
        this.status = status;
        this.errors = errors;
    }
};
