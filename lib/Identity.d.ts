import { Monad1 } from './Monad';
import { Foldable1 } from './Foldable';
import { Setoid } from './Setoid';
import { Traversable1 } from './Traversable';
import { Alt1 } from './Alt';
import { Comonad1 } from './Comonad';
import { ChainRec1 } from './ChainRec';
declare module './HKT' {
    interface URI2HKT<A> {
        Identity: Identity<A>;
    }
}
export declare const URI = "Identity";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor Identity
 */
export declare class Identity<A> {
    readonly value: A;
    readonly '-A': A;
    readonly '-URI': URI;
    constructor(value: A);
    map<B>(f: (a: A) => B): Identity<B>;
    ap<B>(fab: Identity<(a: A) => B>): Identity<B>;
    ap_<B, C>(this: Identity<(b: B) => C>, fb: Identity<B>): Identity<C>;
    chain<B>(f: (a: A) => Identity<B>): Identity<B>;
    reduce<B>(b: B, f: (b: B, a: A) => B): B;
    alt(fx: Identity<A>): Identity<A>;
    extract(): A;
    extend<B>(f: (ea: Identity<A>) => B): Identity<B>;
    fold<B>(f: (a: A) => B): B;
    inspect(): string;
    toString(): string;
}
/** @function */
export declare const getSetoid: <A>(setoid: Setoid<A>) => Setoid<Identity<A>>;
/** @instance */
export declare const identity: Monad1<URI> & Foldable1<URI> & Traversable1<URI> & Alt1<URI> & Comonad1<URI> & ChainRec1<URI>;
