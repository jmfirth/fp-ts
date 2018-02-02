"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
/**
 * Combine two effectful actions, keeping only the result of the first
 * @function
 */
function applyFirst(F) {
    return function (fa, fb) { return F.ap(F.map(fa, function (a) { return function_1.constant(a); }), fb); };
}
exports.applyFirst = applyFirst;
/**
 * Combine two effectful actions, keeping only the result of the second
 * @function
 */
function applySecond(F) {
    return function (fa, fb) { return F.ap(F.map(fa, function () { return function (b) { return b; }; }), fb); };
}
exports.applySecond = applySecond;
/**
 * Lift a function of two arguments to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
function liftA2(F) {
    return function (f) { return function (fa) { return function (fb) { return F.ap(F.map(fa, f), fb); }; }; };
}
exports.liftA2 = liftA2;
/**
 * Lift a function of three arguments to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
function liftA3(F) {
    return function (f) { return function (fa) { return function (fb) { return function (fc) { return F.ap(F.ap(F.map(fa, f), fb), fc); }; }; }; };
}
exports.liftA3 = liftA3;
/**
 * Lift a function of four arguments to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
function liftA4(F) {
    return function (f) { return function (fa) { return function (fb) { return function (fc) { return function (fd) { return F.ap(F.ap(F.ap(F.map(fa, f), fb), fc), fd); }; }; }; }; };
}
exports.liftA4 = liftA4;
//# sourceMappingURL=Apply.js.map