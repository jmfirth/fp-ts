"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
var Option_1 = require("./Option");
var Ord_1 = require("./Ord");
var Apply_1 = require("./Apply");
var option = require("./Option");
exports.URI = 'Array';
/** @function */
exports.getMonoid = function () {
    return {
        concat: function_1.concat,
        empty: []
    };
};
var map = function (fa, f) {
    var l = fa.length;
    var r = new Array(l);
    for (var i = 0; i < l; i++) {
        r[i] = f(fa[i]);
    }
    return r;
};
var of = function (a) {
    return [a];
};
var ap = function (fab, fa) {
    return exports.flatten(map(fab, function (f) { return map(fa, f); }));
};
var chain = function (fa, f) {
    var resLen = 0;
    var l = fa.length;
    var temp = new Array(l);
    for (var i = 0; i < l; i++) {
        var e = fa[i];
        var arr = f(e);
        resLen += arr.length;
        temp[i] = arr;
    }
    var r = Array(resLen);
    var start = 0;
    for (var i = 0; i < l; i++) {
        var arr = temp[i];
        var l_1 = arr.length;
        for (var j = 0; j < l_1; j++) {
            r[j + start] = arr[j];
        }
        start += l_1;
    }
    return r;
};
var reduce = function (fa, b, f) {
    var l = fa.length;
    var r = b;
    for (var i = 0; i < l; i++) {
        r = f(r, fa[i]);
    }
    return r;
};
function traverse(F) {
    var liftedSnoc = Apply_1.liftA2(F)(exports.snoc);
    return function (ta, f) { return reduce(ta, F.of(zero()), function (fab, a) { return liftedSnoc(fab)(f(a)); }); };
}
exports.traverse = traverse;
var zero = function () { return []; };
var alt = function_1.concat;
var unfoldr = function (f, b) {
    var ret = [];
    var bb = b;
    while (true) {
        var mt = f(bb);
        if (mt.isSome()) {
            var _a = mt.value, a = _a[0], b_1 = _a[1];
            ret.push(a);
            bb = b_1;
        }
        else {
            break;
        }
    }
    return ret;
};
var extend = function (fa, f) {
    return fa.map(function (_, i, as) { return f(as.slice(i)); });
};
/** @function */
exports.partitionMap = function (f, fa) {
    var left = [];
    var right = [];
    var len = fa.length;
    for (var i = 0; i < len; i++) {
        f(fa[i]).fold(function (l) { return left.push(l); }, function (r) { return right.push(r); });
    }
    return { left: left, right: right };
};
/**
 * Example
 *
 * ```ts
 * flatten([[1], [2], [3]]) // [1, 2, 3]
 * ```
 *
 * @function
 */
exports.flatten = function (ffa) {
    var rLen = 0;
    var len = ffa.length;
    for (var i = 0; i < len; i++) {
        rLen += ffa[i].length;
    }
    var r = Array(rLen);
    var start = 0;
    for (var i = 0; i < len; i++) {
        var arr = ffa[i];
        var l = arr.length;
        for (var j = 0; j < l; j++) {
            r[j + start] = arr[j];
        }
        start += l;
    }
    return r;
};
/**
 * Break an array into its first element and remaining elements
 *
 * Example
 *
 * ```ts
 * const length = <A>(xs: Array<A>): number => fold(() => 0, (head, tail) => 1 + length(tail), xs)
 * ```
 *
 * @function
 */
exports.fold = function (nil, cons, as) {
    return as.length === 0 ? nil() : cons(as[0], as.slice(1));
};
/**
 * Get the number of elements in an array
 * @function
 */
exports.length = function (as) {
    return as.length;
};
/**
 * Test whether an array is empty
 * @function
 */
exports.isEmpty = function (as) {
    return exports.length(as) === 0;
};
/**
 * Test whether an array contains a particular index
 * @function
 */
exports.isOutOfBound = function (i) { return function (as) {
    return i < 0 || i >= as.length;
}; };
/**
 * This function provides a safe way to read a value at a particular index from an array
 * @function
 */
exports.index = function (i) { return function (as) {
    return exports.isOutOfBound(i)(as) ? option.none : option.some(as[i]);
}; };
/**
 * Attaches an element to the front of an array, creating a new array
 */
exports.cons = function (a) { return function (as) {
    var len = as.length;
    var r = Array(len + 1);
    for (var i = 0; i < len; i++) {
        r[i + 1] = as[i];
    }
    r[0] = a;
    return r;
}; };
/**
 * Append an element to the end of an array, creating a new array
 * @function
 */
exports.snoc = function (as) { return function (a) {
    var len = as.length;
    var r = Array(len + 1);
    for (var i = 0; i < len; i++) {
        r[i] = as[i];
    }
    r[len] = a;
    return r;
}; };
/**
 * Get the first element in an array, or `None` if the array is empty
 * @function
 */
exports.head = function (as) {
    return exports.isEmpty(as) ? option.none : option.some(as[0]);
};
/**
 * Get the last element in an array, or `None` if the array is empty
 * @function
 */
exports.last = function (as) {
    return exports.index(exports.length(as) - 1)(as);
};
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 * @function
 */
exports.tail = function (as) {
    return as.length === 0 ? option.none : option.some(as.slice(1));
};
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 * @function
 */
exports.init = function (as) {
    var len = as.length;
    return len === 0 ? option.none : option.some(as.slice(0, len - 1));
};
/**
 * Keep only a number of elements from the start of an array, creating a new array
 * @function
 */
exports.take = function (n) { return function (as) {
    return as.slice(0, n);
}; };
var spanIndexUncurry = function (predicate, as) {
    var l = as.length;
    var i = 0;
    for (; i < l; i++) {
        if (!predicate(as[i])) {
            break;
        }
    }
    return i;
};
/**
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 * @function
 */
exports.span = function (predicate) { return function (as) {
    var i = spanIndexUncurry(predicate, as);
    var init = Array(i);
    for (var j = 0; j < i; j++) {
        init[j] = as[j];
    }
    var l = as.length;
    var rest = Array(l - i);
    for (var j = i; j < l; j++) {
        rest[j - i] = as[j];
    }
    return { init: init, rest: rest };
}; };
/**
 * Calculate the longest initial subarray for which all element satisfy the
 * specified predicate, creating a new array
 * @function
 */
exports.takeWhile = function (predicate) { return function (as) {
    var i = spanIndexUncurry(predicate, as);
    var init = Array(i);
    for (var j = 0; j < i; j++) {
        init[j] = as[j];
    }
    return init;
}; };
/**
 * Drop a number of elements from the start of an array, creating a new array
 * @function
 */
exports.drop = function (n) { return function (as) {
    return as.slice(n, as.length);
}; };
/**
 * Remove the longest initial subarray for which all element satisfy the
 * specified predicate, creating a new array
 * @function
 */
exports.dropWhile = function (predicate) { return function (as) {
    var i = spanIndexUncurry(predicate, as);
    var l = as.length;
    var rest = Array(l - i);
    for (var j = i; j < l; j++) {
        rest[j - i] = as[j];
    }
    return rest;
}; };
/**
 * Find the first index for which a predicate holds
 * @function
 */
exports.findIndex = function (predicate) { return function (as) {
    var len = as.length;
    for (var i = 0; i < len; i++) {
        if (predicate(as[i])) {
            return option.some(i);
        }
    }
    return option.none;
}; };
/**
 * Find the first element which satisfies a predicate function
 * @function
 */
exports.findFirst = function (predicate) { return function (as) {
    return Option_1.fromNullable(as.find(predicate));
}; };
/**
 * Find the last element which satisfies a predicate function
 * @function
 */
exports.findLast = function (predicate) { return function (as) {
    var len = as.length;
    var a = null;
    for (var i = len - 1; i >= 0; i--) {
        if (predicate(as[i])) {
            a = as[i];
            break;
        }
    }
    return Option_1.fromNullable(a);
}; };
/**
 * Filter an array, keeping the elements which satisfy a predicate function, creating a new array
 * @function
 */
exports.filter = function (predicate) { return function (as) {
    var l = as.length;
    var r = [];
    for (var i = 0; i < l; i++) {
        var v = as[i];
        if (predicate(v)) {
            r.push(v);
        }
    }
    return r;
}; };
/** @function */
exports.refine = function (as) { return function (refinement) {
    return exports.filter(refinement)(as);
}; };
/** @function */
exports.copy = function (as) {
    var l = as.length;
    var r = Array(l);
    for (var i = 0; i < l; i++) {
        r[i] = as[i];
    }
    return r;
};
/** @function */
exports.unsafeInsertAt = function (i) { return function (a) { return function (as) {
    var xs = exports.copy(as);
    xs.splice(i, 0, a);
    return xs;
}; }; };
/**
 * Insert an element at the specified index, creating a new array, or
 * returning `None` if the index is out of bounds
 * @function
 */
exports.insertAt = function (i) { return function (a) { return function (as) {
    return i < 0 || i > as.length ? option.none : option.some(exports.unsafeInsertAt(i)(a)(as));
}; }; };
/** @function */
exports.unsafeUpdateAt = function (i) { return function (a) { return function (as) {
    var xs = exports.copy(as);
    xs[i] = a;
    return xs;
}; }; };
/**
 * Change the element at the specified index, creating a new array, or
 * returning `None` if the index is out of bounds
 * @function
 */
exports.updateAt = function (i) { return function (a) { return function (as) {
    return exports.isOutOfBound(i)(as) ? option.none : option.some(exports.unsafeUpdateAt(i)(a)(as));
}; }; };
/** @function */
exports.unsafeDeleteAt = function (i) { return function (as) {
    var xs = exports.copy(as);
    xs.splice(i, 1);
    return xs;
}; };
/**
 * Delete the element at the specified index, creating a new array, or
 * returning `None` if the index is out of bounds
 * @function
 */
exports.deleteAt = function (i) { return function (as) {
    return exports.isOutOfBound(i)(as) ? option.none : option.some(exports.unsafeDeleteAt(i)(as));
}; };
/**
 * Apply a function to the element at the specified index, creating a new
 * array, or returning `None` if the index is out of bounds
 * @function
 */
exports.modifyAt = function (i) { return function (f) { return function (as) {
    return exports.isOutOfBound(i)(as) ? option.none : exports.updateAt(i)(f(as[i]))(as);
}; }; };
/**
 * Reverse an array, creating a new array
 * @function
 */
exports.reverse = function (as) {
    return exports.copy(as).reverse();
};
/**
 * Apply a function to each element in an array, keeping only the results
 * which contain a value, creating a new array
 * @function
 */
exports.mapOption = function (as, f) {
    return chain(as, function (a) { return f(a).fold([], of); });
};
/**
 * Filter an array of optional values, keeping only the elements which contain
 * a value, creating a new array
 * @function
 */
exports.catOptions = function (as) {
    return exports.mapOption(as, function_1.identity);
};
/**
 * Extracts from a list of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 * @function
 */
exports.rights = function (as) {
    return chain(as, function (a) { return a.fold(function () { return []; }, of); });
};
/**
 * Extracts from a list of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 * @function
 */
exports.lefts = function (as) {
    return chain(as, function (a) { return a.fold(of, function () { return []; }); });
};
/**
 * Sort the elements of an array in increasing order, creating a new array
 * @function
 */
exports.sort = function (ord) {
    var comparator = Ord_1.toNativeComparator(ord.compare);
    return function (as) { return exports.copy(as).sort(comparator); };
};
/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array.
 * If one input array is short, excess elements of the longer array are discarded.
 * @function
 */
exports.zipWith = function (f) { return function (fa) { return function (fb) {
    var fc = [];
    var len = Math.min(fa.length, fb.length);
    for (var i = 0; i < len; i++) {
        fc[i] = f(fa[i], fb[i]);
    }
    return fc;
}; }; };
/**
 * Takes two arrays and returns an array of corresponding pairs.
 * If one input array is short, excess elements of the longer array are discarded
 * @function
 */
exports.zip = function (fa) { return function (fb) {
    return exports.zipWith(function_1.tuple)(fa)(fb);
}; };
/**
 * Rotate an array to the right by `n` steps
 * @function
 */
exports.rotate = function (n) { return function (xs) {
    var len = xs.length;
    if (n === 0 || len <= 1 || len === Math.abs(n)) {
        return xs;
    }
    else if (n < 0) {
        return exports.rotate(len + n)(xs);
    }
    else {
        return xs.slice(-n).concat(xs.slice(0, len - n));
    }
}; };
exports.array = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain,
    reduce: reduce,
    unfoldr: unfoldr,
    traverse: traverse,
    zero: zero,
    alt: alt,
    extend: extend
};
//# sourceMappingURL=Array.js.map