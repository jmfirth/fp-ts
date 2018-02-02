"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
var Apply_1 = require("./Apply");
var Option_1 = require("./Option");
exports.URI = 'StrMap';
/**
 * @data
 * @constructor StrMap
 */
var StrMap = /** @class */ (function () {
    function StrMap(value) {
        this.value = value;
    }
    StrMap.prototype.mapWithKey = function (f) {
        var fb = {};
        for (var k in this.value) {
            fb[k] = f(k, this.value[k]);
        }
        return new StrMap(fb);
    };
    StrMap.prototype.map = function (f) {
        return this.mapWithKey(function (_, a) { return f(a); });
    };
    StrMap.prototype.reduce = function (b, f) {
        var out = b;
        for (var k in this.value) {
            out = f(out, this.value[k]);
        }
        return out;
    };
    return StrMap;
}());
exports.StrMap = StrMap;
var empty = new StrMap({});
var concat = function (x, y) {
    return new StrMap(Object.assign({}, x.value, y.value));
};
var concatCurried = function (x) { return function (y) { return concat(x, y); }; };
/** @function */
exports.getMonoid = function () {
    return {
        concat: concat,
        empty: empty
    };
};
var map = function (fa, f) {
    return fa.map(f);
};
var reduce = function (fa, b, f) {
    return fa.reduce(b, f);
};
function traverseWithKey(F) {
    return function (ta, f) {
        var concatA2 = Apply_1.liftA2(F)(concatCurried);
        var out = F.of(empty);
        var _loop_1 = function (k) {
            out = concatA2(out)(F.map(f(k, ta.value[k]), function (b) { return exports.singleton(k, b); }));
        };
        for (var k in ta.value) {
            _loop_1(k);
        }
        return out;
    };
}
exports.traverseWithKey = traverseWithKey;
function traverse(F) {
    return function (ta, f) { return traverseWithKey(F)(ta, function (_, a) { return f(a); }); };
}
/**
 * Test whether one dictionary contains all of the keys and values contained in another dictionary
 * @function
 */
exports.isSubdictionary = function (S) { return function (d1, d2) {
    for (var k in d1.value) {
        if (!d2.value.hasOwnProperty(k) || !S.equals(d1.value[k], d2.value[k])) {
            return false;
        }
    }
    return true;
}; };
/**
 * Calculate the number of key/value pairs in a dictionary
 * @function
 */
exports.size = function (d) {
    return Object.keys(d.value).length;
};
/**
 * Test whether a dictionary is empty
 * @function
 */
exports.isEmpty = function (d) {
    for (var k in d.value) {
        return k === null;
    }
    return true;
};
/** @function */
exports.getSetoid = function (S) {
    var isSubdictionaryS = exports.isSubdictionary(S);
    return {
        equals: function (x, y) { return isSubdictionaryS(x, y) && isSubdictionaryS(y, x); }
    };
};
/**
 * Create a dictionary with one key/value pair
 * @function
 */
exports.singleton = function (k, a) {
    return new StrMap((_a = {}, _a[k] = a, _a));
    var _a;
};
/**
 * Lookup the value for a key in a dictionary
 * @function
 */
exports.lookup = function (k) { return function (d) {
    return d.value.hasOwnProperty(k) ? Option_1.some(d.value[k]) : Option_1.none;
}; };
function fromFoldable(F) {
    return function (ta, f) {
        return F.reduce(ta, new StrMap({}), function (b, a) {
            var k = a[0];
            b.value[k] = b.value.hasOwnProperty(k) ? f(b.value[k], a[1]) : a[1];
            return b;
        });
    };
}
exports.fromFoldable = fromFoldable;
/** @function */
exports.collect = function (f) { return function (d) {
    var out = [];
    for (var k in d.value) {
        out.push(f(k, d.value[k]));
    }
    return out;
}; };
/** @function */
exports.toArray = function (d) {
    return exports.collect(function (k, a) { return function_1.tuple(k, a); })(d);
};
/**
 * Unfolds a dictionary into a list of key/value pairs
 * @function
 */
exports.toUnfoldable = function (unfoldable) { return function (d) {
    var arr = exports.toArray(d);
    var len = arr.length;
    return unfoldable.unfoldr(function (b) { return (b < len ? Option_1.some(function_1.tuple(arr[b], b + 1)) : Option_1.none); }, 0);
}; };
/**
 * Insert or replace a key/value pair in a map
 * @function
 */
exports.insert = function (k) { return function (a) { return function (d) {
    var copy = Object.assign({}, d.value);
    copy[k] = a;
    return new StrMap(copy);
}; }; };
/**
 * Delete a key and value from a map
 * @function
 */
exports.remove = function (k) { return function (d) {
    var copy = Object.assign({}, d.value);
    delete copy[k];
    return new StrMap(copy);
}; };
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 * @function
 */
exports.pop = function (k) { return function (d) {
    return exports.lookup(k)(d).fold(Option_1.none, function (a) { return Option_1.some(function_1.tuple(a, exports.remove(k)(d))); });
}; };
/** @instance */
exports.strmap = {
    URI: exports.URI,
    map: map,
    reduce: reduce,
    traverse: traverse
};
//# sourceMappingURL=StrMap.js.map