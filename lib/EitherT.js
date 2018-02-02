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
var Applicative_1 = require("./Applicative");
var either = require("./Either");
function chain(F) {
    return function (f, fa) { return F.chain(fa, function (e) { return e.fold(function (l) { return F.of(either.left(l)); }, function (a) { return f(a); }); }); };
}
exports.chain = chain;
function right(F) {
    return function (ma) { return F.map(ma, function (a) { return either.right(a); }); };
}
exports.right = right;
function left(F) {
    return function (ml) { return F.map(ml, function (l) { return either.left(l); }); };
}
exports.left = left;
function fromEither(F) {
    return function (oa) { return F.of(oa); };
}
exports.fromEither = fromEither;
function fold(F) {
    return function (left, right, fa) { return F.map(fa, function (e) { return e.fold(left, right); }); };
}
exports.fold = fold;
function mapLeft(F) {
    return function (f) { return function (fa) { return F.map(fa, function (e) { return e.mapLeft(f); }); }; };
}
exports.mapLeft = mapLeft;
function getEitherT(M) {
    var applicativeComposition = Applicative_1.getApplicativeComposition(M, either.either);
    return __assign({}, applicativeComposition, { chain: chain(M) });
}
exports.getEitherT = getEitherT;
//# sourceMappingURL=EitherT.js.map