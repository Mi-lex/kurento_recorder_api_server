exports.sendResponse = async function sendResponse(res, status, { result = {}, errors = [] } = {}) {
    const response = {
        success: result,
        errors,
    };

    res.status(status).json(response);
};
