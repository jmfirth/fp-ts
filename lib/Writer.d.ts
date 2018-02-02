import { Monoid } from './Monoid';
import { Functor2 } from './Functor';
import { Monad2C } from './Monad';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Writer: Writer<L, A>;
    }
}
export declare const URI = "Writer";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Writer
 */
export declare class Writer<W, A> {
    readonly run: () => [A, W];
    readonly '-A': A;
    readonly '-L': W;
    readonly '-URI': URI;
    constructor(run: () => [A, W]);
    eval(): A;
    exec(): W;
    map<B>(f: (a: A) => B): Writer<W, B>;
}
/** @function */
export declare const tell: <W>(w: W) => Writer<W, void>;
/** @function */
export declare const getMonad: <W>(M: Monoid<W>) => Monad2C<"Writer", W>;
/** @instance */
export declare const writer: Functor2<URI>;
