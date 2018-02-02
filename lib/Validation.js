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
var function_1 = require("./function");
exports.URI = 'Validation';
var Failure = /** @class */ (function () {
    function Failure(value) {
        this.value = value;
        this._tag = 'Failure';
    }
    Failure.prototype.map = function (f) {
        return this;
    };
    Failure.prototype.bimap = function (f, g) {
        return exports.failure(f(this.value));
    };
    Failure.prototype.reduce = function (b, f) {
        return b;
    };
    Failure.prototype.fold = function (failure, success) {
        return failure(this.value);
    };
    /** Returns the value from this `Success` or the given argument if this is a `Failure` */
    Failure.prototype.getOrElse = function (a) {
        return a;
    };
    /** Returns the value from this `Success` or the result of given argument if this is a `Failure` */
    Failure.prototype.getOrElseL = function (f) {
        return f(this.value);
    };
    Failure.prototype.mapFailure = function (f) {
        return exports.failure(f(this.value));
    };
    Failure.prototype.swap = function () {
        return exports.success(this.value);
    };
    Failure.prototype.inspect = function () {
        return this.toString();
    };
    Failure.prototype.toString = function () {
        return "failure(" + function_1.toString(this.value) + ")";
    };
    /** Returns `true` if the validation is an instance of `Failure`, `false` otherwise */
    Failure.prototype.isFailure = function () {
        return true;
    };
    /** Returns `true` if the validation is an instance of `Success`, `false` otherwise */
    Failure.prototype.isSuccess = function () {
        return false;
    };
    return Failure;
}());
exports.Failure = Failure;
var Success = /** @class */ (function () {
    function Success(value) {
        this.value = value;
        this._tag = 'Success';
    }
    Success.prototype.map = function (f) {
        return new Success(f(this.value));
    };
    Success.prototype.bimap = function (f, g) {
        return new Success(g(this.value));
    };
    Success.prototype.reduce = function (b, f) {
        return f(b, this.value);
    };
    Success.prototype.fold = function (failure, success) {
        return success(this.value);
    };
    Success.prototype.getOrElse = function (a) {
        return this.value;
    };
    Success.prototype.getOrElseL = function (f) {
        return this.value;
    };
    Success.prototype.mapFailure = function (f) {
        return this;
    };
    Success.prototype.swap = function () {
        return exports.failure(this.value);
    };
    Success.prototype.inspect = function () {
        return this.toString();
    };
    Success.prototype.toString = function () {
        return "success(" + function_1.toString(this.value) + ")";
    };
    Success.prototype.isFailure = function () {
        return false;
    };
    Success.prototype.isSuccess = function () {
        return true;
    };
    return Success;
}());
exports.Success = Success;
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
    return new Success(a);
};
/** @function */
exports.getApplicative = function (S) {
    var ap = function (fab, fa) {
        return fab.fold(function (l1) { return fa.fold(function (l2) { return exports.failure(S.concat(l1, l2)); }, function () { return exports.failure(l1); }); }, function (f) { return fa.fold(function (l2) { return exports.failure(l2); }, function (a) { return exports.success(f(a)); }); });
    };
    return {
        URI: exports.URI,
        map: map,
        of: of,
        ap: ap
    };
};
/** @function */
exports.getMonad = function (S) {
    var chain = function (fa, f) {
        return fa.fold(function (l1) { return exports.failure(l1); }, f);
    };
    return __assign({}, exports.getApplicative(S), { chain: chain });
};
var reduce = function (fa, b, f) {
    return fa.reduce(b, f);
};
function traverse(F) {
    return function (ta, f) { return ta.fold(function (l) { return F.of(exports.failure(l)); }, function (a) { return F.map(f(a), function (b) { return of(b); }); }); };
}
/** @function */
exports.failure = function (l) {
    return new Failure(l);
};
/**
 * @function
 * @alias of
 */
exports.success = of;
/** @function */
exports.fromPredicate = function (predicate, f) { return function (a) {
    return predicate(a) ? exports.success(a) : exports.failure(f(a));
}; };
/** @function */
exports.fromEither = function (e) {
    return e.fold(exports.failure, exports.success);
};
/** @function */
exports.getSemigroup = function (SL, SA) {
    var concat = function (fx, fy) {
        return fx.fold(function (l1) { return fy.fold(function (l2) { return exports.failure(SL.concat(l1, l2)); }, function () { return exports.failure(l1); }); }, function (a1) { return fy.fold(function (l2) { return exports.failure(l2); }, function (a2) { return exports.success(SA.concat(a1, a2)); }); });
    };
    return {
        concat: concat
    };
};
/** @function */
exports.getMonoid = function (SL, SA) {
    return __assign({}, exports.getSemigroup(SL, SA), { empty: exports.success(SA.empty) });
};
/** @function */
exports.getAlt = function (S) {
    var alt = function (fx, fy) {
        return fx.fold(function (l1) { return fx.fold(function (l2) { return exports.failure(S.concat(l1, l2)); }, function () { return fx; }); }, function () { return fy; });
    };
    return {
        URI: exports.URI,
        map: map,
        alt: alt
    };
};
/** @instance */
exports.validation = {
    URI: exports.URI,
    map: map,
    reduce: reduce,
    traverse: traverse
};
//# sourceMappingURL=Validation.js.map