"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
exports.URI = 'Store';
/**
 * @data
 * @constructor Store
 */
var Store = /** @class */ (function () {
    function Store(peek, pos) {
        this.peek = peek;
        this.pos = pos;
    }
    /** Reposition the focus at the specified position */
    Store.prototype.seek = function (s) {
        return new Store(this.peek, s);
    };
    Store.prototype.map = function (f) {
        var _this = this;
        return new Store(function (s) { return f(_this.peek(s)); }, this.pos);
    };
    Store.prototype.extract = function () {
        return this.peek(this.pos);
    };
    Store.prototype.extend = function (f) {
        var _this = this;
        return new Store(function (s) { return f(_this.seek(s)); }, this.pos);
    };
    Store.prototype.inspect = function () {
        return this.toString();
    };
    Store.prototype.toString = function () {
        return "new Store(" + function_1.toString(this.peek) + ", " + function_1.toString(this.pos) + ")";
    };
    return Store;
}());
exports.Store = Store;
var map = function (sa, f) {
    return sa.map(f);
};
var extract = function (sa) {
    return sa.extract();
};
var extend = function (sa, f) {
    return sa.extend(f);
};
/**
 * Extract a value from a position which depends on the current position
 * @function
 */
exports.peeks = function (f) { return function (sa) { return function (s) {
    return sa.peek(f(sa.pos));
}; }; };
/**
 * Reposition the focus at the specified position, which depends on the current position
 * @function
 */
exports.seeks = function (f) { return function (sa) {
    return new Store(sa.peek, f(sa.pos));
}; };
/**
 * Extract a collection of values from positions which depend on the current position
 * @function
 */
function experiment(F) {
    return function (f) { return function (sa) { return F.map(f(sa.pos), function (s) { return sa.peek(s); }); }; };
}
exports.experiment = experiment;
/** @instance */
exports.store = {
    URI: exports.URI,
    map: map,
    extract: extract,
    extend: extend
};
//# sourceMappingURL=Store.js.map