"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ord_1 = require("./Ord");
var function_1 = require("./function");
/** @function */
exports.fold = function (S) { return function (a) { return function (as) {
    return as.reduce(function (acc, a) { return S.concat(acc, a); }, a);
}; }; };
/** @function */
exports.getFirstSemigroup = function () {
    return { concat: function (x) { return x; } };
};
/** @function */
exports.getLastSemigroup = function () {
    return { concat: function (_, y) { return y; } };
};
/** @function */
exports.getProductSemigroup = function (SA, SB) {
    return {
        concat: function (_a, _b) {
            var xa = _a[0], xb = _a[1];
            var ya = _b[0], yb = _b[1];
            return [SA.concat(xa, ya), SB.concat(xb, yb)];
        }
    };
};
/** @function */
exports.getDualSemigroup = function (S) {
    return {
        concat: function (x, y) { return S.concat(y, x); }
    };
};
/** @function */
exports.getRecordSemigroup = function (semigroups) {
    return {
        concat: function (x, y) {
            var r = {};
            for (var k in semigroups) {
                r[k] = semigroups[k].concat(x[k], y[k]);
            }
            return r;
        }
    };
};
/** @function */
exports.getMeetSemigroup = function (O) {
    return {
        concat: Ord_1.min(O)
    };
};
/** @function */
exports.getJoinSemigroup = function (O) {
    return {
        concat: Ord_1.max(O)
    };
};
/**
 * Boolean semigroup under conjunction
 * @instance
 */
exports.semigroupAll = {
    concat: function (x, y) { return x && y; }
};
/**
 * Boolean semigroup under disjunction
 * @instance
 */
exports.semigroupAny = {
    concat: function (x, y) { return x || y; }
};
/**
 * Semigroup under array concatenation
 * @function
 */
exports.getArraySemigroup = function () {
    return {
        concat: function (x, y) { return function_1.concat(x, y); }
    };
};
/**
 * Number Semigroup under addition
 * @instance
 */
exports.semigroupSum = {
    concat: function (x, y) { return x + y; }
};
/**
 * Number Semigroup under multiplication
 * @instance
 */
exports.semigroupProduct = {
    concat: function (x, y) { return x * y; }
};
/** @instance */
exports.semigroupString = {
    concat: function (x, y) { return x + y; }
};
//# sourceMappingURL=Semigroup.js.map