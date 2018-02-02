"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var function_1 = require("./function");
var Either_1 = require("./Either");
exports.URI = 'Task';
/**
 * @data
 * @constructor Task
 */
var Task = /** @class */ (function () {
    function Task(run) {
        this.run = run;
    }
    Task.prototype.map = function (f) {
        var _this = this;
        return new Task(function () { return _this.run().then(f); });
    };
    Task.prototype.ap = function (fab) {
        var _this = this;
        return new Task(function () { return Promise.all([fab.run(), _this.run()]).then(function (_a) {
            var f = _a[0], a = _a[1];
            return f(a);
        }); });
    };
    Task.prototype.ap_ = function (fb) {
        return fb.ap(this);
    };
    Task.prototype.chain = function (f) {
        var _this = this;
        return new Task(function () { return _this.run().then(function (a) { return f(a).run(); }); });
    };
    /** Selects the earlier of two Tasks */
    Task.prototype.concat = function (fy) {
        var _this = this;
        return new Task(function () {
            return new Promise(function (r) {
                var running = true;
                var resolve = function (a) {
                    if (running) {
                        running = false;
                        r(a);
                    }
                };
                _this.run().then(resolve);
                fy.run().then(resolve);
            });
        });
    };
    Task.prototype.inspect = function () {
        return this.toString();
    };
    Task.prototype.toString = function () {
        return "new Task(" + function_1.toString(this.run) + ")";
    };
    return Task;
}());
exports.Task = Task;
var map = function (fa, f) {
    return fa.map(f);
};
var of = function (a) {
    return new Task(function () { return Promise.resolve(a); });
};
var ap = function (fab, fa) {
    return fa.ap(fab);
};
var chain = function (fa, f) {
    return fa.chain(f);
};
/** @function */
exports.getMonoid = function () {
    return {
        concat: function (x, y) { return x.concat(y); },
        empty: never
    };
};
var never = new Task(function () { return new Promise(function (resolve) { return undefined; }); });
/** @function */
exports.tryCatch = function (f, onrejected) {
    return new Task(function () { return f().then(function (a) { return Either_1.right(a); }, function (reason) { return Either_1.left(onrejected(reason)); }); });
};
/**
 * Lifts an IO action into a Task
 * @function
 */
exports.fromIO = function (io) {
    return new Task(function () { return Promise.resolve(io.run()); });
};
/** @instance */
exports.task = {
    URI: exports.URI,
    map: map,
    of: of,
    ap: ap,
    chain: chain
};
//# sourceMappingURL=Task.js.map