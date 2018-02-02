"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Adapted from https://github.com/garyb/purescript-debug
/**
 * Log any value to the console for debugging purposes and then
 * return a value. This will log the value's underlying representation for
 * low-level debugging
 * @function
 */
exports.trace = function (message, out) {
    console.log(message);
    return out();
};
/**
 * Log any value and return it
 * @function
 */
exports.spy = function (a) {
    return exports.trace(a, function () { return a; });
};
/**
 * Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`
 * @function
 */
function traceA(F) {
    return function (x) { return exports.trace(x, function () { return F.of(undefined); }); };
}
exports.traceA = traceA;
/**
 * Log any value to the console and return it in `Monad` useful when one has monadic chains
 * @function
 */
function traceM(F) {
    return function (a) { return exports.trace(a, function () { return F.of(a); }); };
}
exports.traceM = traceM;
//# sourceMappingURL=Trace.js.map