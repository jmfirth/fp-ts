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
exports.URI = 'IO';
/**
 * @data
 * @constructor IO
 */
var IO = /** @class */ (function () {
    function IO(run) {
        this.run = run;
    }
    IO.prototype.map = function (f) {
        var _this = this;
        return new IO(function () { return f(_this.run()); });
    };
    IO.prototype.ap = function (fab) {
        var _this = this;
        return new IO(function () { return fab.run()(_this.run()); });
    };
    IO.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    IO.prototype.chain = function (f) {
        var _this = this;
        return new IO(function () { return f(_this.run()).run(); });
    };
    IO.prototype.inspect = function () {
        return this.toString();
    };
    IO.prototype.toString = function () {
        return "new IO(" + function_1.toString(this.run) + ")";
    };
    return IO;
}());
exports.IO = IO;
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new IO(function () { return a; });
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var chain = function (fa, f) {
    return fa.chain(f);
};
/** @function */
exports.getSemigroup = function (S) {
    return {
        concat: function (x, y) { return new IO(function () { return S.concat(x.run(), y.run()); }); }
    };
};
/** @function */
exports.getMonoid = function (M) {
    return __assign({}, exports.getSemigroup(M), { empty: of(M.empty) });
};
/** @instance */
exports.io = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain
};
//# sourceMappingURL=IO.js.map