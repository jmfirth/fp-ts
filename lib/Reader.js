"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
exports.URI = 'Reader';
/**
 * @data
 * @constructor Reader
 */
var Reader = /** @class */ (function () {
    function Reader(run) {
        this.run = run;
    }
    Reader.prototype.map = function (f) {
        var _this = this;
        return new Reader(function (e) { return f(_this.run(e)); });
    };
    Reader.prototype.ap = function (fab) {
        var _this = this;
        return new Reader(function (e) { return fab.run(e)(_this.run(e)); });
    };
    Reader.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    Reader.prototype.chain = function (f) {
        var _this = this;
        return new Reader(function (e) { return f(_this.run(e)).run(e); });
    };
    return Reader;
}());
exports.Reader = Reader;
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new Reader(function (e) { return a; });
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var chain = function (fa, f) {
    return fa.chain(f);
};
/**
 * reads the current context
 * @function
 */
exports.ask = function () {
    return new Reader(function_1.identity);
};
/**
 * Projects a value from the global context in a Reader
 * @function
 */
exports.asks = function (f) {
    return new Reader(f);
};
/**
 * changes the value of the local context during the execution of the action `fa`
 * @function
 */
exports.local = function (f) { return function (fa) {
    return new Reader(function (e) { return fa.run(f(e)); });
}; };
/** @instance */
exports.reader = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain
};
//# sourceMappingURL=Reader.js.map