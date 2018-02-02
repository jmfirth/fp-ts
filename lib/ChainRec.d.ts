import { HKT, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT';
import { Chain, Chain1, Chain2, Chain3, Chain2C, Chain3C } from './Chain';
import { Either } from './Either';
/** @typeclass */
export interface ChainRec<F> extends Chain<F> {
    chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>;
}
export interface ChainRec1<F extends URIS> extends Chain1<F> {
    chainRec: <A, B>(a: A, f: (a: A) => Type<F, Either<A, B>>) => Type<F, B>;
}
export interface ChainRec2<F extends URIS2> extends Chain2<F> {
    chainRec: <L, A, B>(a: A, f: (a: A) => Type2<F, L, Either<A, B>>) => Type2<F, L, B>;
}
export interface ChainRec3<F extends URIS3> extends Chain3<F> {
    chainRec: <U, L, A, B>(a: A, f: (a: A) => Type3<F, U, L, Either<A, B>>) => Type3<F, U, L, B>;
}
export interface ChainRec2C<F extends URIS2, L> extends Chain2C<F, L> {
    chainRec: <A, B>(a: A, f: (a: A) => Type2<F, L, Either<A, B>>) => Type2<F, L, B>;
}
export interface ChainRec3C<F extends URIS3, U, L> extends Chain3C<F, U, L> {
    chainRec: <A, B>(a: A, f: (a: A) => Type3<F, U, L, Either<A, B>>) => Type3<F, U, L, B>;
}
/** @function */
export declare const tailRec: <A, B>(f: (a: A) => Either<A, B>, a: A) => B;