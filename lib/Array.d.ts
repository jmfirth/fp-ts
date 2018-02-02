import { HKT, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT';
import { Endomorphism, Lazy, Predicate, Refinement } from './function';
import { Option } from './Option';
import { Ord } from './Ord';
import { Alternative1 } from './Alternative';
import { Applicative, Applicative1, Applicative2, Applicative3, Applicative2C, Applicative3C } from './Applicative';
import { Either } from './Either';
import { Extend1 } from './Extend';
import { Foldable1 } from './Foldable';
import { Monad1 } from './Monad';
import { Monoid } from './Monoid';
import { Plus1 } from './Plus';
import { Traversable1 } from './Traversable';
import { Unfoldable1 } from './Unfoldable';
declare global  {
    interface Array<T> {
        '-URI': URI;
        '-A': T;
    }
}
declare module './HKT' {
    interface URI2HKT<A> {
        Array: Array<A>;
    }
}
export declare const URI = "Array";
export declare type URI = typeof URI;
/** @function */
export declare const getMonoid: <A = never>() => Monoid<A[]>;
export declare function traverse<F extends URIS3, U, L>(F: Applicative3C<F, U, L>): <A, B>(ta: Array<A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Array<B>>;
export declare function traverse<F extends URIS3>(F: Applicative3<F>): <U, L, A, B>(ta: Array<A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, Array<B>>;
export declare function traverse<F extends URIS2, L>(F: Applicative2C<F, L>): <A, B>(ta: Array<A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Array<B>>;
export declare function traverse<F extends URIS2>(F: Applicative2<F>): <L, A, B>(ta: Array<A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, Array<B>>;
export declare function traverse<F extends URIS>(F: Applicative1<F>): <A, B>(ta: Array<A>, f: (a: A) => Type<F, B>) => Type<F, Array<B>>;
export declare function traverse<F>(F: Applicative<F>): <A, B>(ta: Array<A>, f: (a: A) => HKT<F, B>) => HKT<F, Array<B>>;
/** @function */
export declare const partitionMap: <A, L, R>(f: (a: A) => Either<L, R>, fa: A[]) => {
    left: L[];
    right: R[];
};
/**
 * Example
 *
 * ```ts
 * flatten([[1], [2], [3]]) // [1, 2, 3]
 * ```
 *
 * @function
 */
export declare const flatten: <A>(ffa: A[][]) => A[];
/**
 * Break an array into its first element and remaining elements
 *
 * Example
 *
 * ```ts
 * const length = <A>(xs: Array<A>): number => fold(() => 0, (head, tail) => 1 + length(tail), xs)
 * ```
 *
 * @function
 */
export declare const fold: <A, B>(nil: Lazy<B>, cons: (head: A, tail: A[]) => B, as: A[]) => B;
/**
 * Get the number of elements in an array
 * @function
 */
export declare const length: <A>(as: A[]) => number;
/**
 * Test whether an array is empty
 * @function
 */
export declare const isEmpty: <A>(as: A[]) => boolean;
/**
 * Test whether an array contains a particular index
 * @function
 */
export declare const isOutOfBound: (i: number) => <A>(as: A[]) => boolean;
/**
 * This function provides a safe way to read a value at a particular index from an array
 * @function
 */
export declare const index: (i: number) => <A>(as: A[]) => Option<A>;
/**
 * Attaches an element to the front of an array, creating a new array
 */
export declare const cons: <A>(a: A) => (as: A[]) => A[];
/**
 * Append an element to the end of an array, creating a new array
 * @function
 */
export declare const snoc: <A>(as: A[]) => (a: A) => A[];
/**
 * Get the first element in an array, or `None` if the array is empty
 * @function
 */
export declare const head: <A>(as: A[]) => Option<A>;
/**
 * Get the last element in an array, or `None` if the array is empty
 * @function
 */
export declare const last: <A>(as: A[]) => Option<A>;
/**
 * Get all but the first element of an array, creating a new array, or `None` if the array is empty
 * @function
 */
export declare const tail: <A>(as: A[]) => Option<A[]>;
/**
 * Get all but the last element of an array, creating a new array, or `None` if the array is empty
 * @function
 */
export declare const init: <A>(as: A[]) => Option<A[]>;
/**
 * Keep only a number of elements from the start of an array, creating a new array
 * @function
 */
export declare const take: (n: number) => <A>(as: A[]) => A[];
/**
 * Split an array into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 * @function
 */
export declare const span: <A>(predicate: Predicate<A>) => (as: A[]) => {
    init: A[];
    rest: A[];
};
/**
 * Calculate the longest initial subarray for which all element satisfy the
 * specified predicate, creating a new array
 * @function
 */
export declare const takeWhile: <A>(predicate: Predicate<A>) => (as: A[]) => A[];
/**
 * Drop a number of elements from the start of an array, creating a new array
 * @function
 */
export declare const drop: (n: number) => <A>(as: A[]) => A[];
/**
 * Remove the longest initial subarray for which all element satisfy the
 * specified predicate, creating a new array
 * @function
 */
export declare const dropWhile: <A>(predicate: Predicate<A>) => (as: A[]) => A[];
/**
 * Find the first index for which a predicate holds
 * @function
 */
export declare const findIndex: <A>(predicate: Predicate<A>) => (as: A[]) => Option<number>;
/**
 * Find the first element which satisfies a predicate function
 * @function
 */
export declare const findFirst: <A>(predicate: Predicate<A>) => (as: A[]) => Option<A>;
/**
 * Find the last element which satisfies a predicate function
 * @function
 */
export declare const findLast: <A>(predicate: Predicate<A>) => (as: A[]) => Option<A>;
/**
 * Filter an array, keeping the elements which satisfy a predicate function, creating a new array
 * @function
 */
export declare const filter: <A>(predicate: Predicate<A>) => (as: A[]) => A[];
/** @function */
export declare const refine: <A>(as: A[]) => <B extends A>(refinement: Refinement<A, B>) => B[];
/** @function */
export declare const copy: <A>(as: A[]) => A[];
/** @function */
export declare const unsafeInsertAt: (i: number) => <A>(a: A) => (as: A[]) => A[];
/**
 * Insert an element at the specified index, creating a new array, or
 * returning `None` if the index is out of bounds
 * @function
 */
export declare const insertAt: (i: number) => <A>(a: A) => (as: A[]) => Option<A[]>;
/** @function */
export declare const unsafeUpdateAt: (i: number) => <A>(a: A) => (as: A[]) => A[];
/**
 * Change the element at the specified index, creating a new array, or
 * returning `None` if the index is out of bounds
 * @function
 */
export declare const updateAt: (i: number) => <A>(a: A) => (as: A[]) => Option<A[]>;
/** @function */
export declare const unsafeDeleteAt: (i: number) => <A>(as: A[]) => A[];
/**
 * Delete the element at the specified index, creating a new array, or
 * returning `None` if the index is out of bounds
 * @function
 */
export declare const deleteAt: (i: number) => <A>(as: A[]) => Option<A[]>;
/**
 * Apply a function to the element at the specified index, creating a new
 * array, or returning `None` if the index is out of bounds
 * @function
 */
export declare const modifyAt: (i: number) => <A>(f: Endomorphism<A>) => (as: A[]) => Option<A[]>;
/**
 * Reverse an array, creating a new array
 * @function
 */
export declare const reverse: <A>(as: A[]) => A[];
/**
 * Apply a function to each element in an array, keeping only the results
 * which contain a value, creating a new array
 * @function
 */
export declare const mapOption: <A, B>(as: A[], f: (a: A) => Option<B>) => B[];
/**
 * Filter an array of optional values, keeping only the elements which contain
 * a value, creating a new array
 * @function
 */
export declare const catOptions: <A>(as: Option<A>[]) => A[];
/**
 * Extracts from a list of `Either` all the `Right` elements. All the `Right` elements are extracted in order
 * @function
 */
export declare const rights: <L, A>(as: Either<L, A>[]) => A[];
/**
 * Extracts from a list of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 * @function
 */
export declare const lefts: <L, A>(as: Either<L, A>[]) => L[];
/**
 * Sort the elements of an array in increasing order, creating a new array
 * @function
 */
export declare const sort: <A>(ord: Ord<A>) => (as: A[]) => A[];
/**
 * Apply a function to pairs of elements at the same index in two arrays,
 * collecting the results in a new array.
 * If one input array is short, excess elements of the longer array are discarded.
 * @function
 */
export declare const zipWith: <A, B, C>(f: (a: A, b: B) => C) => (fa: A[]) => (fb: B[]) => C[];
/**
 * Takes two arrays and returns an array of corresponding pairs.
 * If one input array is short, excess elements of the longer array are discarded
 * @function
 */
export declare const zip: <A>(fa: A[]) => <B>(fb: B[]) => [A, B][];
/**
 * Rotate an array to the right by `n` steps
 * @function
 */
export declare const rotate: (n: number) => <A>(xs: A[]) => A[];
export declare const array: Monad1<URI> & Foldable1<URI> & Unfoldable1<URI> & Traversable1<URI> & Alternative1<URI> & Plus1<URI> & Extend1<URI>;
