"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URI = 'State';
/**
 * @data
 * @constructor State
 */
var State = /** @class */ (function () {
    function State(run) {
        this.run = run;
    }
    State.prototype.eval = function (s) {
        return this.run(s)[0];
    };
    State.prototype.exec = function (s) {
        return this.run(s)[1];
    };
    State.prototype.map = function (f) {
        var _this = this;
        return new State(function (s) {
            var _a = _this.run(s), a = _a[0], s1 = _a[1];
            return [f(a), s1];
        });
    };
    State.prototype.ap = function (fab) {
        var _this = this;
        return fab.chain(function (f) { return _this.map(f); }); // <= derived
    };
    State.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    State.prototype.chain = function (f) {
        var _this = this;
        return new State(function (s) {
            var _a = _this.run(s), a = _a[0], s1 = _a[1];
            return f(a).run(s1);
        });
    };
    return State;
}());
exports.State = State;
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new State(function (s) { return [a, s]; });
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var chain = function (fa, f) {
    return fa.chain(f);
};
/** @function */
exports.get = function () {
    return new State(function (s) { return [s, s]; });
};
/** @function */
exports.put = function (s) {
    return new State(function () { return [undefined, s]; });
};
/** @function */
exports.modify = function (f) {
    return new State(function (s) { return [undefined, f(s)]; });
};
/** @function */
exports.gets = function (f) {
    return new State(function (s) { return [f(s), s]; });
};
/** @instance */
exports.state = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain
};
//# sourceMappingURL=State.js.map