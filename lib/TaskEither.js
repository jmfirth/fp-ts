"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var eitherT = require("./EitherT");
var task = require("./Task");
var eitherTTask = eitherT.getEitherT(task.task);
exports.URI = 'TaskEither';
var eitherTfold = eitherT.fold(task.task);
var eitherTmapLeft = eitherT.mapLeft(task.task);
/**
 * @data
 * @constructor TaskEither
 */
var TaskEither = /** @class */ (function () {
    function TaskEither(value) {
        this.value = value;
    }
    /** Runs the inner task */
    TaskEither.prototype.run = function () {
        return this.value.run();
    };
    TaskEither.prototype.map = function (f) {
        return new TaskEither(eitherTTask.map(this.value, f));
    };
    TaskEither.prototype.ap = function (fab) {
        return new TaskEither(eitherTTask.ap(fab.value, this.value));
    };
    TaskEither.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    TaskEither.prototype.chain = function (f) {
        return new TaskEither(eitherTTask.chain(function (a) { return f(a).value; }, this.value));
    };
    TaskEither.prototype.fold = function (left, right) {
        return eitherTfold(left, right, this.value);
    };
    TaskEither.prototype.mapLeft = function (f) {
        return new TaskEither(eitherTmapLeft(f)(this.value));
    };
    /** Transforms the failure value of the `TaskEither` into a new `TaskEither` */
    TaskEither.prototype.orElse = function (f) {
        return new TaskEither(this.value.chain(function (e) { return e.fold(function (l) { return f(l).value; }, function (a) { return eitherTTask.of(a); }); }));
    };
    return TaskEither;
}());
exports.TaskEither = TaskEither;
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new TaskEither(eitherTTask.of(a));
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var chain = function (fa, f) {
    return fa.chain(f);
};
var eitherTright = eitherT.right(task.task);
/** @function */
exports.right = function (fa) {
    return new TaskEither(eitherTright(fa));
};
var eitherTleft = eitherT.left(task.task);
/** @function */
exports.left = function (fa) {
    return new TaskEither(eitherTleft(fa));
};
var eitherTfromEither = eitherT.fromEither(task.task);
/** @function */
exports.fromEither = function (fa) {
    return new TaskEither(eitherTfromEither(fa));
};
/** @function */
exports.tryCatch = function (f, onrejected) {
    return new TaskEither(task.tryCatch(f, onrejected));
};
/** @instance */
exports.taskEither = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain
};
//# sourceMappingURL=TaskEither.js.map