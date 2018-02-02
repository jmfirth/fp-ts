import { Functor2 } from './Functor';
import { Bifunctor2 } from './Bifunctor';
import { Foldable2 } from './Foldable';
import { Traversable2 } from './Traversable';
import { Option } from './Option';
import { Setoid } from './Setoid';
import { Semigroup } from './Semigroup';
import { Monad2C } from './Monad';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        These: These<L, A>;
    }
}
export declare const URI = "These";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor This
 * @constructor That
 * @constructor Both
 */
export declare type These<L, A> = This<L, A> | That<L, A> | Both<L, A>;
export declare class This<L, A> {
    readonly value: L;
    readonly _tag: 'This';
    readonly '-A': A;
    readonly '-L': L;
    readonly '-URI': URI;
    constructor(value: L);
    map<B>(f: (a: A) => B): These<L, B>;
    bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    /** Applies a function to each case in the data structure */
    fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B;
    inspect(): string;
    toString(): string;
    /** Returns `true` if the these is `This`, `false` otherwise */
    isThis(): this is This<L, A>;
    /** Returns `true` if the these is `That`, `false` otherwise */
    isThat(): this is That<L, A>;
    /** Returns `true` if the these is `Both`, `false` otherwise */
    isBoth(): this is Both<L, A>;
}
export declare class That<L, A> {
    readonly value: A;
    readonly _tag: 'That';
    readonly '-A': A;
    readonly '-L': L;
    readonly '-URI': URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): These<L, B>;
    bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B;
    inspect(): string;
    toString(): string;
    isThis(): this is This<L, A>;
    isThat(): this is That<L, A>;
    isBoth(): this is Both<L, A>;
}
export declare class Both<L, A> {
    readonly l: L;
    readonly a: A;
    readonly _tag: 'Both';
    readonly '-A': A;
    readonly '-L': L;
    readonly '-URI': URI;
    constructor(l: L, a: A);
    map<B>(f: (a: A) => B): These<L, B>;
    bimap<M, B>(f: (l: L) => M, g: (a: A) => B): These<M, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(this_: (l: L) => B, that: (a: A) => B, both: (l: L, a: A) => B): B;
    inspect(): string;
    toString(): string;
    isThis(): this is This<L, A>;
    isThat(): this is That<L, A>;
    isBoth(): this is Both<L, A>;
}
/** @function */
export declare const getSetoid: <L, A>(SL: Setoid<L>, SA: Setoid<A>) => Setoid<These<L, A>>;
/** @function */
export declare const getSemigroup: <L, A>(SL: Semigroup<L>, SA: Semigroup<A>) => Semigroup<These<L, A>>;
/** @function */
export declare const getMonad: <L>(S: Semigroup<L>) => Monad2C<"These", L>;
/** @function */
export declare const this_: <L, A>(l: L) => These<L, A>;
/**
 * @function
 * @alias of
 */
export declare const that: <L, A>(a: A) => These<L, A>;
/** @function */
export declare const both: <L, A>(l: L, a: A) => These<L, A>;
/** @function */
export declare const fromThese: <L, A>(defaultThis: L, defaultThat: A) => (fa: These<L, A>) => [L, A];
/** @function */
export declare const theseLeft: <L, A>(fa: These<L, A>) => Option<L>;
/** @function */
export declare const theseRight: <L, A>(fa: These<L, A>) => Option<A>;
/** @instance */
export declare const these: Functor2<URI> & Bifunctor2<URI> & Foldable2<URI> & Traversable2<URI>;
