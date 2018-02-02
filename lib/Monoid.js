"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Semigroup_1 = require("./Semigroup");
var function_1 = require("./function");
/** @function */
exports.fold = function (M) { return function (as) {
    return Semigroup_1.fold(M)(M.empty)(as);
}; };
/** @function */
exports.getProductMonoid = function (MA, MB) {
    return __assign({}, Semigroup_1.getProductSemigroup(MA, MB), { empty: [MA.empty, MB.empty] });
};
/** @function */
exports.getDualMonoid = function (M) {
    return __assign({}, Semigroup_1.getDualSemigroup(M), { empty: M.empty });
};
/**
 * Boolean monoid under conjunction
 * @instance
 */
exports.monoidAll = __assign({}, Semigroup_1.semigroupAll, { empty: true });
/**
 * Boolean monoid under disjunction
 * @instance
 */
exports.monoidAny = __assign({}, Semigroup_1.semigroupAny, { empty: false });
/** @instance */
exports.unsafeMonoidArray = __assign({}, Semigroup_1.getArraySemigroup(), { empty: [] });
/**
 * Monoid under array concatenation (`Array<any>`)
 * @instance
 */
exports.getArrayMonoid = function () {
    return exports.unsafeMonoidArray;
};
/**
 * Number monoid under addition
 * @instance
 */
exports.monoidSum = __assign({}, Semigroup_1.semigroupSum, { empty: 0 });
/**
 * Number monoid under multiplication
 * @instance
 */
exports.monoidProduct = __assign({}, Semigroup_1.semigroupProduct, { empty: 1 });
/** @instance */
exports.monoidString = __assign({}, Semigroup_1.semigroupString, { empty: '' });
/** @function */
exports.getFunctionMonoid = function (monoid) { return function () {
    return {
        concat: function (f, g) { return function (a) { return monoid.concat(f(a), g(a)); }; },
        empty: function_1.constant(monoid.empty)
    };
}; };
/** @function */
exports.getEndomorphismMonoid = function () {
    return {
        concat: function (x, y) { return function_1.compose(x, y); },
        empty: function_1.identity
    };
};
/** @function */
exports.getRecordMonoid = function (monoids) {
    var empty = {};
    for (var k in monoids) {
        empty[k] = monoids[k].empty;
    }
    return __assign({}, Semigroup_1.getRecordSemigroup(monoids), { empty: empty });
};
//# sourceMappingURL=Monoid.js.map