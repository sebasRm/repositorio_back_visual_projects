"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseMessage = void 0;
function responseMessage(res, status, data, msg) {
    let jsonData = {
        msg: msg,
        data: data
    };
    return res.status(status).send(jsonData);
}
exports.responseMessage = responseMessage;
