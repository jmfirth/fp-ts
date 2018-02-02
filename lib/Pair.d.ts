import { Endomorphism } from './function';
import { Setoid } from './Setoid';
import { Ord } from './Ord';
import { Applicative1 } from './Applicative';
import { Semigroup } from './Semigroup';
import { Monoid } from './Monoid';
import { Foldable1 } from './Foldable';
import { Traversable1 } from './Traversable';
import { Comonad1 } from './Comonad';
declare module './HKT' {
    interface URI2HKT<A> {
        Pair: Pair<A>;
    }
}
export declare const URI = "Pair";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Pair
 */
export declare class Pair<A> {
    readonly fst: A;
    readonly snd: A;
    readonly '-A': A;
    readonly '-URI': URI;
    constructor(fst: A, snd: A);
    /** Map a function over the first field of a pair */
    first(f: Endomorphism<A>): Pair<A>;
    /** Map a function over the second field of a pair */
    second(f: Endomorphism<A>): Pair<A>;
    /** Swaps the elements in a pair */
    swap(): Pair<A>;
    map<B>(f: (a: A) => B): Pair<B>;
    ap<B>(fab: Pair<(a: A) => B>): Pair<B>;
    ap_<B, C>(this: Pair<(b: B) => C>, fb: Pair<B>): Pair<C>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    extract(): A;
    extend<B>(f: (fb: Pair<A>) => B): Pair<B>;
}
/** @function */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<Pair<A>>;
/** @function */
export declare const getOrd: <A>(O: Ord<A>) => Ord<Pair<A>>;
/** @function */
export declare const getSemigroup: <A>(S: Semigroup<A>) => Semigroup<Pair<A>>;
/** @function */
export declare const getMonoid: <A>(M: Monoid<A>) => Monoid<Pair<A>>;
/** @instance */
export declare const pair: Applicative1<URI> & Foldable1<URI> & Traversable1<URI> & Comonad1<URI>;
