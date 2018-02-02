import { HKT, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT';
import { Monoid } from './Monoid';
import { Applicative, Applicative1, Applicative2, Applicative3, Applicative2C, Applicative3C } from './Applicative';
import { Predicate } from './function';
import { Ord } from './Ord';
import { Option } from './Option';
import { Semiring } from './Semiring';
import { Monad, Monad1, Monad2, Monad3, Monad2C, Monad3C } from './Monad';
import { Plus, Plus1, Plus2, Plus3, Plus2C, Plus3C } from './Plus';
import { Setoid } from './Setoid';
/** @typeclass */
export interface Foldable<F> {
    readonly URI: F;
    reduce: <A, B>(fa: HKT<F, A>, b: B, f: (b: B, a: A) => B) => B;
}
export interface Foldable1<F extends URIS> {
    readonly URI: F;
    reduce: <A, B>(fa: Type<F, A>, b: B, f: (b: B, a: A) => B) => B;
}
export interface Foldable2<F extends URIS2> {
    readonly URI: F;
    reduce: <L, A, B>(fa: Type2<F, L, A>, b: B, f: (b: B, a: A) => B) => B;
}
export interface Foldable3<F extends URIS3> {
    readonly URI: F;
    reduce: <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (b: B, a: A) => B) => B;
}
export interface Foldable2C<F extends URIS2, L> {
    readonly URI: F;
    reduce: <A, B>(fa: Type2<F, L, A>, b: B, f: (b: B, a: A) => B) => B;
}
export interface Foldable3C<F extends URIS3, U, L> {
    readonly URI: F;
    reduce: <A, B>(fa: Type3<F, U, L, A>, b: B, f: (b: B, a: A) => B) => B;
}
export interface FoldableComposition<F, G> {
    reduce: <A, B>(fga: HKT<F, HKT<G, A>>, b: B, f: (b: B, a: A) => B) => B;
}
export interface FoldableComposition11<F extends URIS, G extends URIS> {
    reduce: <A, B>(fga: Type<F, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B;
}
export interface FoldableComposition12<F extends URIS, G extends URIS2> {
    reduce: <L, A, B>(fga: Type<F, Type2<G, L, A>>, b: B, f: (b: B, a: A) => B) => B;
}
export interface FoldableComposition21<F extends URIS2, G extends URIS> {
    reduce: <L, A, B>(fga: Type2<F, L, Type<G, A>>, b: B, f: (b: B, a: A) => B) => B;
}
export interface FoldableComposition22<F extends URIS2, G extends URIS2> {
    reduce: <LF, LG, A, B>(fga: Type2<F, LF, Type2<G, LG, A>>, b: B, f: (b: B, a: A) => B) => B;
}
/** @function */
export declare function getFoldableComposition<F extends URIS2, G extends URIS2>(F: Foldable2<F>, G: Foldable2<G>): FoldableComposition22<F, G>;
export declare function getFoldableComposition<F extends URIS2, G extends URIS>(F: Foldable2<F>, G: Foldable1<G>): FoldableComposition21<F, G>;
export declare function getFoldableComposition<F extends URIS, G extends URIS2>(F: Foldable1<F>, G: Foldable2<G>): FoldableComposition12<F, G>;
export declare function getFoldableComposition<F extends URIS, G extends URIS>(F: Foldable1<F>, G: Foldable1<G>): FoldableComposition11<F, G>;
export declare function getFoldableComposition<F, G>(F: Foldable<F>, G: Foldable<G>): FoldableComposition<F, G>;
/**
 * A default implementation of `foldMap` using `foldl`
 * @function
 */
export declare function foldMap<F extends URIS3, M, U, L>(F: Foldable3C<F, U, L>, M: Monoid<M>): <A>(fa: Type3<F, U, L, A>, f: (a: A) => M) => M;
export declare function foldMap<F extends URIS3, M>(F: Foldable3<F>, M: Monoid<M>): <U, L, A>(fa: Type3<F, U, L, A>, f: (a: A) => M) => M;
export declare function foldMap<F extends URIS2, M, L>(F: Foldable2C<F, L>, M: Monoid<M>): <A>(fa: Type2<F, L, A>, f: (a: A) => M) => M;
export declare function foldMap<F extends URIS2, M>(F: Foldable2<F>, M: Monoid<M>): <L, A>(fa: Type2<F, L, A>, f: (a: A) => M) => M;
export declare function foldMap<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): <A>(fa: Type<F, A>, f: (a: A) => M) => M;
export declare function foldMap<F, M>(F: Foldable<F>, M: Monoid<M>): <A>(fa: HKT<F, A>, f: (a: A) => M) => M;
/**
 * A default implementation of `foldr` using `foldMap`
 * @function
 */
export declare function foldr<F extends URIS3, U, L>(F: Foldable3C<F, U, L>): <A, B>(fa: Type3<F, U, L, A>, b: B, f: (a: A) => (b: B) => B) => B;
export declare function foldr<F extends URIS3>(F: Foldable3<F>): <U, L, A, B>(fa: Type3<F, U, L, A>, b: B, f: (a: A) => (b: B) => B) => B;
export declare function foldr<F extends URIS2, L>(F: Foldable2C<F, L>): <A, B>(fa: Type2<F, L, A>, b: B, f: (a: A) => (b: B) => B) => B;
export declare function foldr<F extends URIS2>(F: Foldable2<F>): <L, A, B>(fa: Type2<F, L, A>, b: B, f: (a: A) => (b: B) => B) => B;
export declare function foldr<F extends URIS>(F: Foldable1<F>): <A, B>(fa: Type<F, A>, b: B, f: (a: A) => (b: B) => B) => B;
export declare function foldr<F>(F: Foldable<F>): <A, B>(fa: HKT<F, A>, b: B, f: (a: A) => (b: B) => B) => B;
/** @function */
export declare function fold<F extends URIS3, M, U, L>(F: Foldable3C<F, U, L>, M: Monoid<M>): (fa: Type3<F, U, L, M>) => M;
export declare function fold<F extends URIS3, M>(F: Foldable3<F>, M: Monoid<M>): <U, L>(fa: Type3<F, U, L, M>) => M;
export declare function fold<F extends URIS2, M, L>(F: Foldable2C<F, L>, M: Monoid<M>): (fa: Type2<F, L, M>) => M;
export declare function fold<F extends URIS2, M>(F: Foldable2<F>, M: Monoid<M>): <L>(fa: Type2<F, L, M>) => M;
export declare function fold<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): (fa: Type<F, M>) => M;
export declare function fold<F, M>(F: Foldable<F>, M: Monoid<M>): (fa: HKT<F, M>) => M;
/**
 * Similar to 'reduce', but the result is encapsulated in a monad.
 *
 * Note: this function is not generally stack-safe, e.g., for monads which
 * build up thunks a la `IO`.
 */
export declare function foldM<F extends URIS, M extends URIS3, U, L>(F: Foldable1<F>, M: Monad3C<M, U, L>): <A, B>(f: (b: B, a: A) => Type3<M, U, L, B>, b: B, fa: Type<F, A>) => Type3<M, U, L, B>;
export declare function foldM<F extends URIS, M extends URIS3>(F: Foldable1<F>, M: Monad3<M>): <U, L, A, B>(f: (b: B, a: A) => Type3<M, U, L, B>, b: B, fa: Type<F, A>) => Type3<M, U, L, B>;
export declare function foldM<F extends URIS, M extends URIS2, L>(F: Foldable1<F>, M: Monad2C<M, L>): <A, B>(f: (b: B, a: A) => Type2<M, L, B>, b: B, fa: Type<F, A>) => Type2<M, L, B>;
export declare function foldM<F extends URIS, M extends URIS2>(F: Foldable1<F>, M: Monad2<M>): <L, A, B>(f: (b: B, a: A) => Type2<M, L, B>, b: B, fa: Type<F, A>) => Type2<M, L, B>;
export declare function foldM<F extends URIS, M extends URIS>(F: Foldable1<F>, M: Monad1<M>): <A, B>(f: (b: B, a: A) => Type<M, B>, b: B, fa: Type<F, A>) => Type<M, B>;
export declare function foldM<F, M>(F: Foldable<F>, M: Monad<M>): <A, B>(f: (b: B, a: A) => HKT<M, B>, b: B, fa: HKT<F, A>) => HKT<M, B>;
/**
 * Traverse a data structure, performing some effects encoded by an `Applicative` functor at each value, ignoring the final result.
 */
export declare function traverse_<M extends URIS3, F extends URIS, U, L>(M: Applicative3C<M, U, L>, F: Foldable1<F>): <A, B>(f: (a: A) => Type3<M, U, L, B>, fa: Type<F, A>) => Type3<M, U, L, void>;
export declare function traverse_<M extends URIS3, F extends URIS>(M: Applicative3<M>, F: Foldable1<F>): <U, L, A, B>(f: (a: A) => Type3<M, U, L, B>, fa: Type<F, A>) => Type3<M, U, L, void>;
export declare function traverse_<M extends URIS2, F extends URIS, L>(M: Applicative2C<M, L>, F: Foldable1<F>): <A, B>(f: (a: A) => Type2<M, L, B>, fa: Type<F, A>) => Type2<M, L, void>;
export declare function traverse_<M extends URIS2, F extends URIS>(M: Applicative2<M>, F: Foldable1<F>): <L, A, B>(f: (a: A) => Type2<M, L, B>, fa: Type<F, A>) => Type2<M, L, void>;
export declare function traverse_<M extends URIS, F extends URIS>(M: Applicative1<M>, F: Foldable1<F>): <A, B>(f: (a: A) => Type<M, B>, fa: Type<F, A>) => Type<M, void>;
export declare function traverse_<M, F>(M: Applicative<M>, F: Foldable<F>): <A, B>(f: (a: A) => HKT<M, B>, fa: HKT<F, A>) => HKT<M, void>;
/**
 * Perform all of the effects in some data structure in the order given by the `Foldable` instance, ignoring the final result.
 */
export declare function sequence_<M extends URIS3, F extends URIS, U, L>(M: Applicative3C<M, U, L>, F: Foldable1<F>): <A>(fa: Type<F, Type3<M, U, L, A>>) => Type3<M, U, L, void>;
export declare function sequence_<M extends URIS3, F extends URIS>(M: Applicative3<M>, F: Foldable1<F>): <U, L, A>(fa: Type<F, Type3<M, U, L, A>>) => Type3<M, U, L, void>;
export declare function sequence_<M extends URIS2, F extends URIS, L>(M: Applicative2C<M, L>, F: Foldable1<F>): <A>(fa: Type<F, Type2<M, L, A>>) => Type2<M, L, void>;
export declare function sequence_<M extends URIS2, F extends URIS>(M: Applicative2<M>, F: Foldable1<F>): <L, A>(fa: Type<F, Type2<M, L, A>>) => Type2<M, L, void>;
export declare function sequence_<M extends URIS, F extends URIS>(M: Applicative1<M>, F: Foldable1<F>): <A>(fa: Type<F, Type<M, A>>) => Type<M, void>;
export declare function sequence_<M, F>(M: Applicative<M>, F: Foldable<F>): <A>(fa: HKT<F, HKT<M, A>>) => HKT<M, void>;
/**
 * Combines a collection of elements using the `Alt` operation
 */
export declare function oneOf<F extends URIS, P extends URIS3, U, L>(F: Foldable1<F>, P: Plus3C<P, U, L>): <A>(fga: Type<F, Type3<P, U, L, A>>) => Type3<P, U, L, A>;
export declare function oneOf<F extends URIS, P extends URIS3>(F: Foldable1<F>, P: Plus3<P>): <U, L, A>(fga: Type<F, Type3<P, U, L, A>>) => Type3<P, U, L, A>;
export declare function oneOf<F extends URIS, P extends URIS2, L>(F: Foldable1<F>, P: Plus2C<P, L>): <A>(fga: Type<F, Type2<P, L, A>>) => Type2<P, L, A>;
export declare function oneOf<F extends URIS, P extends URIS2>(F: Foldable1<F>, P: Plus2<P>): <L, A>(fga: Type<F, Type2<P, L, A>>) => Type2<P, L, A>;
export declare function oneOf<F extends URIS, P extends URIS>(F: Foldable1<F>, P: Plus1<P>): <A>(fga: Type<F, Type<P, A>>) => Type<P, A>;
export declare function oneOf<F, P>(F: Foldable<F>, P: Plus<P>): <A>(fga: HKT<F, HKT<P, A>>) => HKT<P, A>;
/**
 * Fold a data structure, accumulating values in some `Monoid`, combining adjacent elements using the specified separator
 * @function
 */
export declare function intercalate<F extends URIS3, M, U, L>(F: Foldable3C<F, U, L>, M: Monoid<M>): (sep: M) => (fm: Type3<F, U, L, M>) => M;
export declare function intercalate<F extends URIS3, M>(F: Foldable3<F>, M: Monoid<M>): (sep: M) => <U, L>(fm: Type3<F, U, L, M>) => M;
export declare function intercalate<F extends URIS2, M, L>(F: Foldable2C<F, L>, M: Monoid<M>): (sep: M) => (fm: Type2<F, L, M>) => M;
export declare function intercalate<F extends URIS2, M>(F: Foldable2<F>, M: Monoid<M>): (sep: M) => <L>(fm: Type2<F, L, M>) => M;
export declare function intercalate<F extends URIS, M>(F: Foldable1<F>, M: Monoid<M>): (sep: M) => (fm: Type<F, M>) => M;
export declare function intercalate<F, M>(F: Foldable<F>, M: Monoid<M>): (sep: M) => (fm: HKT<F, M>) => M;
/**
 * Find the sum of the numeric values in a data structure
 * @function
 */
export declare function sum<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, S: Semiring<A>): (fa: Type3<F, U, L, A>) => A;
export declare function sum<F extends URIS3, A>(F: Foldable3<F>, S: Semiring<A>): <U, L>(fa: Type3<F, U, L, A>) => A;
export declare function sum<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Semiring<A>): (fa: Type2<F, L, A>) => A;
export declare function sum<F extends URIS2, A>(F: Foldable2<F>, S: Semiring<A>): <L>(fa: Type2<F, L, A>) => A;
export declare function sum<F extends URIS, A>(F: Foldable1<F>, S: Semiring<A>): (fa: Type<F, A>) => A;
export declare function sum<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A;
/**
 * Find the product of the numeric values in a data structure
 * @function
 */
export declare function product<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, S: Semiring<A>): (fa: Type3<F, U, L, A>) => A;
export declare function product<F extends URIS3, A>(F: Foldable3<F>, S: Semiring<A>): <U, L>(fa: Type3<F, U, L, A>) => A;
export declare function product<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Semiring<A>): (fa: Type2<F, L, A>) => A;
export declare function product<F extends URIS2, A>(F: Foldable2<F>, S: Semiring<A>): <L>(fa: Type2<F, L, A>) => A;
export declare function product<F extends URIS, A>(F: Foldable1<F>, S: Semiring<A>): (fa: Type<F, A>) => A;
export declare function product<F, A>(F: Foldable<F>, S: Semiring<A>): (fa: HKT<F, A>) => A;
/**
 * Test whether a value is an element of a data structure
 * @function
 */
export declare function elem<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, S: Setoid<A>): (a: A, fa: Type3<F, U, L, A>) => boolean;
export declare function elem<F extends URIS3, A>(F: Foldable3<F>, S: Setoid<A>): <U, L>(a: A, fa: Type3<F, U, L, A>) => boolean;
export declare function elem<F extends URIS2, A, L>(F: Foldable2C<F, L>, S: Setoid<A>): (a: A, fa: Type2<F, L, A>) => boolean;
export declare function elem<F extends URIS2, A>(F: Foldable2<F>, S: Setoid<A>): <L>(a: A, fa: Type2<F, L, A>) => boolean;
export declare function elem<F extends URIS, A>(F: Foldable1<F>, S: Setoid<A>): (a: A, fa: Type<F, A>) => boolean;
export declare function elem<F, A>(F: Foldable<F>, S: Setoid<A>): (a: A, fa: HKT<F, A>) => boolean;
/**
 * Try to find an element in a data structure which satisfies a predicate
 * @function
 */
export declare function find<F extends URIS3, U, L>(F: Foldable3C<F, U, L>): <A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Option<A>;
export declare function find<F extends URIS3>(F: Foldable3<F>): <U, L, A>(fa: Type3<F, U, L, A>, p: Predicate<A>) => Option<A>;
export declare function find<F extends URIS2, L>(F: Foldable2C<F, L>): <A>(fa: Type2<F, L, A>, p: Predicate<A>) => Option<A>;
export declare function find<F extends URIS2>(F: Foldable2<F>): <L, A>(fa: Type2<F, L, A>, p: Predicate<A>) => Option<A>;
export declare function find<F extends URIS>(F: Foldable1<F>): <A>(fa: Type<F, A>, p: Predicate<A>) => Option<A>;
export declare function find<F>(F: Foldable<F>): <A>(fa: HKT<F, A>, p: Predicate<A>) => Option<A>;
/**
 * Find the smallest element of a structure, according to its `Ord` instance
 * @function
 */
export declare function minimum<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, O: Ord<A>): (fa: Type3<F, U, L, A>) => Option<A>;
export declare function minimum<F extends URIS3, A>(F: Foldable3<F>, O: Ord<A>): <U, L>(fa: Type3<F, U, L, A>) => Option<A>;
export declare function minimum<F extends URIS2, A, L>(F: Foldable2C<F, L>, O: Ord<A>): (fa: Type2<F, L, A>) => Option<A>;
export declare function minimum<F extends URIS2, A>(F: Foldable2<F>, O: Ord<A>): <L>(fa: Type2<F, L, A>) => Option<A>;
export declare function minimum<F extends URIS, A>(F: Foldable1<F>, O: Ord<A>): (fa: Type<F, A>) => Option<A>;
export declare function minimum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>;
/**
 * Find the largest element of a structure, according to its `Ord` instance
 * @function
 */
export declare function maximum<F extends URIS3, A, U, L>(F: Foldable3C<F, U, L>, O: Ord<A>): (fa: Type3<F, U, L, A>) => Option<A>;
export declare function maximum<F extends URIS3, A>(F: Foldable3<F>, O: Ord<A>): <U, L>(fa: Type3<F, U, L, A>) => Option<A>;
export declare function maximum<F extends URIS2, A, L>(F: Foldable2C<F, L>, O: Ord<A>): (fa: Type2<F, L, A>) => Option<A>;
export declare function maximum<F extends URIS2, A>(F: Foldable2<F>, O: Ord<A>): <L>(fa: Type2<F, L, A>) => Option<A>;
export declare function maximum<F extends URIS, A>(F: Foldable1<F>, O: Ord<A>): (fa: Type<F, A>) => Option<A>;
export declare function maximum<F, A>(F: Foldable<F>, O: Ord<A>): (fa: HKT<F, A>) => Option<A>;
/** @function */
export declare function toArray<F extends URIS3, U, L>(F: Foldable3C<F, U, L>): <A>(fa: Type3<F, U, L, A>) => Array<A>;
export declare function toArray<F extends URIS3>(F: Foldable3<F>): <U, L, A>(fa: Type3<F, U, L, A>) => Array<A>;
export declare function toArray<F extends URIS2, L>(F: Foldable2C<F, L>): <A>(fa: Type2<F, L, A>) => Array<A>;
export declare function toArray<F extends URIS2>(F: Foldable2<F>): <L, A>(fa: Type2<F, L, A>) => Array<A>;
export declare function toArray<F extends URIS>(F: Foldable1<F>): <A>(fa: Type<F, A>) => Array<A>;
export declare function toArray<F>(F: Foldable<F>): <A>(fa: HKT<F, A>) => Array<A>;