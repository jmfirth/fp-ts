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
var Ordering_1 = require("./Ordering");
var Setoid_1 = require("./Setoid");
var function_1 = require("./function");
/** @function */
exports.toNativeComparator = function (compare) {
    return function (x, y) { return Ordering_1.sign(compare(x, y)); };
};
/** @function */
exports.unsafeCompare = function (x, y) {
    return x < y ? -1 : x > y ? 1 : 0;
};
/** @instance */
exports.ordString = __assign({}, Setoid_1.setoidString, { compare: exports.unsafeCompare });
/** @instance */
exports.ordNumber = __assign({}, Setoid_1.setoidNumber, { compare: exports.unsafeCompare });
/** @instance */
exports.ordBoolean = __assign({}, Setoid_1.setoidBoolean, { compare: exports.unsafeCompare });
/**
 * Test whether one value is _strictly less than_ another
 * @function
 */
exports.lessThan = function (ord) { return function (x) { return function (y) {
    return ord.compare(x, y) === -1;
}; }; };
/**
 * Test whether one value is _strictly greater than_ another
 * @function
 */
exports.greaterThan = function (ord) { return function (x) { return function (y) {
    return ord.compare(x, y) === 1;
}; }; };
/**
 * Test whether one value is _non-strictly less than_ another
 * @function
 */
exports.lessThanOrEq = function (ord) { return function (x) { return function (y) {
    return ord.compare(x, y) !== 1;
}; }; };
/**
 * Test whether one value is _non-strictly greater than_ another
 * @function
 */
exports.greaterThanOrEq = function (ord) { return function (x) { return function (y) {
    return ord.compare(x, y) !== -1;
}; }; };
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 * @function
 */
exports.min = function (ord) { return function (x, y) {
    return ord.compare(x, y) === 1 ? y : x;
}; };
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 * @function
 */
exports.max = function (ord) { return function (x, y) {
    return ord.compare(x, y) === -1 ? y : x;
}; };
/**
 * Clamp a value between a minimum and a maximum
 * @function
 */
exports.clamp = function (O) {
    var minO = exports.min(O);
    var maxO = exports.max(O);
    return function (low, hi) { return function (x) { return maxO(minO(x, hi), low); }; };
};
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 * @function
 */
exports.between = function (ord) { return function (low) { return function (hi) { return function (x) {
    return exports.lessThan(ord)(x)(low) || exports.greaterThan(ord)(x)(hi) ? false : true;
}; }; }; };
/** @function */
exports.fromCompare = function (compare) {
    return {
        equals: function (x, y) { return compare(x, y) === 0; },
        compare: compare
    };
};
/** @function */
exports.contramap = function (f, fa) {
    return exports.fromCompare(function_1.on(fa.compare)(f));
};
/** @function */
exports.getSemigroup = function () {
    return {
        concat: function (x, y) { return exports.fromCompare(function (a, b) { return Ordering_1.semigroupOrdering.concat(x.compare(a, b), y.compare(a, b)); }); }
    };
};
/** @function */
exports.getProductOrd = function (OA, OB) {
    var S = Setoid_1.getProductSetoid(OA, OB);
    return __assign({}, S, { compare: function (_a, _b) {
            var xa = _a[0], xb = _a[1];
            var ya = _b[0], yb = _b[1];
            var r = OA.compare(xa, ya);
            return r === 0 ? OB.compare(xb, yb) : r;
        } });
};
//# sourceMappingURL=Ord.js.map