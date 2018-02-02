"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Monoid_1 = require("./Monoid");
var Apply_1 = require("./Apply");
var function_1 = require("./function");
var Ord_1 = require("./Ord");
var Option_1 = require("./Option");
function getFoldableComposition(F, G) {
    return {
        reduce: function (fga, b, f) { return F.reduce(fga, b, function (b, ga) { return G.reduce(ga, b, f); }); }
    };
}
exports.getFoldableComposition = getFoldableComposition;
function foldMap(F, M) {
    return function (fa, f) { return F.reduce(fa, M.empty, function (acc, x) { return M.concat(acc, f(x)); }); };
}
exports.foldMap = foldMap;
function foldr(F) {
    return function (fa, b, f) { return foldMap(F, Monoid_1.getEndomorphismMonoid())(fa, f)(b); };
}
exports.foldr = foldr;
function fold(F, M) {
    return function (fa) { return foldMap(F, M)(fa, function_1.identity); };
}
exports.fold = fold;
/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which
 * build up thunks a la `IO`.
 * @function
 */
function foldM(F, M) {
    return function (f, b, fa) { return F.reduce(fa, M.of(b), function (mb, a) { return M.chain(mb, function (b) { return f(b, a); }); }); };
}
exports.foldM = foldM;
/**
 * Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the final result.
 * @function
 */
function traverse_(M, F) {
    return function (f, fa) { return toArray(F)(fa).reduce(function (mu, a) { return Apply_1.applyFirst(M)(mu, f(a)); }, M.of(undefined)); };
}
exports.traverse_ = traverse_;
/**
 * Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.
 * @function
 */
function sequence_(M, F) {
    return function (fa) { return traverse_(M, F)(function (ma) { return ma; }, fa); };
}
exports.sequence_ = sequence_;
function oneOf(F, P) {
    return function (fga) { return foldr(F)(fga, P.zero(), function (a) { return function (b) { return P.alt(a, b); }; }); };
}
exports.oneOf = oneOf;
function intercalate(F, M) {
    return function (sep) {
        function go(_a, x) {
            var init = _a.init, acc = _a.acc;
            return init ? { init: false, acc: x } : { init: false, acc: M.concat(M.concat(acc, sep), x) };
        }
        return function (fm) { return F.reduce(fm, { init: true, acc: M.empty }, go).acc; };
    };
}
exports.intercalate = intercalate;
function sum(F, S) {
    return function (fa) { return F.reduce(fa, S.zero, function (b, a) { return S.add(b, a); }); };
}
exports.sum = sum;
function product(F, S) {
    return function (fa) { return F.reduce(fa, S.one, function (b, a) { return S.mul(b, a); }); };
}
exports.product = product;
function elem(F, S) {
    return function (a, fa) { return F.reduce(fa, false, function (b, x) { return b || S.equals(x, a); }); };
}
exports.elem = elem;
function find(F) {
    return function (fa, p) {
        return F.reduce(fa, Option_1.none, function (b, a) {
            if (b.isNone() && p(a)) {
                return Option_1.some(a);
            }
            else {
                return b;
            }
        });
    };
}
exports.find = find;
function minimum(F, O) {
    var minO = Ord_1.min(O);
    return function (fa) { return F.reduce(fa, Option_1.none, function (b, a) { return b.fold(Option_1.some(a), function (b) { return Option_1.some(minO(b, a)); }); }); };
}
exports.minimum = minimum;
function maximum(F, O) {
    var maxO = Ord_1.max(O);
    return function (fa) { return F.reduce(fa, Option_1.none, function (b, a) { return b.fold(Option_1.some(a), function (b) { return Option_1.some(maxO(b, a)); }); }); };
}
exports.maximum = maximum;
function toArray(F) {
    return function (fa) { return foldMap(F, Monoid_1.unsafeMonoidArray)(fa, function (a) { return [a]; }); };
}
exports.toArray = toArray;
//# sourceMappingURL=Foldable.js.map