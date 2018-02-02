import { HKT, URIS, Type, URIS2, Type2, URIS3, Type3 } from './HKT';
import { Applicative1, Applicative2, Applicative3, Applicative2C, Applicative3C } from './Applicative';
import { Traversable1 } from './Traversable';
import { Option } from './Option';
/**
 * This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.
 * @typeclass
 */
export interface Unfoldable<F> {
    readonly URI: F;
    unfoldr: <A, B>(f: (b: B) => Option<[A, B]>, b: B) => HKT<F, A>;
}
export interface Unfoldable1<F extends URIS> {
    readonly URI: F;
    unfoldr: <A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type<F, A>;
}
export interface Unfoldable2<F extends URIS2> {
    readonly URI: F;
    unfoldr: <L, A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type2<F, L, A>;
}
export interface Unfoldable3<F extends URIS3> {
    readonly URI: F;
    unfoldr: <U, L, A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type3<F, U, L, A>;
}
export interface Unfoldable2C<F extends URIS2, L> {
    readonly URI: F;
    unfoldr: <A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type2<F, L, A>;
}
export interface Unfoldable3C<F extends URIS3, U, L> {
    readonly URI: F;
    unfoldr: <A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type3<F, U, L, A>;
}
/**
 * Replicate a value some natural number of times.
 * @function
 */
export declare function replicate<F extends URIS3, U, L>(unfoldable: Unfoldable3C<F, U, L>): <A>(a: A, n: number) => Type3<F, U, L, A>;
export declare function replicate<F extends URIS3>(unfoldable: Unfoldable3<F>): <U, L, A>(a: A, n: number) => Type3<F, U, L, A>;
export declare function replicate<F extends URIS2, L>(unfoldable: Unfoldable2C<F, L>): <A>(a: A, n: number) => Type2<F, L, A>;
export declare function replicate<F extends URIS2>(unfoldable: Unfoldable2<F>): <L, A>(a: A, n: number) => Type2<F, L, A>;
export declare function replicate<F extends URIS>(unfoldable: Unfoldable<F>): <A>(a: A, n: number) => Type<F, A>;
export declare function replicate<F>(unfoldable: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A>;
/**
 * The container with no elements - unfolded with zero iterations.
 * @function
 */
export declare function empty<F extends URIS3, U, L, A>(unfoldable: Unfoldable3<F>): Type3<F, U, L, A>;
export declare function empty<F extends URIS2, L, A>(unfoldable: Unfoldable2<F>): Type2<F, L, A>;
export declare function empty<F extends URIS, A>(unfoldable: Unfoldable1<F>): Type<F, A>;
export declare function empty<F, A>(unfoldable: Unfoldable<F>): HKT<F, A>;
/** @function */
export declare function singleton<F extends URIS3, U, L>(unfoldable: Unfoldable3C<F, U, L>): <A>(a: A) => Type3<F, U, L, A>;
export declare function singleton<F extends URIS3>(unfoldable: Unfoldable3<F>): <U, L, A>(a: A) => Type3<F, U, L, A>;
export declare function singleton<F extends URIS2, L>(unfoldable: Unfoldable2C<F, L>): <A>(a: A) => Type2<F, L, A>;
export declare function singleton<F extends URIS2>(unfoldable: Unfoldable2<F>): <L, A>(a: A) => Type2<F, L, A>;
export declare function singleton<F extends URIS>(unfoldable: Unfoldable1<F>): <A>(a: A) => Type<F, A>;
export declare function singleton<F>(unfoldable: Unfoldable<F>): <A>(a: A) => HKT<F, A>;
/** Perform an Applicative action `n` times, and accumulate all the results */
export declare function replicateA<F extends URIS3, T extends URIS, U, L>(applicative: Applicative3C<F, U, L>, unfoldableTraversable: Unfoldable1<T> & Traversable1<T>): <A>(n: number, ma: Type3<F, U, L, A>) => Type3<F, U, L, HKT<T, A>>;
export declare function replicateA<F extends URIS3, T extends URIS>(applicative: Applicative3<F>, unfoldableTraversable: Unfoldable1<T> & Traversable1<T>): <U, L, A>(n: number, ma: Type3<F, U, L, A>) => Type3<F, U, L, HKT<T, A>>;
export declare function replicateA<F extends URIS2, T extends URIS, L>(applicative: Applicative2C<F, L>, unfoldableTraversable: Unfoldable1<T> & Traversable1<T>): <A>(n: number, ma: Type2<F, L, A>) => Type2<F, L, HKT<T, A>>;
export declare function replicateA<F extends URIS2, T extends URIS>(applicative: Applicative2<F>, unfoldableTraversable: Unfoldable1<T> & Traversable1<T>): <L, A>(n: number, ma: Type2<F, L, A>) => Type2<F, L, HKT<T, A>>;
export declare function replicateA<F extends URIS, T extends URIS>(applicative: Applicative1<F>, unfoldableTraversable: Unfoldable1<T> & Traversable1<T>): <A>(n: number, ma: Type<F, A>) => Type<F, HKT<T, A>>;
