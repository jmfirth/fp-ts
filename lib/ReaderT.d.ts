import { HKT, HKT2, URIS, URIS2, Type, Type2 } from './HKT';
import { Functor, Functor2, Functor1 } from './Functor';
import { Applicative, Applicative1, Applicative2 } from './Applicative';
import { Chain, Chain1, Chain2 } from './Chain';
import { Monad, Monad1, Monad2 } from './Monad';
export interface ReaderT<M> {
    map: <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>;
    of: <E, A>(a: A) => (e: E) => HKT<M, A>;
    ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>;
    chain: <E, A, B>(f: (a: A) => (e: E) => HKT<M, B>, fa: (e: E) => HKT<M, A>) => (e: E) => HKT<M, B>;
}
export interface ReaderT1<M extends URIS> {
    map: <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<M, A>) => (e: E) => Type<M, B>;
    of: <E, A>(a: A) => (e: E) => Type<M, A>;
    ap: <E, A, B>(fab: (e: E) => HKT<M, (a: A) => B>, fa: (e: E) => HKT<M, A>) => (e: E) => Type<M, B>;
    chain: <E, A, B>(f: (a: A) => (e: E) => HKT<M, B>, fa: (e: E) => HKT<M, A>) => (e: E) => Type<M, B>;
}
export interface ReaderT2<M extends URIS2> {
    map: <L, E, A, B>(f: (a: A) => B, fa: (e: E) => HKT2<M, L, A>) => (e: E) => Type2<M, L, B>;
    of: <L, E, A>(a: A) => (e: E) => Type2<M, L, A>;
    ap: <L, E, A, B>(fab: (e: E) => HKT2<M, L, (a: A) => B>, fa: (e: E) => HKT2<M, L, A>) => (e: E) => Type2<M, L, B>;
    chain: <L, E, A, B>(f: (a: A) => (e: E) => HKT2<M, L, B>, fa: (e: E) => HKT2<M, L, A>) => (e: E) => Type2<M, L, B>;
}
export declare function map<F extends URIS2>(F: Functor2<F>): <L, E, A, B>(f: (a: A) => B, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>;
export declare function map<F extends URIS>(F: Functor1<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>;
export declare function map<F>(F: Functor<F>): <E, A, B>(f: (a: A) => B, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>;
export declare function of<F extends URIS2>(F: Applicative2<F>): <L, E, A>(a: A) => (e: E) => Type2<F, L, A>;
export declare function of<F extends URIS>(F: Applicative1<F>): <E, A>(a: A) => (e: E) => Type<F, A>;
export declare function of<F>(F: Applicative<F>): <E, A>(a: A) => (e: E) => HKT<F, A>;
export declare function ap<F extends URIS2>(F: Applicative2<F>): <L, E, A, B>(fab: (e: E) => Type2<F, L, (a: A) => B>, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>;
export declare function ap<F extends URIS>(F: Applicative1<F>): <E, A, B>(fab: (e: E) => Type<F, (a: A) => B>, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>;
export declare function ap<F>(F: Applicative<F>): <E, A, B>(fab: (e: E) => HKT<F, (a: A) => B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>;
export declare function chain<F extends URIS2>(F: Chain2<F>): <L, E, A, B>(f: (a: A) => (e: E) => Type2<F, L, B>, fa: (e: E) => Type2<F, L, A>) => (e: E) => Type2<F, L, B>;
export declare function chain<F extends URIS>(F: Chain1<F>): <E, A, B>(f: (a: A) => (e: E) => Type<F, B>, fa: (e: E) => Type<F, A>) => (e: E) => Type<F, B>;
export declare function chain<F>(F: Chain<F>): <E, A, B>(f: (a: A) => (e: E) => HKT<F, B>, fa: (e: E) => HKT<F, A>) => (e: E) => HKT<F, B>;
export declare function ask<F extends URIS2>(F: Applicative2<F>): <L, E>() => (e: E) => Type2<F, L, E>;
export declare function ask<F extends URIS>(F: Applicative1<F>): <E>() => (e: E) => Type<F, E>;
export declare function ask<F>(F: Applicative<F>): <E>() => (e: E) => HKT<F, E>;
export declare function asks<F extends URIS2>(F: Applicative2<F>): <L, E, A>(f: (e: E) => A) => (e: E) => Type2<F, L, A>;
export declare function asks<F extends URIS>(F: Applicative1<F>): <E, A>(f: (e: E) => A) => (e: E) => Type<F, A>;
export declare function asks<F>(F: Applicative<F>): <E, A>(f: (e: E) => A) => (e: E) => HKT<F, A>;
export declare function getReaderT<M extends URIS2>(M: Monad2<M>): ReaderT2<M>;
export declare function getReaderT<M extends URIS>(M: Monad1<M>): ReaderT1<M>;
export declare function getReaderT<M>(M: Monad<M>): ReaderT<M>;
