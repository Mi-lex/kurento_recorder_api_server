const path = require('path');

/**
 * @param {String} p
 * @return {String}
 */
function getExtension(p) {
    return path.extname(p).slice(1);
}

exports.getExtension = getExtension;
