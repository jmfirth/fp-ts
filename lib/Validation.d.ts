import { Applicative2C } from './Applicative';
import { Semigroup } from './Semigroup';
import { Foldable2 } from './Foldable';
import { Setoid } from './Setoid';
import { Traversable2 } from './Traversable';
import { Functor2 } from './Functor';
import { Predicate } from './function';
import { Either } from './Either';
import { Monad2C } from './Monad';
import { Monoid } from './Monoid';
import { Alt2C } from './Alt';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Validation: Validation<L, A>;
    }
}
export declare const URI = "Validation";
export declare type URI = typeof URI;
/**
 * The `Validation` functor, used for applicative validation
 *
 * The `Applicative` instance collects multiple failures in
 * an arbitrary `Semigroup`.
 *
 * @data
 * @constructor Failure
 * @constructor Success
 */
export declare type Validation<L, A> = Failure<L, A> | Success<L, A>;
export declare class Failure<L, A> {
    readonly value: L;
    readonly _tag: 'Failure';
    readonly '-A': A;
    readonly '-L': L;
    readonly '-URI': URI;
    constructor(value: L);
    map<B>(f: (a: A) => B): Validation<L, B>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(failure: (l: L) => B, success: (a: A) => B): B;
    /** Returns the value from this `Success` or the given argument if this is a `Failure` */
    getOrElse(a: A): A;
    /** Returns the value from this `Success` or the result of given argument if this is a `Failure` */
    getOrElseL(f: (l: L) => A): A;
    mapFailure<M>(f: (l: L) => M): Validation<M, A>;
    swap(): Validation<A, L>;
    inspect(): string;
    toString(): string;
    /** Returns `true` if the validation is an instance of `Failure`, `false` otherwise */
    isFailure(): this is Failure<L, A>;
    /** Returns `true` if the validation is an instance of `Success`, `false` otherwise */
    isSuccess(): this is Success<L, A>;
}
export declare class Success<L, A> {
    readonly value: A;
    readonly _tag: 'Success';
    readonly '-A': A;
    readonly '-L': L;
    readonly '-URI': URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): Validation<L, B>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Validation<V, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(failure: (l: L) => B, success: (a: A) => B): B;
    getOrElse(a: A): A;
    getOrElseL(f: (l: L) => A): A;
    mapFailure<M>(f: (l: L) => M): Validation<M, A>;
    swap(): Validation<A, L>;
    inspect(): string;
    toString(): string;
    isFailure(): this is Failure<L, A>;
    isSuccess(): this is Success<L, A>;
}
/** @function */
export declare const getSetoid: <L, A>(SL: Setoid<L>, SA: Setoid<A>) => Setoid<Validation<L, A>>;
/** @function */
export declare const getApplicative: <L>(S: Semigroup<L>) => Applicative2C<"Validation", L>;
/** @function */
export declare const getMonad: <L>(S: Semigroup<L>) => Monad2C<"Validation", L>;
/** @function */
export declare const failure: <L, A>(l: L) => Validation<L, A>;
/**
 * @function
 * @alias of
 */
export declare const success: <L, A>(a: A) => Validation<L, A>;
/** @function */
export declare const fromPredicate: <L, A>(predicate: Predicate<A>, f: (a: A) => L) => (a: A) => Validation<L, A>;
/** @function */
export declare const fromEither: <L, A>(e: Either<L, A>) => Validation<L, A>;
/** @function */
export declare const getSemigroup: <L, A>(SL: Semigroup<L>, SA: Semigroup<A>) => Semigroup<Validation<L, A>>;
/** @function */
export declare const getMonoid: <L, A>(SL: Semigroup<L>, SA: Monoid<A>) => Monoid<Validation<L, A>>;
/** @function */
export declare const getAlt: <L>(S: Semigroup<L>) => Alt2C<"Validation", L>;
/** @instance */
export declare const validation: Functor2<URI> & Foldable2<URI> & Traversable2<URI>;
