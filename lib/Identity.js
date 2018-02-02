"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChainRec_1 = require("./ChainRec");
var function_1 = require("./function");
exports.URI = 'Identity';
/**
 * @data
 * @constructor Identity
 */
var Identity = /** @class */ (function () {
    function Identity(value) {
        this.value = value;
    }
    Identity.prototype.map = function (f) {
        return new Identity(f(this.value));
    };
    Identity.prototype.ap = function (fab) {
        return this.map(fab.extract());
    };
    Identity.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    Identity.prototype.chain = function (f) {
        return f(this.extract());
    };
    Identity.prototype.reduce = function (b, f) {
        return f(b, this.value);
    };
    Identity.prototype.alt = function (fx) {
        return this;
    };
    Identity.prototype.extract = function () {
        return this.value;
    };
    Identity.prototype.extend = function (f) {
        return of(f(this));
    };
    Identity.prototype.fold = function (f) {
        return f(this.value);
    };
    Identity.prototype.inspect = function () {
        return this.toString();
    };
    Identity.prototype.toString = function () {
        return "new Identity(" + function_1.toString(this.value) + ")";
    };
    return Identity;
}());
exports.Identity = Identity;
/** @function */
exports.getSetoid = function (setoid) {
    return {
        equals: function (x, y) { return setoid.equals(x.value, y.value); }
    };
};
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new Identity(a);
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var chain = function (fa, f) {
    return fa.chain(f);
};
var reduce = function (fa, b, f) {
    return fa.reduce(b, f);
};
var alt = function (fx, fy) {
    return fx.alt(fy);
};
var extend = function (ea, f) {
    return ea.extend(f);
};
var extract = function (fa) {
    return fa.extract();
};
var chainRec = function (a, f) {
    return new Identity(ChainRec_1.tailRec(function (a) { return f(a).extract(); }, a));
};
function traverse(F) {
    return function (ta, f) { return F.map(f(ta.value), of); };
}
/** @instance */
exports.identity = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain,
    reduce: reduce,
    traverse: traverse,
    alt: alt,
    extract: extract,
    extend: extend,
    chainRec: chainRec
};
//# sourceMappingURL=Identity.js.map