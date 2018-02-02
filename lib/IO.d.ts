import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
import { Monad1 } from './Monad';
import { Lazy } from './function';
declare module './HKT' {
    interface URI2HKT<A> {
        IO: IO<A>;
    }
}
export declare const URI = "IO";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor IO
 */
export declare class IO<A> {
    readonly run: Lazy<A>;
    readonly '-A': A;
    readonly '-URI': URI;
    constructor(run: Lazy<A>);
    map<B>(f: (a: A) => B): IO<B>;
    ap<B>(fab: IO<(a: A) => B>): IO<B>;
    ap_<B, C>(this: IO<(b: B) => C>, fb: IO<B>): IO<C>;
    chain<B>(f: (a: A) => IO<B>): IO<B>;
    inspect(): string;
    toString(): string;
}
/** @function */
export declare const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<IO<A>>;
/** @function */
export declare const getMonoid: <A>(M: Monoid<A>) => Monoid<IO<A>>;
/** @instance */
export declare const io: Monad1<URI>;
