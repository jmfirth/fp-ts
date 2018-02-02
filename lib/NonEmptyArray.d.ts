import { Monad1 } from './Monad';
import { Comonad1 } from './Comonad';
import { Semigroup } from './Semigroup';
import { Foldable1 } from './Foldable';
import { Traversable1 } from './Traversable';
import { Option } from './Option';
declare module './HKT' {
    interface URI2HKT<A> {
        NonEmptyArray: NonEmptyArray<A>;
    }
}
export declare const URI = "NonEmptyArray";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor NonEmptyArray
 */
export declare class NonEmptyArray<A> {
    readonly head: A;
    readonly tail: Array<A>;
    readonly '-A': A;
    readonly '-URI': URI;
    constructor(head: A, tail: Array<A>);
    toArray(): Array<A>;
    concatArray(as: Array<A>): NonEmptyArray<A>;
    map<B>(f: (a: A) => B): NonEmptyArray<B>;
    ap<B>(fab: NonEmptyArray<(a: A) => B>): NonEmptyArray<B>;
    ap_<B, C>(this: NonEmptyArray<(b: B) => C>, fb: NonEmptyArray<B>): NonEmptyArray<C>;
    chain<B>(f: (a: A) => NonEmptyArray<B>): NonEmptyArray<B>;
    concat(y: NonEmptyArray<A>): NonEmptyArray<A>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    extend<B>(f: (fa: NonEmptyArray<A>) => B): NonEmptyArray<B>;
    extract(): A;
    inspect(): string;
    toString(): string;
}
/** @function */
export declare const fromArray: <A>(as: A[]) => Option<NonEmptyArray<A>>;
/** @function */
export declare const getSemigroup: <A = never>() => Semigroup<NonEmptyArray<A>>;
/** @instance */
export declare const nonEmptyArray: Monad1<URI> & Comonad1<URI> & Foldable1<URI> & Traversable1<URI>;
