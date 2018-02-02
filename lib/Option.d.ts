import { Monoid } from './Monoid';
import { Semigroup } from './Semigroup';
import { Monad1 } from './Monad';
import { Foldable1 } from './Foldable';
import { Plus1 } from './Plus';
import { Extend1 } from './Extend';
import { Setoid } from './Setoid';
import { Traversable1 } from './Traversable';
import { Alternative1 } from './Alternative';
import { Lazy, Predicate } from './function';
import { Either } from './Either';
declare module './HKT' {
    interface URI2HKT<A> {
        Option: Option<A>;
    }
}
export declare const URI = "Option";
export declare type URI = typeof URI;
/**
 * Represents optional values. Instances of `Option` are either an instance of `Some` or `None`
 *
 * The most idiomatic way to use an `Option` instance is to treat it as a collection or monad and use `map`, `flatMap` or `filter`.
 *
 * @data
 * @constructor None
 * @constructor Some
 */
export declare type Option<A> = None<A> | Some<A>;
export declare class None<A> {
    static value: Option<never>;
    readonly _tag: 'None';
    readonly '-A': A;
    readonly '-URI': URI;
    private constructor();
    /**
     * Takes a function `f` and an `Option` of `A`. Maps `f` either on `None` or `Some`, Option's data constructors.
     * If it maps on `Some` then it will apply the
     * `f` on `Some`'s value, if it maps on `None` it will return `None`.
     */
    map<B>(f: (a: A) => B): Option<B>;
    /** Maps `f` over this Option's value. If the value returned from `f` is null or undefined, returns `None` */
    mapNullable<B>(f: (a: A) => B | null | undefined): Option<B>;
    ap<B>(fab: Option<(a: A) => B>): Option<B>;
    ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C>;
    /**
     * Returns the result of applying f to this `Option`'s value if this `Option` is nonempty.
     * Returns `None` if this `Option` is empty. Slightly different from `map` in that `f` is expected to return an
     * `Option` (which could be `None`)
     */
    chain<B>(f: (a: A) => Option<B>): Option<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    alt(fa: Option<A>): Option<A>;
    extend<B>(f: (ea: Option<A>) => B): Option<B>;
    /** Applies a function to each case in the data structure */
    fold<B>(b: B, some: (a: A) => B): B;
    /** Lazy verion of `fold` */
    foldL<B>(none: () => B, some: (a: A) => B): B;
    /** Returns the value from this `Some` or the given argument if this is a `None` */
    getOrElse(a: A): A;
    /** Lazy version of `getOrElse` */
    getOrElseL(f: () => A): A;
    /** Returns the value from this `Some` or `null` if this is a `None` */
    toNullable(): A | null;
    /** Returns the value from this `Some` or `undefined` if this is a `None` */
    toUndefined(): A | undefined;
    inspect(): string;
    toString(): string;
    /** Returns `true` if the option has an element that is equal (as determined by `S`) to `a`, `false` otherwise */
    contains(S: Setoid<A>, a: A): boolean;
    /** Returns `true` if the option is `None`, `false` otherwise */
    isNone(): this is None<A>;
    /** Returns `true` if the option is an instance of `Some`, `false` otherwise */
    isSome(): this is Some<A>;
    /** Returns `true` if this option is non empty and the predicate `p` returns `true` when applied to this Option's value */
    exists(p: (a: A) => boolean): boolean;
    /** Returns this option if it is non empty and the predicate `p` return `true` when applied to this Option's value. Otherwise returns `None` */
    filter(p: Predicate<A>): Option<A>;
}
export declare const none: Option<never>;
export declare class Some<A> {
    readonly value: A;
    readonly _tag: 'Some';
    readonly '-A': A;
    readonly '-URI': URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): Option<B>;
    mapNullable<B>(f: (a: A) => B | null | undefined): Option<B>;
    ap<B>(fab: Option<(a: A) => B>): Option<B>;
    ap_<B, C>(this: Option<(b: B) => C>, fb: Option<B>): Option<C>;
    chain<B>(f: (a: A) => Option<B>): Option<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    alt(fa: Option<A>): Option<A>;
    extend<B>(f: (ea: Option<A>) => B): Option<B>;
    fold<B>(b: B, some: (a: A) => B): B;
    foldL<B>(none: () => B, some: (a: A) => B): B;
    getOrElse(a: A): A;
    getOrElseL(f: () => A): A;
    toNullable(): A | null;
    toUndefined(): A | undefined;
    inspect(): string;
    toString(): string;
    contains(S: Setoid<A>, a: A): boolean;
    isNone(): this is None<A>;
    isSome(): this is Some<A>;
    exists(p: (a: A) => boolean): boolean;
    filter(p: Predicate<A>): Option<A>;
}
/** @function */
export declare const getSetoid: <A>(S: Setoid<A>) => Setoid<Option<A>>;
/**
 * Option monoid returning the left-most non-None value
 * @function
 */
export declare const getFirstMonoid: <A = never>() => Monoid<Option<A>>;
/**
 * Option monoid returning the right-most non-None value
 * @function
 */
export declare const getLastMonoid: <A = never>() => Monoid<Option<A>>;
/** @function */
export declare const getMonoid: <A>(S: Semigroup<A>) => Monoid<Option<A>>;
/**
 * Constructs a new `Option` from a nullable type.
 * If the value is `null` or `undefined`, returns `None`, otherwise returns the value wrapped in a `Some`
 * @function
 */
export declare const fromNullable: <A>(a: A | null | undefined) => Option<A>;
/**
 * @function
 * @alias of
 */
export declare const some: <A>(a: A) => Option<A>;
/** @function */
export declare const fromPredicate: <A>(predicate: Predicate<A>) => (a: A) => Option<A>;
/** @function */
export declare const tryCatch: <A>(f: Lazy<A>) => Option<A>;
/** @function */
export declare const fromEither: <L, A>(fa: Either<L, A>) => Option<A>;
/** @instance */
export declare const option: Monad1<URI> & Foldable1<URI> & Plus1<URI> & Traversable1<URI> & Alternative1<URI> & Extend1<URI>;
