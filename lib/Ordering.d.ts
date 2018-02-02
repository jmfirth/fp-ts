import { Setoid } from './Setoid';
import { Semigroup } from './Semigroup';
export declare type Ordering = -1 | 0 | 1;
/** @function */
export declare const sign: (n: number) => Ordering;
/** @instance */
export declare const setoidOrdering: Setoid<Ordering>;
/** @instance */
export declare const semigroupOrdering: Semigroup<Ordering>;
/** @function */
export declare const invert: (O: Ordering) => Ordering;
