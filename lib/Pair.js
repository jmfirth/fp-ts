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
var Apply_1 = require("./Apply");
exports.URI = 'Pair';
/**
 * @data
 * @constructor Pair
 */
var Pair = /** @class */ (function () {
    function Pair(fst, snd) {
        this.fst = fst;
        this.snd = snd;
    }
    /** Map a function over the first field of a pair */
    Pair.prototype.first = function (f) {
        return new Pair(f(this.fst), this.snd);
    };
    /** Map a function over the second field of a pair */
    Pair.prototype.second = function (f) {
        return new Pair(this.fst, f(this.snd));
    };
    /** Swaps the elements in a pair */
    Pair.prototype.swap = function () {
        return new Pair(this.snd, this.fst);
    };
    Pair.prototype.map = function (f) {
        return new Pair(f(this.fst), f(this.snd));
    };
    Pair.prototype.ap = function (fab) {
        return new Pair(fab.fst(this.fst), fab.snd(this.snd));
    };
    Pair.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    Pair.prototype.reduce = function (b, f) {
        return f(f(b, this.fst), this.snd);
    };
    Pair.prototype.extract = function () {
        return this.fst;
    };
    Pair.prototype.extend = function (f) {
        return new Pair(f(this), f(this.swap()));
    };
    return Pair;
}());
exports.Pair = Pair;
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new Pair(a, a);
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var reduce = function (fa, b, f) {
    return fa.reduce(b, f);
};
var extract = function (fa) {
    return fa.extract();
};
var extend = function (fa, f) {
    return fa.extend(f);
};
/** @function */
exports.getSetoid = function (S) {
    return {
        equals: function (x, y) { return S.equals(x.fst, y.fst) && S.equals(x.snd, y.snd); }
    };
};
/** @function */
exports.getOrd = function (O) {
    return __assign({}, exports.getSetoid(O), { compare: function (x, y) { return Ordering_1.semigroupOrdering.concat(O.compare(x.fst, y.fst), O.compare(x.snd, y.snd)); } });
};
/** @function */
exports.getSemigroup = function (S) {
    return {
        concat: function (x, y) { return new Pair(S.concat(x.fst, y.fst), S.concat(x.snd, y.snd)); }
    };
};
/** @function */
exports.getMonoid = function (M) {
    return __assign({}, exports.getSemigroup(M), { empty: new Pair(M.empty, M.empty) });
};
function traverse(F) {
    return function (ta, f) {
        return Apply_1.liftA2(F)(function (b1) { return function (b2) { return new Pair(b1, b2); }; })(f(ta.fst))(f(ta.snd));
    };
}
/** @instance */
exports.pair = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    reduce: reduce,
    traverse: traverse,
    extend: extend,
    extract: extract
};
//# sourceMappingURL=Pair.js.map