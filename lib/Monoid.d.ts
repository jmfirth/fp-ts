import { Semigroup } from './Semigroup';
import { Endomorphism } from './function';
/** @typeclass */
export interface Monoid<A> extends Semigroup<A> {
    empty: A;
}
/** @function */
export declare const fold: <A>(M: Monoid<A>) => (as: A[]) => A;
/** @function */
export declare const getProductMonoid: <A, B>(MA: Monoid<A>, MB: Monoid<B>) => Monoid<[A, B]>;
/** @function */
export declare const getDualMonoid: <A>(M: Monoid<A>) => Monoid<A>;
/**
 * Boolean monoid under conjunction
 * @instance
 */
export declare const monoidAll: Monoid<boolean>;
/**
 * Boolean monoid under disjunction
 * @instance
 */
export declare const monoidAny: Monoid<boolean>;
/** @instance */
export declare const unsafeMonoidArray: Monoid<Array<any>>;
/**
 * Monoid under array concatenation (`Array<any>`)
 * @instance
 */
export declare const getArrayMonoid: <A = never>() => Monoid<A[]>;
/**
 * Number monoid under addition
 * @instance
 */
export declare const monoidSum: Monoid<number>;
/**
 * Number monoid under multiplication
 * @instance
 */
export declare const monoidProduct: Monoid<number>;
/** @instance */
export declare const monoidString: Monoid<string>;
/** @function */
export declare const getFunctionMonoid: <M>(monoid: Monoid<M>) => <A = never>() => Monoid<(a: A) => M>;
/** @function */
export declare const getEndomorphismMonoid: <A = never>() => Monoid<Endomorphism<A>>;
/** @function */
export declare const getRecordMonoid: <O extends {
    [key: string]: any;
}>(monoids: { [K in keyof O]: Monoid<O[K]>; }) => Monoid<O>;
