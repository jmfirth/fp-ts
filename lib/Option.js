"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Monoid_1 = require("./Monoid");
var function_1 = require("./function");
exports.URI = 'Option';
var None = /** @class */ (function () {
    function None() {
        this._tag = 'None';
    }
    /**
     * Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors.
     * If it maps on `Some` then it will apply the
     * `f` on `Some`'s value, if it maps on `None` it will return `None`.
     */
    None.prototype.map = function (f) {
        return exports.none;
    };
    /** Maps `f` over this Option's value. If the value returned from `f` is null or undefined, returns `None` */
    None.prototype.mapNullable = function (f) {
        return exports.none;
    };
    None.prototype.ap = function (fab) {
        return exports.none;
    };
    None.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    /**
     * Returns the result of applying f to this `Option`'s value if this `Option` is nonempty.
     * Returns `None` if this `Option` is empty. Slightly different from `map` in that `f` is expected to return an
     * `Option` (which could be `None`)
     */
    None.prototype.chain = function (f) {
        return exports.none;
    };
    None.prototype.reduce = function (b, f) {
        return b;
    };
    None.prototype.alt = function (fa) {
        return fa;
    };
    None.prototype.extend = function (f) {
        return exports.none;
    };
    /** Applies a function to each case in the data structure */
    None.prototype.fold = function (b, some) {
        return b;
    };
    /** Lazy verion of `fold` */
    None.prototype.foldL = function (none, some) {
        return none();
    };
    /** Returns the value from this `Some` or the given argument if this is a `None` */
    None.prototype.getOrElse = function (a) {
        return a;
    };
    /** Lazy version of `getOrElse` */
    None.prototype.getOrElseL = function (f) {
        return f();
    };
    /** Returns the value from this `Some` or `null` if this is a `None` */
    None.prototype.toNullable = function () {
        return null;
    };
    /** Returns the value from this `Some` or `undefined` if this is a `None` */
    None.prototype.toUndefined = function () {
        return undefined;
    };
    None.prototype.inspect = function () {
        return this.toString();
    };
    None.prototype.toString = function () {
        return 'none';
    };
    /** Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise */
    None.prototype.contains = function (S, a) {
        return false;
    };
    /** Returns `true` if the option is `None`, `false` otherwise */
    None.prototype.isNone = function () {
        return true;
    };
    /** Returns `true` if the option is an instance of `Some`, `false` otherwise */
    None.prototype.isSome = function () {
        return false;
    };
    /** Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value */
    None.prototype.exists = function (p) {
        return false;
    };
    /** Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value. Otherwise returns `None` */
    None.prototype.filter = function (p) {
        return exports.none;
    };
    None.value = new None();
    return None;
}());
exports.None = None;
exports.none = None.value;
var Some = /** @class */ (function () {
    function Some(value) {
        this.value = value;
        this._tag = 'Some';
    }
    Some.prototype.map = function (f) {
        return new Some(f(this.value));
    };
    Some.prototype.mapNullable = function (f) {
        return exports.fromNullable(f(this.value));
    };
    Some.prototype.ap = function (fab) {
        var _this = this;
        return fab.map(function (f) { return f(_this.value); });
    };
    Some.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    Some.prototype.chain = function (f) {
        return f(this.value);
    };
    Some.prototype.reduce = function (b, f) {
        return this.fold(b, function (a) { return f(b, a); });
    };
    Some.prototype.alt = function (fa) {
        return this;
    };
    Some.prototype.extend = function (f) {
        return new Some(f(this));
    };
    Some.prototype.fold = function (b, some) {
        return some(this.value);
    };
    Some.prototype.foldL = function (none, some) {
        return some(this.value);
    };
    Some.prototype.getOrElse = function (a) {
        return this.value;
    };
    Some.prototype.getOrElseL = function (f) {
        return this.value;
    };
    Some.prototype.toNullable = function () {
        return this.value;
    };
    Some.prototype.toUndefined = function () {
        return this.value;
    };
    Some.prototype.inspect = function () {
        return this.toString();
    };
    Some.prototype.toString = function () {
        return "some(" + function_1.toString(this.value) + ")";
    };
    Some.prototype.contains = function (S, a) {
        return S.equals(this.value, a);
    };
    Some.prototype.isNone = function () {
        return false;
    };
    Some.prototype.isSome = function () {
        return true;
    };
    Some.prototype.exists = function (p) {
        return p(this.value);
    };
    Some.prototype.filter = function (p) {
        return this.exists(p) ? this : exports.none;
    };
    return Some;
}());
exports.Some = Some;
/** @function */
exports.getSetoid = function (S) {
    return {
        equals: function (x, y) { return x.fold(y.isNone(), function (ax) { return y.fold(false, function (ay) { return S.equals(ax, ay); }); }); }
    };
};
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new Some(a);
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var chain = function (fa, f) {
    return fa.chain(f);
};
var reduce = function (fa, b, f) {
    return fa.reduce(b, f);
};
var alt = function (fx, fy) {
    return fx.alt(fy);
};
var extend = function (ea, f) {
    return ea.extend(f);
};
var zero = function () {
    return exports.none;
};
/**
 * Option monoid returning the left-most non-None value
 * @function
 */
exports.getFirstMonoid = function () {
    return {
        concat: alt,
        empty: exports.none
    };
};
/**
 * Option monoid returning the right-most non-None value
 * @function
 */
exports.getLastMonoid = function () {
    return Monoid_1.getDualMonoid(exports.getFirstMonoid());
};
/** @function */
exports.getMonoid = function (S) {
    return {
        concat: function (x, y) { return x.fold(y, function (ax) { return y.fold(x, function (ay) { return exports.some(S.concat(ax, ay)); }); }); },
        empty: exports.none
    };
};
/**
 * Constructs a new `Option` from a nullable type.
 * If the value is `null` or `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`
 * @function
 */
exports.fromNullable = function (a) {
    return a == null ? exports.none : new Some(a);
};
/**
 * @function
 * @alias of
 */
exports.some = of;
/** @function */
exports.fromPredicate = function (predicate) { return function (a) {
    return predicate(a) ? exports.some(a) : exports.none;
}; };
function traverse(F) {
    return function (ta, f) { return ta.foldL(function () { return F.of(exports.none); }, function (a) { return F.map(f(a), exports.some); }); };
}
/** @function */
exports.tryCatch = function (f) {
    try {
        return exports.some(f());
    }
    catch (e) {
        return exports.none;
    }
};
/** @function */
exports.fromEither = function (fa) {
    return fa.fold(function () { return exports.none; }, exports.some);
};
/** @instance */
exports.option = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain,
    reduce: reduce,
    traverse: traverse,
    zero: zero,
    alt: alt,
    extend: extend
};
//# sourceMappingURL=Option.js.map