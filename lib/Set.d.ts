import { Setoid } from './Setoid';
import { Predicate } from './function';
import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
import { Ord } from './Ord';
/** @function */
export declare const toArray: <A>(O: Ord<A>) => (x: Set<A>) => A[];
/** @function */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<Set<A>>;
/** @function */
export declare const some: <A>(predicate: Predicate<A>) => (x: Set<A>) => boolean;
/** @function */
export declare const every: <A>(predicate: Predicate<A>) => (x: Set<A>) => boolean;
/**
 * `true` if and only if every element in the first set
 * is an element of the second set
 * @function
 */
export declare const subset: <A>(S: Setoid<A>) => (x: Set<A>) => (y: Set<A>) => boolean;
/** @function */
export declare const filter: <A>(predicate: Predicate<A>) => (x: Set<A>) => Set<A>;
/**
 * Test if a value is a member of a set
 * @function
 */
export declare const member: <A>(S: Setoid<A>) => (x: Set<A>) => (a: A) => boolean;
/**
 * Form the union of two sets
 * @function
 */
export declare const union: <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>) => Set<A>;
/**
 * The set of elements which are in both the first and second set
 * @function
 */
export declare const intersection: <A>(S: Setoid<A>) => (x: Set<A>, y: Set<A>) => Set<A>;
/**
 * Form the set difference (`y` - `x`)
 * @function
 */
export declare const difference: <A>(S: Setoid<A>) => (x: Set<A>) => (y: Set<A>) => Set<A>;
/** @function */
export declare const getUnionMonoid: <A>(S: Setoid<A>) => Monoid<Set<A>>;
/** @function */
export declare const getIntersectionSemigroup: <A>(S: Setoid<A>) => Semigroup<Set<A>>;
/** @function */
export declare const reduce: <A>(O: Ord<A>) => <B>(fa: Set<A>, b: B, f: (b: B, a: A) => B) => B;
/**
 * Create a set with one element
 * @function
 */
export declare const singleton: <A>(a: A) => Set<A>;
/**
 * Insert a value into a set
 * @function
 */
export declare const insert: <A>(S: Setoid<A>) => (a: A) => (x: Set<A>) => Set<A>;
/**
 * Delete a value from a set
 * @function
 */
export declare const remove: <A>(S: Setoid<A>) => (a: A) => (x: Set<A>) => Set<A>;
