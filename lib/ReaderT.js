"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @function */
function map(F) {
    return function (f, fa) { return function (e) { return F.map(fa(e), f); }; };
}
exports.map = map;
/** @function */
function of(F) {
    return function (a) { return function (e) { return F.of(a); }; };
}
exports.of = of;
/** @function */
function ap(F) {
    return function (fab, fa) { return function (e) { return F.ap(fab(e), fa(e)); }; };
}
exports.ap = ap;
/** @function */
function chain(F) {
    return function (f, fa) { return function (e) { return F.chain(fa(e), function (a) { return f(a)(e); }); }; };
}
exports.chain = chain;
/** @function */
function ask(F) {
    return function () { return function (e) { return F.of(e); }; };
}
exports.ask = ask;
/** @function */
function asks(F) {
    return function (f) { return function (e) { return F.of(f(e)); }; };
}
exports.asks = asks;
/** @function */
function getReaderT(M) {
    return {
        map: map(M),
        of: of(M),
        ap: ap(M),
        chain: chain(M)
    };
}
exports.getReaderT = getReaderT;
//# sourceMappingURL=ReaderT.js.map