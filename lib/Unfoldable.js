"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Option_1 = require("./Option");
var Traversable_1 = require("./Traversable");
var function_1 = require("./function");
function replicate(unfoldable) {
    return function (a, n) {
        function step(n) {
            return n <= 0 ? Option_1.none : Option_1.option.of(function_1.tuple(a, n - 1));
        }
        return unfoldable.unfoldr(step, n);
    };
}
exports.replicate = replicate;
function empty(unfoldable) {
    return unfoldable.unfoldr(function_1.constant(Option_1.none), undefined);
}
exports.empty = empty;
function singleton(unfoldable) {
    return function (a) { return replicate(unfoldable)(a, 1); };
}
exports.singleton = singleton;
/**
 * Perform an Applicative action `n` times, and accumulate all the results
 * @function
 */
function replicateA(applicative, unfoldableTraversable) {
    return function (n, ma) { return Traversable_1.sequence(applicative, unfoldableTraversable)(replicate(unfoldableTraversable)(ma, n)); };
}
exports.replicateA = replicateA;
//# sourceMappingURL=Unfoldable.js.map