import { Monad2 } from './Monad';
import { Foldable2 } from './Foldable';
import { Extend2 } from './Extend';
import { Setoid } from './Setoid';
import { Traversable2 } from './Traversable';
import { Bifunctor2 } from './Bifunctor';
import { Alt2 } from './Alt';
import { ChainRec2 } from './ChainRec';
import { Option } from './Option';
import { Predicate, Lazy } from './function';
import { Validation } from './Validation';
declare module './HKT' {
    interface URI2HKT2<L, A> {
        Either: Either<L, A>;
    }
}
export declare const URI = "Either";
export declare type URI = typeof URI;
/**
 * Represents a value of one of two possible types (a disjoint union).
 *
 * An instance of `Either` is either an instance of `Left` or `Right`.
 *
 * A common use of `Either` is as an alternative to `Option` for dealing with possible missing values.
 * In this usage, `None` is replaced with a `Left` which can contain useful information.
 * `Right` takes the place of `Some`.
 * Convention dictates that `Left` is used for failure and `Right` is used for success.
 *
 * For example, you could use `Either<string, number>` to detect whether a received input is a `string` or a `number`.
 *
 * ```ts
 * const parse = (errorMessage: string) => (input: string): Either<string, number> => {
 *   const n = parseInt(input, 10)
 *   return isNaN(n) ? left(errorMessage) : right(n)
 * }
 * ```
 *
 * `Either` is right-biased, which means that `Right` is assumed to be the default case to operate on.
 * If it is `Left`, operations like `map`, `chain`, ... return the `Left` value unchanged:
 *
 * ```ts
 * right(12).map(double) // right(24)
 * left(23).map(double)  // left(23)
 * ```
 *
 * @data
 * @constructor Left
 * @constructor Right
 */
export declare type Either<L, A> = Left<L, A> | Right<L, A>;
export declare class Left<L, A> {
    readonly value: L;
    readonly _tag: 'Left';
    readonly '-A': A;
    readonly '-L': L;
    readonly '-URI': URI;
    constructor(value: L);
    /** The given function is applied if this is a `Right` */
    map<B>(f: (a: A) => B): Either<L, B>;
    ap<B>(fab: Either<L, (a: A) => B>): Either<L, B>;
    ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C>;
    /** Binds the given function across `Right` */
    chain<B>(f: (a: A) => Either<L, B>): Either<L, B>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>;
    alt(fy: Either<L, A>): Either<L, A>;
    extend<B>(f: (ea: Either<L, A>) => B): Either<L, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    /** Applies a function to each case in the data structure */
    fold<B>(left: (l: L) => B, right: (a: A) => B): B;
    /** Returns the value from this `Right` or the given argument if this is a `Left` */
    getOrElse(a: A): A;
    /** Returns the value from this `Right` or the result of given argument if this is a `Left` */
    getOrElseL(f: (l: L) => A): A;
    /** Maps the left side of the disjunction */
    mapLeft<M>(f: (l: L) => M): Either<M, A>;
    inspect(): string;
    toString(): string;
    /** Returns `true` if the either is an instance of `Left`, `false` otherwise */
    isLeft(): this is Left<L, A>;
    /** Returns `true` if the either is an instance of `Right`, `false` otherwise */
    isRight(): this is Right<L, A>;
    /** Swaps the disjunction values */
    swap(): Either<A, L>;
}
export declare class Right<L, A> {
    readonly value: A;
    readonly _tag: 'Right';
    readonly '-A': A;
    readonly '-L': L;
    readonly '-URI': URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): Either<L, B>;
    ap<B>(fab: Either<L, (a: A) => B>): Either<L, B>;
    ap_<B, C>(this: Either<L, (b: B) => C>, fb: Either<L, B>): Either<L, C>;
    chain<B>(f: (a: A) => Either<L, B>): Either<L, B>;
    bimap<V, B>(f: (l: L) => V, g: (a: A) => B): Either<V, B>;
    alt(fy: Either<L, A>): Either<L, A>;
    extend<B>(f: (ea: Either<L, A>) => B): Either<L, B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    fold<B>(left: (l: L) => B, right: (a: A) => B): B;
    getOrElse(a: A): A;
    getOrElseL(f: (l: L) => A): A;
    mapLeft<M>(f: (l: L) => M): Either<M, A>;
    inspect(): string;
    toString(): string;
    isLeft(): this is Left<L, A>;
    isRight(): this is Right<L, A>;
    swap(): Either<A, L>;
}
/** @function */
export declare const getSetoid: <L, A>(SL: Setoid<L>, SA: Setoid<A>) => Setoid<Either<L, A>>;
/**
 * Constructs a new `Either` holding a `Left` value.
 * This usually represents a failure, due to the right-bias of this structure
 * @function
 */
export declare const left: <L, A>(l: L) => Either<L, A>;
/**
 * Constructs a new `Either` holding a `Right` value.
 * This usually represents a successful value due to the right bias of this structure
 * @function
 * @alias of
 */
export declare const right: <L, A>(a: A) => Either<L, A>;
/** @function */
export declare const fromPredicate: <L, A>(predicate: Predicate<A>, whenFalse: (a: A) => L) => (a: A) => Either<L, A>;
/**
 * Takes a default and a `Option` value, if the value is a `Some`, turn it into
 * a `Right`, if the value is a `None` use the provided default as a `Left`
 * @function
 */
export declare const fromOption: <L>(defaultValue: L) => <A>(fa: Option<A>) => Either<L, A>;
/**
 * Takes a default and a nullable value, if the value is not nully, turn it into
 * a `Right`, if the value is nully use the provided default as a `Left`
 * @function
 */
export declare const fromNullable: <L>(defaultValue: L) => <A>(a: A | null | undefined) => Either<L, A>;
/** @function */
export declare const tryCatch: <A>(f: Lazy<A>) => Either<Error, A>;
/** @function */
export declare const fromValidation: <L, A>(fa: Validation<L, A>) => Either<L, A>;
/** @instance */
export declare const either: Monad2<URI> & Foldable2<URI> & Traversable2<URI> & Bifunctor2<URI> & Alt2<URI> & Extend2<URI> & ChainRec2<URI>;
