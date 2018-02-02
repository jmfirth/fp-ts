import { Monad2 } from './Monad';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        State: State<L, A>;
    }
}
export declare const URI = "State";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor State
 */
export declare class State<S, A> {
    readonly run: (s: S) => [A, S];
    readonly '-A': A;
    readonly '-L': S;
    readonly '-URI': URI;
    constructor(run: (s: S) => [A, S]);
    eval(s: S): A;
    exec(s: S): S;
    map<B>(f: (a: A) => B): State<S, B>;
    ap<B>(fab: State<S, (a: A) => B>): State<S, B>;
    ap_<B, C>(this: State<S, (b: B) => C>, fb: State<S, B>): State<S, C>;
    chain<B>(f: (a: A) => State<S, B>): State<S, B>;
}
/** @function */
export declare const get: <S>() => State<S, S>;
/** @function */
export declare const put: <S>(s: S) => State<S, undefined>;
/** @function */
export declare const modify: <S>(f: (s: S) => S) => State<S, undefined>;
/** @function */
export declare const gets: <S, A>(f: (s: S) => A) => State<S, A>;
/** @instance */
export declare const state: Monad2<URI>;
