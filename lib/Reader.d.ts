import { Monad2 } from './Monad';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Reader: Reader<L, A>;
    }
}
export declare const URI = "Reader";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Reader
 */
export declare class Reader<E, A> {
    readonly run: (e: E) => A;
    readonly '-A': A;
    readonly '-L': E;
    readonly '-URI': URI;
    constructor(run: (e: E) => A);
    map<B>(f: (a: A) => B): Reader<E, B>;
    ap<B>(fab: Reader<E, (a: A) => B>): Reader<E, B>;
    ap_<B, C>(this: Reader<E, (b: B) => C>, fb: Reader<E, B>): Reader<E, C>;
    chain<B>(f: (a: A) => Reader<E, B>): Reader<E, B>;
}
/**
 * reads the current context
 * @function
 */
export declare const ask: <E>() => Reader<E, E>;
/**
 * Projects a value from the global context in a Reader
 * @function
 */
export declare const asks: <E, A>(f: (e: E) => A) => Reader<E, A>;
/**
 * changes the value of the local context during the execution of the action `fa`
 * @function
 */
export declare const local: <E>(f: (e: E) => E) => <A>(fa: Reader<E, A>) => Reader<E, A>;
/** @instance */
export declare const reader: Monad2<URI>;
