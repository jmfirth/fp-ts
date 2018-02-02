import { Ring } from './Ring';
import { Setoid } from './Setoid';
/** @typeclass */
export interface Field<A> extends Ring<A> {
    degree: (a: A) => number;
    div: (x: A, y: A) => A;
    mod: (x: A, y: A) => A;
}
/** @instance */
export declare const fieldNumber: Field<number>;
/**
 * The *greatest common divisor* of two values
 * @function
 */
export declare const gcd: <A>(S: Setoid<A>, field: Field<A>) => (x: A, y: A) => A;
/**
 * The *least common multiple* of two values
 * @function
 */
export declare const lcm: <A>(S: Setoid<A>, F: Field<A>) => (x: A, y: A) => A;
