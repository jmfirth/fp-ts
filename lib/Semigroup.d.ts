import { Ord } from './Ord';
/** @typeclass */
export interface Semigroup<A> {
    concat: (x: A, y: A) => A;
}
/** @function */
export declare const fold: <A>(S: Semigroup<A>) => (a: A) => (as: A[]) => A;
/** @function */
export declare const getFirstSemigroup: <A = never>() => Semigroup<A>;
/** @function */
export declare const getLastSemigroup: <A = never>() => Semigroup<A>;
/** @function */
export declare const getProductSemigroup: <A, B>(SA: Semigroup<A>, SB: Semigroup<B>) => Semigroup<[A, B]>;
/** @function */
export declare const getDualSemigroup: <A>(S: Semigroup<A>) => Semigroup<A>;
/** @function */
export declare const getRecordSemigroup: <O extends {
    [key: string]: any;
}>(semigroups: { [K in keyof O]: Semigroup<O[K]>; }) => Semigroup<O>;
/** @function */
export declare const getMeetSemigroup: <A>(O: Ord<A>) => Semigroup<A>;
/** @function */
export declare const getJoinSemigroup: <A>(O: Ord<A>) => Semigroup<A>;
/**
 * Boolean semigroup under conjunction
 * @instance
 */
export declare const semigroupAll: Semigroup<boolean>;
/**
 * Boolean semigroup under disjunction
 * @instance
 */
export declare const semigroupAny: Semigroup<boolean>;
/**
 * Semigroup under array concatenation
 * @function
 */
export declare const getArraySemigroup: <A = never>() => Semigroup<A[]>;
/**
 * Number Semigroup under addition
 * @instance
 */
export declare const semigroupSum: Semigroup<number>;
/**
 * Number Semigroup under multiplication
 * @instance
 */
export declare const semigroupProduct: Semigroup<number>;
/** @instance */
export declare const semigroupString: Semigroup<string>;
