"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Array_1 = require("./Array");
var Option_1 = require("./Option");
var function_1 = require("./function");
exports.URI = 'NonEmptyArray';
/**
 * @data
 * @constructor NonEmptyArray
 */
var NonEmptyArray = /** @class */ (function () {
    function NonEmptyArray(head, tail) {
        this.head = head;
        this.tail = tail;
    }
    NonEmptyArray.prototype.toArray = function () {
        return function_1.concat([this.head], this.tail);
    };
    NonEmptyArray.prototype.concatArray = function (as) {
        return new NonEmptyArray(this.head, function_1.concat(this.tail, as));
    };
    NonEmptyArray.prototype.map = function (f) {
        return new NonEmptyArray(f(this.head), this.tail.map(f));
    };
    NonEmptyArray.prototype.ap = function (fab) {
        var _this = this;
        return fab.chain(function (f) { return _this.map(f); }); // <= derived
    };
    NonEmptyArray.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    NonEmptyArray.prototype.chain = function (f) {
        return f(this.head).concatArray(Array_1.array.chain(this.tail, function (a) { return f(a).toArray(); }));
    };
    NonEmptyArray.prototype.concat = function (y) {
        return this.concatArray(y.toArray());
    };
    NonEmptyArray.prototype.reduce = function (b, f) {
        return Array_1.array.reduce(this.toArray(), b, f);
    };
    NonEmptyArray.prototype.extend = function (f) {
        return unsafeFromArray(Array_1.array.extend(this.toArray(), function (as) { return f(unsafeFromArray(as)); }));
    };
    NonEmptyArray.prototype.extract = function () {
        return this.head;
    };
    NonEmptyArray.prototype.inspect = function () {
        return this.toString();
    };
    NonEmptyArray.prototype.toString = function () {
        return "new NonEmptyArray(" + function_1.toString(this.head) + ", " + function_1.toString(this.tail) + ")";
    };
    return NonEmptyArray;
}());
exports.NonEmptyArray = NonEmptyArray;
var unsafeFromArray = function (as) {
    return new NonEmptyArray(as[0], as.slice(1));
};
/** @function */
exports.fromArray = function (as) {
    return as.length ? Option_1.some(unsafeFromArray(as)) : Option_1.none;
};
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new NonEmptyArray(a, []);
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var chain = function (fa, f) {
    return fa.chain(f);
};
var concat = function (fx, fy) {
    return fx.concat(fy);
};
/** @function */
exports.getSemigroup = function () {
    return { concat: concat };
};
var reduce = function (fa, b, f) {
    return fa.reduce(b, f);
};
var extend = function (fa, f) {
    return fa.extend(f);
};
var extract = function (fa) {
    return fa.extract();
};
function traverse(F) {
    return function (ta, f) { return F.map(Array_1.array.traverse(F)(ta.toArray(), f), unsafeFromArray); };
}
/** @instance */
exports.nonEmptyArray = {
    URI: exports.URI,
    extend: extend,
    extract: extract,
    map: map,
    of: of,
    ap: ap,
    chain: chain,
    reduce: reduce,
    traverse: traverse
};
//# sourceMappingURL=NonEmptyArray.js.map