import { Either } from './Either';
import * as task from './Task';
import { Task } from './Task';
import { Monad2 } from './Monad';
import { Lazy } from './function';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        TaskEither: TaskEither<L, A>;
    }
}
export declare const URI = "TaskEither";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor TaskEither
 */
export declare class TaskEither<L, A> {
    readonly value: Task<Either<L, A>>;
    readonly '-A': A;
    readonly '-L': L;
    readonly '-URI': URI;
    constructor(value: Task<Either<L, A>>);
    /** Runs the inner task */
    run(): Promise<Either<L, A>>;
    map<B>(f: (a: A) => B): TaskEither<L, B>;
    ap<B>(fab: TaskEither<L, (a: A) => B>): TaskEither<L, B>;
    ap_<B, C>(this: TaskEither<L, (b: B) => C>, fb: TaskEither<L, B>): TaskEither<L, C>;
    chain<B>(f: (a: A) => TaskEither<L, B>): TaskEither<L, B>;
    fold<R>(left: (l: L) => R, right: (a: A) => R): Task<R>;
    mapLeft<M>(f: (l: L) => M): TaskEither<M, A>;
    /** Transforms the failure value of the `TaskEither` into a new `TaskEither` */
    orElse<M>(f: (l: L) => TaskEither<M, A>): TaskEither<M, A>;
}
/** @function */
export declare const right: <L, A>(fa: task.Task<A>) => TaskEither<L, A>;
/** @function */
export declare const left: <L, A>(fa: task.Task<L>) => TaskEither<L, A>;
/** @function */
export declare const fromEither: <L, A>(fa: Either<L, A>) => TaskEither<L, A>;
/** @function */
export declare const tryCatch: <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L) => TaskEither<L, A>;
/** @instance */
export declare const taskEither: Monad2<URI>;
