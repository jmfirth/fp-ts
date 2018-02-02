"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @function */
exports.tailRec = function (f, a) {
    var v = f(a);
    while (v.isLeft()) {
        v = f(v.value);
    }
    return v.value;
};
//# sourceMappingURL=ChainRec.js.map