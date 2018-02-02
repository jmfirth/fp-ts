import { HKT, HKT2, URIS, URIS2, Type, Type2 } from './HKT';
import { Functor, Functor1, Functor2 } from './Functor';
import { Applicative, Applicative1, Applicative2 } from './Applicative';
import { Chain, Chain1, Chain2 } from './Chain';
import { Monad, Monad1, Monad2 } from './Monad';
import { Endomorphism } from './function';
export interface StateT<M> {
    map: <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<M, [A, S]>) => (s: S) => HKT<M, [B, S]>;
    of: <S, A>(a: A) => (s: S) => HKT<M, [A, S]>;
    ap: <S, A, B>(fab: (s: S) => HKT<M, [(a: A) => B, S]>, fa: (s: S) => HKT<M, [A, S]>) => (s: S) => HKT<M, [B, S]>;
    chain: <S, A, B>(f: (a: A) => (s: S) => HKT<M, [B, S]>, fa: (s: S) => HKT<M, [A, S]>) => (s: S) => HKT<M, [B, S]>;
}
export interface StateT1<M extends URIS> {
    map: <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<M, [A, S]>) => (s: S) => Type<M, [B, S]>;
    of: <S, A>(a: A) => (s: S) => Type<M, [A, S]>;
    ap: <S, A, B>(fab: (s: S) => HKT<M, [(a: A) => B, S]>, fa: (s: S) => HKT<M, [A, S]>) => (s: S) => Type<M, [B, S]>;
    chain: <S, A, B>(f: (a: A) => (s: S) => HKT<M, [B, S]>, fa: (s: S) => HKT<M, [A, S]>) => (s: S) => Type<M, [B, S]>;
}
export interface StateT2<M extends URIS2> {
    map: <L, S, A, B>(f: (a: A) => B, fa: (s: S) => HKT2<M, L, [A, S]>) => (s: S) => Type2<M, L, [B, S]>;
    of: <L, S, A>(a: A) => (s: S) => Type2<M, L, [A, S]>;
    ap: <L, S, A, B>(fab: (s: S) => HKT2<M, L, [(a: A) => B, S]>, fa: (s: S) => HKT2<M, L, [A, S]>) => (s: S) => Type2<M, L, [B, S]>;
    chain: <L, S, A, B>(f: (a: A) => (s: S) => HKT2<M, L, [B, S]>, fa: (s: S) => HKT2<M, L, [A, S]>) => (s: S) => Type2<M, L, [B, S]>;
}
export declare function map<F extends URIS2>(F: Functor2<F>): <L, S, A, B>(f: (a: A) => B, fa: (s: S) => Type2<F, L, [A, S]>) => (s: S) => Type2<F, L, [B, S]>;
export declare function map<F extends URIS>(F: Functor1<F>): <S, A, B>(f: (a: A) => B, fa: (s: S) => Type<F, [A, S]>) => (s: S) => Type<F, [B, S]>;
export declare function map<F>(F: Functor<F>): <S, A, B>(f: (a: A) => B, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>;
export declare function of<F extends URIS2>(F: Applicative2<F>): <L, S, A>(a: A) => (s: S) => Type2<F, L, [A, S]>;
export declare function of<F extends URIS>(F: Applicative1<F>): <S, A>(a: A) => (s: S) => Type<F, [A, S]>;
export declare function of<F>(F: Applicative<F>): <S, A>(a: A) => (s: S) => HKT<F, [A, S]>;
export declare function ap<F extends URIS2>(F: Chain2<F>): <L, S, A, B>(fab: (s: S) => Type2<F, L, [(a: A) => B, S]>, fa: (s: S) => Type2<F, L, [A, S]>) => (s: S) => Type2<F, L, [B, S]>;
export declare function ap<F extends URIS>(F: Chain1<F>): <S, A, B>(fab: (s: S) => Type<F, [(a: A) => B, S]>, fa: (s: S) => Type<F, [A, S]>) => (s: S) => Type<F, [B, S]>;
export declare function ap<F>(F: Chain<F>): <S, A, B>(fab: (s: S) => HKT<F, [(a: A) => B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>;
export declare function chain<F extends URIS2>(F: Chain2<F>): <L, S, A, B>(f: (a: A) => (s: S) => Type2<F, L, [B, S]>, fa: (s: S) => Type2<F, L, [A, S]>) => (s: S) => Type2<F, L, [B, S]>;
export declare function chain<F extends URIS>(F: Chain1<F>): <S, A, B>(f: (a: A) => (s: S) => Type<F, [B, S]>, fa: (s: S) => Type<F, [A, S]>) => (s: S) => Type<F, [B, S]>;
export declare function chain<F>(F: Chain<F>): <S, A, B>(f: (a: A) => (s: S) => HKT<F, [B, S]>, fa: (s: S) => HKT<F, [A, S]>) => (s: S) => HKT<F, [B, S]>;
export declare function get<F extends URIS2>(F: Applicative2<F>): <S>() => <L>(s: S) => Type2<F, L, [S, S]>;
export declare function get<F extends URIS>(F: Applicative1<F>): <S>() => (s: S) => Type<F, [S, S]>;
export declare function get<F>(F: Applicative<F>): <S>() => (s: S) => HKT<F, [S, S]>;
export declare function put<F extends URIS2>(F: Applicative2<F>): <S>(s: S) => <L>() => Type2<F, L, [void, S]>;
export declare function put<F extends URIS>(F: Applicative1<F>): <S>(s: S) => () => Type<F, [void, S]>;
export declare function put<F>(F: Applicative<F>): <S>(s: S) => () => HKT<F, [void, S]>;
export declare function modify<F extends URIS2>(F: Applicative2<F>): <S>(f: Endomorphism<S>) => <L>(s: S) => Type2<F, L, [void, S]>;
export declare function modify<F extends URIS>(F: Applicative1<F>): <S>(f: Endomorphism<S>) => (s: S) => Type<F, [void, S]>;
export declare function modify<F>(F: Applicative<F>): <S>(f: Endomorphism<S>) => (s: S) => HKT<F, [void, S]>;
export declare function gets<F extends URIS2>(F: Applicative2<F>): <S, A>(f: (s: S) => A) => <L>(s: S) => Type2<F, L, [A, S]>;
export declare function gets<F extends URIS>(F: Applicative1<F>): <S, A>(f: (s: S) => A) => (s: S) => Type<F, [A, S]>;
export declare function gets<F>(F: Applicative<F>): <S, A>(f: (s: S) => A) => (s: S) => HKT<F, [A, S]>;
export declare function getStateT<M extends URIS2>(M: Monad2<M>): StateT2<M>;
export declare function getStateT<M extends URIS>(M: Monad1<M>): StateT1<M>;
export declare function getStateT<M>(M: Monad<M>): StateT<M>;
