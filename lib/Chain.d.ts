import { HKT, URIS, URIS2, Type, Type2, URIS3, Type3 } from './HKT';
import { Apply, Apply1, Apply2, Apply3, Apply2C, Apply3C } from './Apply';
/** @typeclass */
export interface Chain<F> extends Apply<F> {
    chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>;
}
export interface Chain1<F extends URIS> extends Apply1<F> {
    chain: <A, B>(fa: Type<F, A>, f: (a: A) => Type<F, B>) => Type<F, B>;
}
export interface Chain2<F extends URIS2> extends Apply2<F> {
    chain: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, B>;
}
export interface Chain3<F extends URIS3> extends Apply3<F> {
    chain: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, B>;
}
export interface Chain2C<F extends URIS2, L> extends Apply2C<F, L> {
    chain: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, B>;
}
export interface Chain3C<F extends URIS3, U, L> extends Apply3C<F, U, L> {
    chain: <A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, B>;
}
export declare function flatten<F extends URIS3, U, L>(chain: Chain3C<F, U, L>): <A>(mma: Type3<F, U, L, Type3<F, U, L, A>>) => Type3<F, U, L, A>;
export declare function flatten<F extends URIS3>(chain: Chain3<F>): <U, L, A>(mma: Type3<F, U, L, Type3<F, U, L, A>>) => Type3<F, U, L, A>;
export declare function flatten<F extends URIS2, L>(chain: Chain2C<F, L>): <A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>;
export declare function flatten<F extends URIS2>(chain: Chain2<F>): <L, A>(mma: Type2<F, L, Type2<F, L, A>>) => Type2<F, L, A>;
export declare function flatten<F extends URIS>(chain: Chain1<F>): <A>(mma: Type<F, Type<F, A>>) => Type<F, A>;
export declare function flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>;