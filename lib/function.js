"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** @function */
exports.unsafeCoerce = function (a) { return a; };
/** @function */
exports.not = function (predicate) {
    return function (a) { return !predicate(a); };
};
/** @function */
function or(p1, p2) {
    return function (a) { return p1(a) || p2(a); };
}
exports.or = or;
/** @function */
exports.and = function (p1, p2) {
    return function (a) { return p1(a) && p2(a); };
};
/** @function */
exports.constant = function (a) {
    return function () { return a; };
};
/**
 * A thunk that returns always `true`
 * @function
 */
exports.constTrue = function () {
    return true;
};
/**
 * A thunk that returns always `false`
 * @function
 */
exports.constFalse = function () {
    return false;
};
/**
 * A thunk that returns always `null`
 * @function
 */
exports.constNull = function () {
    return null;
};
/**
 * A thunk that returns always `undefined`
 * @function
 */
exports.constUndefined = function () {
    return undefined;
};
/** @function */
exports.identity = function (a) {
    return a;
};
/**
 * Flips the order of the arguments to a function of two arguments.
 * @function
 */
exports.flip = function (f) {
    return function (b) { return function (a) { return f(a)(b); }; };
};
/**
 * The `on` function is used to change the domain of a binary operator.
 * @function
 */
exports.on = function (op) { return function (f) {
    return function (x, y) { return op(f(x), f(y)); };
}; };
/** @function */
function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    var len = fns.length - 1;
    return function (x) {
        var y = x;
        for (var i = len; i > -1; i--) {
            y = fns[i].call(this, y);
        }
        return y;
    };
}
exports.compose = compose;
/** @function */
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    var len = fns.length - 1;
    return function (x) {
        var y = x;
        for (var i = 0; i <= len; i++) {
            y = fns[i].call(this, y);
        }
        return y;
    };
}
exports.pipe = pipe;
/** @function */
exports.concat = function (x, y) {
    var lenx = x.length;
    var leny = y.length;
    var r = Array(lenx + leny);
    for (var i = 0; i < lenx; i++) {
        r[i] = x[i];
    }
    for (var i = 0; i < leny; i++) {
        r[i + lenx] = y[i];
    }
    return r;
};
function curried(f, n, acc) {
    return function (x) {
        var combined = exports.concat(acc, [x]);
        return n === 0 ? f.apply(this, combined) : curried(f, n - 1, combined);
    };
}
/** @function */
function curry(f) {
    return curried(f, f.length - 1, []);
}
exports.curry = curry;
/** @function */
exports.toString = function (x) {
    if (typeof x === 'string') {
        return JSON.stringify(x);
    }
    if (x instanceof Date) {
        return "new Date('" + x.toISOString() + "')";
    }
    if (Array.isArray(x)) {
        return "[" + x.map(exports.toString).join(', ') + "]";
    }
    try {
        return JSON.stringify(x, null, 2);
    }
    catch (e) {
        return String(x);
    }
};
/** @function */
exports.tuple = function (a, b) {
    return [a, b];
};
/** @function */
exports.tupleCurried = function (a) { return function (b) {
    return [a, b];
}; };
/**
 * Applies a function to an argument ($)
 * @function
 */
exports.apply = function (f) { return function (a) {
    return f(a);
}; };
/**
 * Applies an argument to a function (#)
 * @function
 */
exports.applyFlipped = function (a) { return function (f) {
    return f(a);
}; };
//# sourceMappingURL=function.js.map