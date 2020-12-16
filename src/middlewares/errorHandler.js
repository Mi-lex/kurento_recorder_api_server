const httpStatus = require('http-status');
const { ApiError } = require('../utils/errors/ApiError');
const { logger } = require('../config/logger');
const commonErrors = require('../const/errors/common.errors');
const { sendResponse } = require('../utils/http/sendResponse');

function processError(err) {
    if (!(err instanceof ApiError)) {
        return {
            errors: [commonErrors.service],
            status: httpStatus.INTERNAL_SERVER_ERROR,
        };
    }

    return err;
}

function getFilesFromReqWithoutBuffer(req) {
    if (!req.files) return null;

    return Object.keys(req.files).map((k) => {
        const file = req.files[k];
        return file.map((f) => ({
            ...f,
            buffer: undefined,
        }));
    });
}

function logError(err, req) {
    const files = getFilesFromReqWithoutBuffer(req);
    const body = typeof req.body === 'object' && { ...req.body };
    if (body) {
        delete body.password;
        delete body.confirmPassword;
    }
    const user = req.user && req.user.tokenPayload;
    const reqData = {
        url: req.originalUrl,
        method: req.method,
        query: req.query,
        params: req.params,
        cookies: req.cookies,
        headers: req.headers,
        body,
        user,
        files,
    };
    const message = `\t*1.Stack*:\n\t${err.stack}`
        + `\n\t*2.Req data*:\n${JSON.stringify(reqData, null, '   ')}`
        + `\n\t*3.Message*:\n\t${err.message}\n`;
    logger.error(message);
}

// eslint-disable-next-line no-unused-vars
async function handler(err, req, res, next) {
    const error = processError(err);

    const isInternal = error.status === httpStatus.INTERNAL_SERVER_ERROR;
    if (isInternal) {
        logError(err, req);
    }
    await sendResponse(res, error.status, { errors: error.errors });
}

function notFound(req, res, next) {
    const err = new ApiError(httpStatus.NOT_FOUND, commonErrors.notFound);
    return handler(err, req, res, next);
}

exports.notFound = notFound;
exports.handler = handler;
