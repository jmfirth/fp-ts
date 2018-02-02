"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChainRec_1 = require("./ChainRec");
var function_1 = require("./function");
exports.URI = 'Either';
var Left = /** @class */ (function () {
    function Left(value) {
        this.value = value;
        this._tag = 'Left';
    }
    /** The given function is applied if this is a `Right` */
    Left.prototype.map = function (f) {
        return this;
    };
    Left.prototype.ap = function (fab) {
        return (fab.isLeft() ? fab : this);
    };
    Left.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    /** Binds the given function across `Right` */
    Left.prototype.chain = function (f) {
        return this;
    };
    Left.prototype.bimap = function (f, g) {
        return new Left(f(this.value));
    };
    Left.prototype.alt = function (fy) {
        return fy;
    };
    Left.prototype.extend = function (f) {
        return this;
    };
    Left.prototype.reduce = function (b, f) {
        return b;
    };
    /** Applies a function to each case in the data structure */
    Left.prototype.fold = function (left, right) {
        return left(this.value);
    };
    /** Returns the value from this `Right` or the given argument if this is a `Left` */
    Left.prototype.getOrElse = function (a) {
        return a;
    };
    /** Returns the value from this `Right` or the result of given argument if this is a `Left` */
    Left.prototype.getOrElseL = function (f) {
        return f(this.value);
    };
    /** Maps the left side of the disjunction */
    Left.prototype.mapLeft = function (f) {
        return exports.left(f(this.value));
    };
    Left.prototype.inspect = function () {
        return this.toString();
    };
    Left.prototype.toString = function () {
        return "left(" + function_1.toString(this.value) + ")";
    };
    /** Returns `true` if the either is an instance of `Left`, `false` otherwise */
    Left.prototype.isLeft = function () {
        return true;
    };
    /** Returns `true` if the either is an instance of `Right`, `false` otherwise */
    Left.prototype.isRight = function () {
        return false;
    };
    /** Swaps the disjunction values */
    Left.prototype.swap = function () {
        return exports.right(this.value);
    };
    return Left;
}());
exports.Left = Left;
var Right = /** @class */ (function () {
    function Right(value) {
        this.value = value;
        this._tag = 'Right';
    }
    Right.prototype.map = function (f) {
        return new Right(f(this.value));
    };
    Right.prototype.ap = function (fab) {
        if (fab.isRight()) {
            return this.map(fab.value);
        }
        return fab;
    };
    Right.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    Right.prototype.chain = function (f) {
        return f(this.value);
    };
    Right.prototype.bimap = function (f, g) {
        return new Right(g(this.value));
    };
    Right.prototype.alt = function (fy) {
        return this;
    };
    Right.prototype.extend = function (f) {
        return new Right(f(this));
    };
    Right.prototype.reduce = function (b, f) {
        return f(b, this.value);
    };
    Right.prototype.fold = function (left, right) {
        return right(this.value);
    };
    Right.prototype.getOrElse = function (a) {
        return this.value;
    };
    Right.prototype.getOrElseL = function (f) {
        return this.value;
    };
    Right.prototype.mapLeft = function (f) {
        return this;
    };
    Right.prototype.inspect = function () {
        return this.toString();
    };
    Right.prototype.toString = function () {
        return "right(" + function_1.toString(this.value) + ")";
    };
    Right.prototype.isLeft = function () {
        return false;
    };
    Right.prototype.isRight = function () {
        return true;
    };
    Right.prototype.swap = function () {
        return exports.left(this.value);
    };
    return Right;
}());
exports.Right = Right;
/** @function */
exports.getSetoid = function (SL, SA) {
    return {
        equals: function (x, y) {
            return x.fold(function (lx) { return y.fold(function (ly) { return SL.equals(lx, ly); }, function_1.constFalse); }, function (ax) { return y.fold(function_1.constFalse, function (ay) { return SA.equals(ax, ay); }); });
        }
    };
};
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new Right(a);
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var chain = function (fa, f) {
    return fa.chain(f);
};
var bimap = function (fla, f, g) {
    return fla.bimap(f, g);
};
var alt = function (fx, fy) {
    return fx.alt(fy);
};
var extend = function (ea, f) {
    return ea.extend(f);
};
var reduce = function (fa, b, f) {
    return fa.reduce(b, f);
};
function traverse(F) {
    return function (ta, f) { return ta.fold(function (l) { return F.of(exports.left(l)); }, function (a) { return F.map(f(a), function (b) { return of(b); }); }); };
}
var chainRec = function (a, f) {
    return ChainRec_1.tailRec(function (e) { return e.fold(function (l) { return exports.right(exports.left(l)); }, function (r) { return r.fold(function (a) { return exports.left(f(a)); }, function (b) { return exports.right(exports.right(b)); }); }); }, f(a));
};
/**
 * Constructs a new `Either` holding a `Left` value.
 * This usually represents a failure, due to the right-bias of this structure
 * @function
 */
exports.left = function (l) {
    return new Left(l);
};
/**
 * Constructs a new `Either` holding a `Right` value.
 * This usually represents a successful value due to the right bias of this structure
 * @function
 * @alias of
 */
exports.right = of;
/** @function */
exports.fromPredicate = function (predicate, whenFalse) { return function (a) {
    return predicate(a) ? exports.right(a) : exports.left(whenFalse(a));
}; };
/**
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into
 * a `Right`, if the value is a `None` use the provided default as a `Left`
 * @function
 */
exports.fromOption = function (defaultValue) { return function (fa) {
    return fa.fold(exports.left(defaultValue), function (a) { return exports.right(a); });
}; };
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into
 * a `Right`, if the value is nully use the provided default as a `Left`
 * @function
 */
exports.fromNullable = function (defaultValue) { return function (a) {
    return a == null ? exports.left(defaultValue) : exports.right(a);
}; };
/** @function */
exports.tryCatch = function (f) {
    try {
        return exports.right(f());
    }
    catch (e) {
        return exports.left(e);
    }
};
/** @function */
exports.fromValidation = function (fa) {
    return fa.fold(exports.left, exports.right);
};
/** @instance */
exports.either = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain,
    reduce: reduce,
    traverse: traverse,
    bimap: bimap,
    alt: alt,
    extend: extend,
    chainRec: chainRec
};
//# sourceMappingURL=Either.js.map