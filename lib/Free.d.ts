import { HKT, URIS, Type, URIS2, Type2, URIS3, Type3 } from './HKT';
import { Monad, Monad1, Monad2C, Monad3C } from './Monad';
export declare const URI = "Free";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Pure
 * @constructor Impure
 */
export declare type Free<F, A> = Pure<F, A> | Impure<F, A, any>;
export declare class Pure<F, A> {
    readonly value: A;
    readonly _tag: 'Pure';
    readonly '-A': A;
    readonly '-L': F;
    readonly '-URI': URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): Free<F, B>;
    ap<B>(fab: Free<F, (a: A) => B>): Free<F, B>;
    ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C>;
    chain<B>(f: (a: A) => Free<F, B>): Free<F, B>;
    inspect(): string;
    toString(): string;
    isPure(): this is Pure<F, A>;
    isImpure(): this is Impure<F, A, any>;
}
export declare class Impure<F, A, X> {
    readonly fx: HKT<F, X>;
    readonly f: (x: X) => Free<F, A>;
    readonly _tag: 'Impure';
    readonly '-A': A;
    readonly '-L': F;
    readonly '-URI': URI;
    constructor(fx: HKT<F, X>, f: (x: X) => Free<F, A>);
    map<B>(f: (a: A) => B): Free<F, B>;
    ap<B>(fab: Free<F, (a: A) => B>): Free<F, B>;
    ap_<B, C>(this: Free<F, (b: B) => C>, fb: Free<F, B>): Free<F, C>;
    chain<B>(f: (a: A) => Free<F, B>): Free<F, B>;
    inspect(): string;
    toString(): string;
    isPure(): this is Pure<F, A>;
    isImpure(): this is Impure<F, A, X>;
}
/** @function */
export declare const of: <F, A>(a: A) => Free<F, A>;
/**
 * Lift an impure value described by the generating type constructor `F` into the free monad
 * @function
 */
export declare const liftF: <F, A>(fa: HKT<F, A>) => Free<F, A>;
/**
 * Use a natural transformation to change the generating type constructor of a free monad
 * @function
 */
export declare function hoistFree<F extends URIS3 = never, G extends URIS3 = never>(nt: <U, L, A>(fa: Type3<F, U, L, A>) => Type3<G, U, L, A>): (<A>(fa: Free<F, A>) => Free<G, A>);
export declare function hoistFree<F extends URIS2 = never, G extends URIS2 = never>(nt: <L, A>(fa: Type2<F, L, A>) => Type2<G, L, A>): (<A>(fa: Free<F, A>) => Free<G, A>);
export declare function hoistFree<F extends URIS = never, G extends URIS = never>(nt: <A>(fa: Type<F, A>) => Type<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>);
export declare function hoistFree<F, G>(nt: <A>(fa: HKT<F, A>) => HKT<G, A>): (<A>(fa: Free<F, A>) => Free<G, A>);
export declare function foldFree<M extends URIS3, U, L>(M: Monad3C<M, U, L>): <F extends URIS3, A>(nt: <X>(fa: Type3<F, U, L, X>) => Type3<M, U, L, X>, fa: Free<F, A>) => Type3<M, U, L, A>;
export declare function foldFree<M extends URIS2, L>(M: Monad2C<M, L>): <F extends URIS2, A>(nt: <X>(fa: Type2<F, L, X>) => Type2<M, L, X>, fa: Free<F, A>) => Type2<M, L, A>;
export declare function foldFree<M extends URIS>(M: Monad1<M>): <F extends URIS, A>(nt: <X>(fa: Type<F, X>) => Type<M, X>, fa: Free<F, A>) => Type<M, A>;
export declare function foldFree<M>(M: Monad<M>): <F, A>(nt: <X>(fa: HKT<F, X>) => HKT<M, X>, fa: Free<F, A>) => HKT<M, A>;
