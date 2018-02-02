"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = require("./Option");
var function_1 = require("./function");
exports.URI = 'These';
var This = /** @class */ (function () {
    function This(value) {
        this.value = value;
        this._tag = 'This';
    }
    This.prototype.map = function (f) {
        return this;
    };
    This.prototype.bimap = function (f, g) {
        return exports.this_(f(this.value));
    };
    This.prototype.reduce = function (b, f) {
        return b;
    };
    /** Applies a function to each case in the data structure */
    This.prototype.fold = function (this_, that, both) {
        return this_(this.value);
    };
    This.prototype.inspect = function () {
        return this.toString();
    };
    This.prototype.toString = function () {
        return "this_(" + function_1.toString(this.value) + ")";
    };
    /** Returns `true` if the these is `This`, `false` otherwise */
    This.prototype.isThis = function () {
        return true;
    };
    /** Returns `true` if the these is `That`, `false` otherwise */
    This.prototype.isThat = function () {
        return false;
    };
    /** Returns `true` if the these is `Both`, `false` otherwise */
    This.prototype.isBoth = function () {
        return false;
    };
    return This;
}());
exports.This = This;
var That = /** @class */ (function () {
    function That(value) {
        this.value = value;
        this._tag = 'That';
    }
    That.prototype.map = function (f) {
        return new That(f(this.value));
    };
    That.prototype.bimap = function (f, g) {
        return exports.that(g(this.value));
    };
    That.prototype.reduce = function (b, f) {
        return f(b, this.value);
    };
    That.prototype.fold = function (this_, that, both) {
        return that(this.value);
    };
    That.prototype.inspect = function () {
        return this.toString();
    };
    That.prototype.toString = function () {
        return "that(" + function_1.toString(this.value) + ")";
    };
    That.prototype.isThis = function () {
        return false;
    };
    That.prototype.isThat = function () {
        return true;
    };
    That.prototype.isBoth = function () {
        return false;
    };
    return That;
}());
exports.That = That;
var Both = /** @class */ (function () {
    function Both(l, a) {
        this.l = l;
        this.a = a;
        this._tag = 'Both';
    }
    Both.prototype.map = function (f) {
        return new Both(this.l, f(this.a));
    };
    Both.prototype.bimap = function (f, g) {
        return exports.both(f(this.l), g(this.a));
    };
    Both.prototype.reduce = function (b, f) {
        return f(b, this.a);
    };
    Both.prototype.fold = function (this_, that, both) {
        return both(this.l, this.a);
    };
    Both.prototype.inspect = function () {
        return this.toString();
    };
    Both.prototype.toString = function () {
        return "both(" + function_1.toString(this.l) + ", " + function_1.toString(this.a) + ")";
    };
    Both.prototype.isThis = function () {
        return false;
    };
    Both.prototype.isThat = function () {
        return false;
    };
    Both.prototype.isBoth = function () {
        return true;
    };
    return Both;
}());
exports.Both = Both;
/** @function */
exports.getSetoid = function (SL, SA) {
    return {
        equals: function (x, y) {
            return x.fold(function (lx) { return y.fold(function (ly) { return SL.equals(lx, ly); }, function_1.constFalse, function_1.constFalse); }, function (ax) { return y.fold(function_1.constFalse, function (ay) { return SA.equals(ax, ay); }, function_1.constFalse); }, function (lx, ax) { return y.fold(function_1.constFalse, function_1.constFalse, function (ly, ay) { return SL.equals(lx, ly) && SA.equals(ax, ay); }); });
        }
    };
};
/** @function */
exports.getSemigroup = function (SL, SA) {
    return {
        concat: function (x, y) {
            return x.fold(function (lx) { return y.fold(function (ly) { return exports.this_(SL.concat(lx, ly)); }, function (ay) { return exports.both(lx, ay); }, function (ly, ay) { return exports.both(SL.concat(lx, ly), ay); }); }, function (ax) { return y.fold(function (lx) { return exports.both(lx, ax); }, function (ay) { return exports.that(SA.concat(ax, ay)); }, function (ly, ay) { return exports.both(ly, SA.concat(ax, ay)); }); }, function (lx, ax) {
                return y.fold(function (ly) { return exports.both(SL.concat(lx, ly), ax); }, function (ay) { return exports.both(lx, SA.concat(ax, ay)); }, function (ly, ay) { return exports.both(SL.concat(lx, ly), SA.concat(ax, ay)); });
            });
        }
    };
};
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new That(a);
};
var ap = function (S) { return function (fab, fa) {
    return chain(S)(fab, function (f) { return map(fa, f); });
}; };
var chain = function (S) { return function (fa, f) {
    return fa.fold(function () { return fa; }, function (a) { return f(a); }, function (l1, a) { return f(a).fold(function (l2) { return exports.this_(S.concat(l1, l2)); }, function (b) { return exports.both(l1, b); }, function (l2, b) { return exports.both(S.concat(l1, l2), b); }); });
}; };
/** @function */
exports.getMonad = function (S) {
    return {
        URI: exports.URI,
        map: map,
        of: of,
        ap: ap(S),
        chain: chain(S)
    };
};
var bimap = function (fla, f, g) {
    return fla.bimap(f, g);
};
var reduce = function (fa, b, f) {
    return fa.reduce(b, f);
};
function traverse(F) {
    return function (ta, f) { return ta.fold(function (l) { return F.of(exports.this_(l)); }, function (a) { return F.map(f(a), function (b) { return exports.that(b); }); }, function (l, a) { return F.map(f(a), function (b) { return exports.both(l, b); }); }); };
}
/** @function */
exports.this_ = function (l) {
    return new This(l);
};
/**
 * @function
 * @alias of
 */
exports.that = of;
/** @function */
exports.both = function (l, a) {
    return new Both(l, a);
};
/** @function */
exports.fromThese = function (defaultThis, defaultThat) { return function (fa) {
    return fa.fold(function (l) { return [l, defaultThat]; }, function (a) { return [defaultThis, a]; }, function (l, a) { return [l, a]; });
}; };
/** @function */
exports.theseLeft = function (fa) {
    return fa.fold(function (l) { return Option_1.some(l); }, function () { return Option_1.none; }, function (l, _) { return Option_1.some(l); });
};
/** @function */
exports.theseRight = function (fa) {
    return fa.fold(function () { return Option_1.none; }, function (a) { return Option_1.some(a); }, function (_, a) { return Option_1.some(a); });
};
/** @instance */
exports.these = {
    URI: exports.URI,
    map: map,
    bimap: bimap,
    reduce: reduce,
    traverse: traverse
};
//# sourceMappingURL=These.js.map