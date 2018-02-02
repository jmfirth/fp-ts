"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IO_1 = require("./IO");
// Adapted from https://github.com/purescript/purescript-console
/** @function */
exports.log = function (s) {
    return new IO_1.IO(function () { return console.log(s); });
};
/** @function */
exports.warn = function (s) {
    return new IO_1.IO(function () { return console.warn(s); });
};
/** @function */
exports.error = function (s) {
    return new IO_1.IO(function () { return console.error(s); });
};
/** @function */
exports.info = function (s) {
    return new IO_1.IO(function () { return console.info(s); });
};
//# sourceMappingURL=Console.js.map