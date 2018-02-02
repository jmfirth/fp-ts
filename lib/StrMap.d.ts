import { HKT, URIS, URIS2, Type, Type2, Type3, URIS3 } from './HKT';
import { Monoid } from './Monoid';
import { Functor1 } from './Functor';
import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative';
import { Foldable, Foldable1, Foldable2, Foldable3 } from './Foldable';
import { Traversable1 } from './Traversable';
import { Setoid } from './Setoid';
import { Option } from './Option';
import { Unfoldable } from './Unfoldable';
declare module './HKT' {
    interface URI2HKT<A> {
        StrMap: StrMap<A>;
    }
}
export declare const URI = "StrMap";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor StrMap
 */
export declare class StrMap<A> {
    readonly value: {
        [key: string]: A;
    };
    readonly '-A': A;
    readonly '-URI': URI;
    constructor(value: {
        [key: string]: A;
    });
    mapWithKey<B>(f: (k: string, a: A) => B): StrMap<B>;
    map<B>(f: (a: A) => B): StrMap<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
}
/** @function */
export declare const getMonoid: <A = never>() => Monoid<StrMap<A>>;
/** @function */
export declare function traverseWithKey<F extends URIS3>(F: Applicative3<F>): <U, L, A, B>(ta: StrMap<A>, f: (k: string, a: A) => Type3<F, U, L, B>) => Type3<F, U, L, StrMap<B>>;
export declare function traverseWithKey<F extends URIS2>(F: Applicative2<F>): <L, A, B>(ta: StrMap<A>, f: (k: string, a: A) => Type2<F, L, B>) => Type2<F, L, StrMap<B>>;
export declare function traverseWithKey<F extends URIS>(F: Applicative1<F>): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => Type<F, B>) => Type<F, StrMap<B>>;
export declare function traverseWithKey<F>(F: Applicative<F>): <A, B>(ta: StrMap<A>, f: (k: string, a: A) => HKT<F, B>) => HKT<F, StrMap<B>>;
/**
 * Test whether one dictionary contains all of the keys and values contained in another dictionary
 * @function
 */
export declare const isSubdictionary: <A>(S: Setoid<A>) => (d1: StrMap<A>, d2: StrMap<A>) => boolean;
/**
 * Calculate the number of key/value pairs in a dictionary
 * @function
 */
export declare const size: <A>(d: StrMap<A>) => number;
/**
 * Test whether a dictionary is empty
 * @function
 */
export declare const isEmpty: <A>(d: StrMap<A>) => boolean;
/** @function */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<StrMap<A>>;
/**
 * Create a dictionary with one key/value pair
 * @function
 */
export declare const singleton: <A>(k: string, a: A) => StrMap<A>;
/**
 * Lookup the value for a key in a dictionary
 * @function
 */
export declare const lookup: (k: string) => <A>(d: StrMap<A>) => Option<A>;
/**
 * Create a dictionary from a foldable collection of key/value pairs, using the
 * specified function to combine values for duplicate keys.
 * @function
 */
export declare function fromFoldable<F extends URIS3>(F: Foldable3<F>): <U, L, A>(ta: Type3<F, U, L, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>;
export declare function fromFoldable<F extends URIS2>(F: Foldable2<F>): <L, A>(ta: Type2<F, L, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>;
export declare function fromFoldable<F extends URIS>(F: Foldable1<F>): <A>(ta: Type<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>;
export declare function fromFoldable<F>(F: Foldable<F>): <A>(ta: HKT<F, [string, A]>, f: (existing: A, a: A) => A) => StrMap<A>;
/** @function */
export declare const collect: <A, B>(f: (k: string, a: A) => B) => (d: StrMap<A>) => B[];
/** @function */
export declare const toArray: <A>(d: StrMap<A>) => [string, A][];
/**
 * Unfolds a dictionary into a list of key/value pairs
 * @function
 */
export declare const toUnfoldable: <F>(unfoldable: Unfoldable<F>) => <A>(d: StrMap<A>) => HKT<F, [string, A]>;
/**
 * Insert or replace a key/value pair in a map
 * @function
 */
export declare const insert: (k: string) => <A>(a: A) => (d: StrMap<A>) => StrMap<A>;
/**
 * Delete a key and value from a map
 * @function
 */
export declare const remove: (k: string) => <A>(d: StrMap<A>) => StrMap<A>;
/**
 * Delete a key and value from a map, returning the value as well as the subsequent map
 * @function
 */
export declare const pop: (k: string) => <A>(d: StrMap<A>) => Option<[A, StrMap<A>]>;
/** @instance */
export declare const strmap: Functor1<URI> & Foldable1<URI> & Traversable1<URI>;
