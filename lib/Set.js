"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
var Ord_1 = require("./Ord");
/** @function */
exports.toArray = function (O) { return function (x) {
    var r = [];
    x.forEach(function (e) { return r.push(e); });
    return r.sort(Ord_1.toNativeComparator(O.compare));
}; };
/** @function */
exports.getSetoid = function (S) {
    var sub = exports.subset(S);
    return {
        equals: function (x, y) { return sub(x)(y) && sub(y)(x); }
    };
};
/** @function */
exports.some = function (predicate) { return function (x) {
    var values = x.values();
    var e;
    var found = false;
    // tslint:disable:no-conditional-assignment
    while (!found && !(e = values.next()).done) {
        found = predicate(e.value);
    }
    return found;
}; };
/** @function */
exports.every = function (predicate) { return function (x) {
    return !exports.some(function_1.not(predicate))(x);
}; };
/**
 * `true` if and only if every element in the first set
 * is an element of the second set
 * @function
 */
exports.subset = function (S) { return function (x) { return function (y) {
    return exports.every(exports.member(S)(y))(x);
}; }; };
/** @function */
exports.filter = function (predicate) { return function (x) {
    var values = x.values();
    var e;
    var r = new Set();
    // tslint:disable:no-conditional-assignment
    while (!(e = values.next()).done) {
        var value = e.value;
        if (predicate(value)) {
            r.add(value);
        }
    }
    return r;
}; };
/**
 * Test if a value is a member of a set
 * @function
 */
exports.member = function (S) { return function (x) { return function (a) {
    return exports.some(function (ax) { return S.equals(a, ax); })(x);
}; }; };
/**
 * Form the union of two sets
 * @function
 */
exports.union = function (S) {
    var hasS = exports.member(S);
    return function (x, y) {
        var xhas = hasS(x);
        var r = new Set(x);
        y.forEach(function (e) {
            if (!xhas(e)) {
                r.add(e);
            }
        });
        return r;
    };
};
/**
 * The set of elements which are in both the first and second set
 * @function
 */
exports.intersection = function (S) {
    var hasS = exports.member(S);
    return function (x, y) {
        var yhas = hasS(y);
        var r = new Set();
        x.forEach(function (e) {
            if (yhas(e)) {
                r.add(e);
            }
        });
        return r;
    };
};
/**
 * Form the set difference (`y` - `x`)
 * @function
 */
exports.difference = function (S) { return function (x) {
    return exports.filter(function_1.not(exports.member(S)(x)));
}; };
/** @function */
exports.getUnionMonoid = function (S) {
    return {
        concat: exports.union(S),
        empty: new Set()
    };
};
/** @function */
exports.getIntersectionSemigroup = function (S) {
    return {
        concat: exports.intersection(S)
    };
};
/** @function */
exports.reduce = function (O) {
    var toArrayO = exports.toArray(O);
    return function (fa, b, f) { return toArrayO(fa).reduce(f, b); };
};
/**
 * Create a set with one element
 * @function
 */
exports.singleton = function (a) {
    return new Set([a]);
};
/**
 * Insert a value into a set
 * @function
 */
exports.insert = function (S) {
    var hasS = exports.member(S);
    return function (a) { return function (x) {
        if (!hasS(x)(a)) {
            var r = new Set(x);
            r.add(a);
            return r;
        }
        else {
            return x;
        }
    }; };
};
/**
 * Delete a value from a set
 * @function
 */
exports.remove = function (S) { return function (a) { return function (x) {
    return exports.filter(function (ax) { return !S.equals(a, ax); })(x);
}; }; };
//# sourceMappingURL=Set.js.map