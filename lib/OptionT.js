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
var option = require("./Option");
/** @function */
function chain(F) {
    return function (f, fa) { return F.chain(fa, function (o) { return o.fold(F.of(option.none), function (a) { return f(a); }); }); };
}
exports.chain = chain;
/** @function */
function some(F) {
    return function (a) { return F.of(option.some(a)); };
}
exports.some = some;
/** @function */
function none(F) {
    return function () { return F.of(option.none); };
}
exports.none = none;
/** @function */
function fromOption(F) {
    return function (oa) { return F.of(oa); };
}
exports.fromOption = fromOption;
/** @function */
function liftF(F) {
    return function (fa) { return F.map(fa, function (a) { return option.some(a); }); };
}
exports.liftF = liftF;
/** @function */
function fold(F) {
    return function (r, some, fa) { return F.map(fa, function (o) { return o.fold(r, some); }); };
}
exports.fold = fold;
/** @function */
function getOrElse(F) {
    return function (a) { return function (fa) { return F.map(fa, function (o) { return o.getOrElse(a); }); }; };
}
exports.getOrElse = getOrElse;
/** @function */
function getOptionT(M) {
    var applicativeComposition = Applicative_1.getApplicativeComposition(M, option.option);
    return __assign({}, applicativeComposition, { chain: chain(M) });
}
exports.getOptionT = getOptionT;
//# sourceMappingURL=OptionT.js.map