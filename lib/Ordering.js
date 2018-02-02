"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @function */
exports.sign = function (n) {
    return n <= -1 ? -1 : n >= 1 ? 1 : 0;
};
/** @instance */
exports.setoidOrdering = {
    equals: function (x, y) { return x === y; }
};
/** @instance */
exports.semigroupOrdering = {
    concat: function (x, y) { return (x !== 0 ? x : y); }
};
/** @function */
exports.invert = function (O) {
    return (-1 * O);
};
//# sourceMappingURL=Ordering.js.map