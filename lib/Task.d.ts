import { Monoid } from './Monoid';
import { Monad1 } from './Monad';
import { Lazy } from './function';
import { Either } from './Either';
import { IO } from './IO';
declare module './HKT' {
    interface URI2HKT<A> {
        Task: Task<A>;
    }
}
export declare const URI = "Task";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Task
 */
export declare class Task<A> {
    readonly run: Lazy<Promise<A>>;
    readonly '-A': A;
    readonly '-URI': URI;
    constructor(run: Lazy<Promise<A>>);
    map<B>(f: (a: A) => B): Task<B>;
    ap<B>(fab: Task<(a: A) => B>): Task<B>;
    ap_<B, C>(this: Task<(b: B) => C>, fb: Task<B>): Task<C>;
    chain<B>(f: (a: A) => Task<B>): Task<B>;
    /** Selects the earlier of two Tasks */
    concat(fy: Task<A>): Task<A>;
    inspect(): string;
    toString(): string;
}
/** @function */
export declare const getMonoid: <A = never>() => Monoid<Task<A>>;
/** @function */
export declare const tryCatch: <L, A>(f: Lazy<Promise<A>>, onrejected: (reason: {}) => L) => Task<Either<L, A>>;
/**
 * Lifts an IO action into a Task
 * @function
 */
export declare const fromIO: <A>(io: IO<A>) => Task<A>;
/** @instance */
export declare const task: Monad1<URI>;
