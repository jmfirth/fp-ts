"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URI = 'Writer';
/**
 * @data
 * @constructor Writer
 */
var Writer = /** @class */ (function () {
    function Writer(run) {
        this.run = run;
    }
    Writer.prototype.eval = function () {
        return this.run()[0];
    };
    Writer.prototype.exec = function () {
        return this.run()[1];
    };
    Writer.prototype.map = function (f) {
        var _a = this.run(), a = _a[0], w = _a[1];
        return new Writer(function () { return [f(a), w]; });
    };
    return Writer;
}());
exports.Writer = Writer;
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (M) { return function (a) {
    return new Writer(function () { return [a, M.empty]; });
}; };
var ap = function (S) { return function (fab, fa) {
    return new Writer(function () {
        var _a = fab.run(), f = _a[0], w1 = _a[1];
        var _b = fa.run(), a = _b[0], w2 = _b[1];
        return [f(a), S.concat(w1, w2)];
    });
}; };
var chain = function (S) { return function (fa, f) {
    return new Writer(function () {
        var _a = fa.run(), a = _a[0], w1 = _a[1];
        var _b = f(a).run(), b = _b[0], w2 = _b[1];
        return [b, S.concat(w1, w2)];
    });
}; };
/** @function */
exports.tell = function (w) {
    return new Writer(function () { return [undefined, w]; });
};
/** @function */
exports.getMonad = function (M) {
    return {
        URI: exports.URI,
        map: map,
        of: of(M),
        ap: ap(M),
        chain: chain(M)
    };
};
/** @instance */
exports.writer = {
    URI: exports.URI,
    map: map
};
//# sourceMappingURL=Writer.js.map