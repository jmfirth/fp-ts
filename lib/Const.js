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
exports.URI = 'Const';
/**
 * @data
 * @constructor Const
 */
var Const = /** @class */ (function () {
    function Const(value) {
        this.value = value;
    }
    Const.prototype.map = function (f) {
        return this;
    };
    Const.prototype.contramap = function (f) {
        return this;
    };
    Const.prototype.fold = function (f) {
        return f(this.value);
    };
    Const.prototype.inspect = function () {
        return this.toString();
    };
    Const.prototype.toString = function () {
        return "new Const(" + function_1.toString(this.value) + ")";
    };
    return Const;
}());
exports.Const = Const;
/** @function */
exports.getSetoid = function (S) { return ({
    equals: function (x, y) { return x.fold(function (ax) { return y.fold(function (ay) { return S.equals(ax, ay); }); }); }
}); };
var map = function (fa, f) {
    return fa.map(f);
};
var contramap = function (fa, f) {
    return fa.contramap(f);
};
var ap = function (S) { return function (fab, fa) {
    return new Const(S.concat(fab.fold(function_1.identity), fa.fold(function_1.identity)));
}; };
/** @function */
exports.getApply = function (S) {
    return {
        URI: exports.URI,
        map: map,
        ap: ap(S)
    };
};
var of = function (M) { return function (b) {
    return new Const(M.empty);
}; };
/** @function */
exports.getApplicative = function (M) {
    return __assign({}, exports.getApply(M), { of: of(M) });
};
/** @instance */
exports.const_ = {
    URI: exports.URI,
    map: map,
    contramap: contramap
};
//# sourceMappingURL=Const.js.map