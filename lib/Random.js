"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IO_1 = require("./IO");
// Adapted from https://github.com/purescript/purescript-random
/**
 * Returns a random number between 0 (inclusive) and 1 (exclusive). This is
 * a direct wrapper around JavaScript's `Math.random()`.
 */
exports.random = new IO_1.IO(function () { return Math.random(); });
/**
 * Takes a range specified by `low` (the first argument) and `high` (the
 * second), and returns a random integer uniformly distributed in the closed
 * interval `[low, high]`. It is unspecified what happens if `low > high`,
 * or if either of `low` or `high` is not an integer.
 * @function
 */
exports.randomInt = function (low, high) {
    return exports.random.map(function (n) { return Math.floor((high - low + 1) * n + low); });
};
/**
 * Returns a random number between a minimum value (inclusive) and a maximum
 * value (exclusive). It is unspecified what happens if `maximum < minimum`.
 * @function
 */
exports.randomRange = function (min, max) { return exports.random.map(function (n) { return (max - min + 1) * n + min; }); };
/** Returns a random boolean value with an equal chance of being `true` or `false` */
exports.randomBool = exports.random.map(function (n) { return n < 0.5; });
//# sourceMappingURL=Random.js.map