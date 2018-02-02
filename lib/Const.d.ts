import { Monoid } from './Monoid';
import { Functor2 } from './Functor';
import { Contravariant2 } from './Contravariant';
import { Applicative2C } from './Applicative';
import { Apply2C } from './Apply';
import { Semigroup } from './Semigroup';
import { Setoid } from './Setoid';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Const: Const<L, A>;
    }
}
export declare const URI = "Const";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Const
 */
export declare class Const<L, A> {
    readonly value: L;
    readonly '-A': A;
    readonly '-L': L;
    readonly '-URI': URI;
    constructor(value: L);
    map<B>(f: (a: A) => B): Const<L, B>;
    contramap<B>(f: (b: B) => A): Const<L, B>;
    fold<B>(f: (l: L) => B): B;
    inspect(): string;
    toString(): string;
}
/** @function */
export declare const getSetoid: <L, A>(S: Setoid<L>) => Setoid<Const<L, A>>;
/** @function */
export declare const getApply: <L>(S: Semigroup<L>) => Apply2C<"Const", L>;
/** @function */
export declare const getApplicative: <L>(M: Monoid<L>) => Applicative2C<"Const", L>;
/** @instance */
export declare const const_: Functor2<URI> & Contravariant2<URI>;
