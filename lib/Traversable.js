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
var Functor_1 = require("./Functor");
var Foldable_1 = require("./Foldable");
/** @function */
function traverse(F, T) {
    return T.traverse(F);
}
exports.traverse = traverse;
/** @function */
function sequence(F, T) {
    return function (tfa) { return T.traverse(F)(tfa, function (fa) { return fa; }); };
}
exports.sequence = sequence;
/** @function */
function getTraversableComposition(F, G) {
    return __assign({}, Functor_1.getFunctorComposition(F, G), Foldable_1.getFoldableComposition(F, G), { traverse: function (H) { return function (fga, f) { return F.traverse(H)(fga, function (ga) { return G.traverse(H)(ga, function (a) { return f(a); }); }); }; } });
}
exports.getTraversableComposition = getTraversableComposition;
//# sourceMappingURL=Traversable.js.map