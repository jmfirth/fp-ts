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
var Ord_1 = require("./Ord");
/** @instance */
exports.boundedNumber = __assign({}, Ord_1.ordNumber, { top: Infinity, bottom: -Infinity });
//# sourceMappingURL=Bounded.js.map