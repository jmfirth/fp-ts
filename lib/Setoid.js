"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @function */
exports.strictEqual = function (a, b) {
    return a === b;
};
/** @instance */
exports.setoidString = { equals: exports.strictEqual };
/** @instance */
exports.setoidNumber = { equals: exports.strictEqual };
/** @instance */
exports.setoidBoolean = { equals: exports.strictEqual };
/** @function */
exports.getArraySetoid = function (S) {
    return {
        equals: function (xs, ys) { return xs.length === ys.length && xs.every(function (x, i) { return S.equals(x, ys[i]); }); }
    };
};
/** @function */
exports.getRecordSetoid = function (setoids) {
    return {
        equals: function (x, y) {
            for (var k in setoids) {
                if (!setoids[k].equals(x[k], y[k])) {
                    return false;
                }
            }
            return true;
        }
    };
};
/** @function */
exports.getProductSetoid = function (SA, SB) {
    return {
        equals: function (_a, _b) {
            var xa = _a[0], xb = _a[1];
            var ya = _b[0], yb = _b[1];
            return SA.equals(xa, ya) && SB.equals(xb, yb);
        }
    };
};
//# sourceMappingURL=Setoid.js.map