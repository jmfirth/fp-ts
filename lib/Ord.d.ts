import { Ordering } from './Ordering';
import { Setoid } from './Setoid';
import { Semigroup } from './Semigroup';
/** @typeclass */
export interface Ord<A> extends Setoid<A> {
    compare: (x: A, y: A) => Ordering;
}
/** @function */
export declare const toNativeComparator: <A>(compare: (x: A, y: A) => Ordering) => (x: A, y: A) => number;
/** @function */
export declare const unsafeCompare: (x: any, y: any) => Ordering;
/** @instance */
export declare const ordString: Ord<string>;
/** @instance */
export declare const ordNumber: Ord<number>;
/** @instance */
export declare const ordBoolean: Ord<boolean>;
/**
 * Test whether one value is _strictly less than_ another
 * @function
 */
export declare const lessThan: <A>(ord: Ord<A>) => (x: A) => (y: A) => boolean;
/**
 * Test whether one value is _strictly greater than_ another
 * @function
 */
export declare const greaterThan: <A>(ord: Ord<A>) => (x: A) => (y: A) => boolean;
/**
 * Test whether one value is _non-strictly less than_ another
 * @function
 */
export declare const lessThanOrEq: <A>(ord: Ord<A>) => (x: A) => (y: A) => boolean;
/**
 * Test whether one value is _non-strictly greater than_ another
 * @function
 */
export declare const greaterThanOrEq: <A>(ord: Ord<A>) => (x: A) => (y: A) => boolean;
/**
 * Take the minimum of two values. If they are considered equal, the first argument is chosen
 * @function
 */
export declare const min: <A>(ord: Ord<A>) => (x: A, y: A) => A;
/**
 * Take the maximum of two values. If they are considered equal, the first argument is chosen
 * @function
 */
export declare const max: <A>(ord: Ord<A>) => (x: A, y: A) => A;
/**
 * Clamp a value between a minimum and a maximum
 * @function
 */
export declare const clamp: <A>(O: Ord<A>) => (low: A, hi: A) => (x: A) => A;
/**
 * Test whether a value is between a minimum and a maximum (inclusive)
 * @function
 */
export declare const between: <A>(ord: Ord<A>) => (low: A) => (hi: A) => (x: A) => boolean;
/** @function */
export declare const fromCompare: <A>(compare: (x: A, y: A) => Ordering) => Ord<A>;
/** @function */
export declare const contramap: <A, B>(f: (b: B) => A, fa: Ord<A>) => Ord<B>;
/** @function */
export declare const getSemigroup: <A = never>() => Semigroup<Ord<A>>;
/** @function */
export declare const getProductOrd: <A, B>(OA: Ord<A>, OB: Ord<B>) => Ord<[A, B]>;
