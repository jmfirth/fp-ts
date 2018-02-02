import { Monad3C } from './Monad';
import { IxMonad3 } from './IxMonad';
import { IO } from './IO';
declare module './HKT' {
    interface URI2HKT3<U, L, A> {
        IxIO: IxIO<U, L, A>;
    }
}
export declare const URI = "IxIO";
export declare type URI = typeof URI;
/**
 * @data
 * @constructor IxIO
 */
export declare class IxIO<I, O, A> {
    readonly value: IO<A>;
    readonly '-A': A;
    readonly '-L': O;
    readonly '-U': I;
    readonly '-URI': URI;
    constructor(value: IO<A>);
    run(): A;
    ichain<Z, B>(f: (a: A) => IxIO<O, Z, B>): IxIO<I, Z, B>;
    map<B>(f: (a: A) => B): IxIO<I, O, B>;
    ap<B>(fab: IxIO<I, I, (a: A) => B>): IxIO<I, I, B>;
    chain<B>(f: (a: A) => IxIO<I, I, B>): IxIO<I, I, B>;
}
/** @function */
export declare const iof: <I, A>(a: A) => IxIO<I, I, A>;
/** @function */
export declare const getMonad: <I = never>() => Monad3C<"IxIO", I, I>;
/** @instance */
export declare const ixIO: IxMonad3<URI>;
