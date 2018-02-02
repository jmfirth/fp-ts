"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
/**
 * Lift a function of one argument to a function which accepts and returns values wrapped with the type constructor `F`
 * @function
 */
function lift(F) {
    return function (f) { return function (fa) { return F.map(fa, f); }; };
}
exports.lift = lift;
/**
 * Ignore the return value of a computation, using the specified return value instead (`<$`)
 * @function
 */
function voidRight(F) {
    return function (a, fb) { return F.map(fb, function_1.constant(a)); };
}
exports.voidRight = voidRight;
/**
 * A version of `voidRight` with its arguments flipped (`$>`)
 * @function
 */
function voidLeft(F) {
    return function (fa, b) { return F.map(fa, function_1.constant(b)); };
}
exports.voidLeft = voidLeft;
/**
 * Apply a value in a computational context to a value in no context. Generalizes `flip`
 * @function
 */
function flap(functor) {
    return function (a, ff) { return functor.map(ff, function (f) { return f(a); }); };
}
exports.flap = flap;
/** @function */
function getFunctorComposition(F, G) {
    return {
        map: function (fa, f) { return F.map(fa, function (ga) { return G.map(ga, f); }); }
    };
}
exports.getFunctorComposition = getFunctorComposition;
//# sourceMappingURL=Functor.js.map