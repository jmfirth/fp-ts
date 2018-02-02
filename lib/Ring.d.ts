import { Semiring } from './Semiring';
/**
 * The `Ring` class is for types that support addition, multiplication,
 * and subtraction operations.
 *
 * Instances must satisfy the following law in addition to the `Semiring`
 * laws:
 *
 * - Additive inverse: `a - a = (zero - a) + a = zero`
 * @typeclass
 */
export interface Ring<A> extends Semiring<A> {
    sub: (x: A, y: A) => A;
}
/** @function */
export declare const getFunctionRing: <A, B>(ring: Ring<B>) => Ring<(a: A) => B>;
/**
 * `negate x` can be used as a shorthand for `zero - x`
 * @function
 */
export declare const negate: <A>(ring: Ring<A>) => (a: A) => A;
/** @function */
export declare const getProductRing: <A, B>(RA: Ring<A>, RB: Ring<B>) => Ring<[A, B]>;