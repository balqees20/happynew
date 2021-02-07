"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function verify(req, res, nextFunction) {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader != 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        nextFunction();
    }
    else {
        res.sendStatus(403);
    }
}
exports.default = verify;
//# sourceMappingURL=verify.js.map