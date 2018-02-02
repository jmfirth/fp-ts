import { HKT, URIS, URIS2, Type, Type2 } from './HKT';
import { Functor, Functor2, Functor1 } from './Functor';
import { Monad, Monad2, Monad1 } from './Monad';
import { Applicative, Applicative1, Applicative2, ApplicativeComposition, ApplicativeComposition11, ApplicativeComposition21 } from './Applicative';
import { Option, URI as OptionURI } from './Option';
export interface OptionT<M> extends ApplicativeComposition<M, OptionURI> {
    chain: <A, B>(f: (a: A) => HKT<M, Option<B>>, fa: HKT<M, Option<A>>) => HKT<M, Option<B>>;
}
export interface OptionT1<M extends URIS> extends ApplicativeComposition11<M, OptionURI> {
    chain: <A, B>(f: (a: A) => Type<M, Option<B>>, fa: Type<M, Option<A>>) => Type<M, Option<B>>;
}
export interface OptionT2<M extends URIS2> extends ApplicativeComposition21<M, OptionURI> {
    chain: <L, A, B>(f: (a: A) => Type2<M, L, Option<B>>, fa: Type2<M, L, Option<A>>) => Type2<M, L, Option<B>>;
}
export declare function chain<F extends URIS2>(F: Monad2<F>): OptionT2<F>['chain'];
export declare function chain<F extends URIS>(F: Monad<F>): OptionT1<F>['chain'];
export declare function chain<F>(F: Monad<F>): OptionT<F>['chain'];
export declare function some<F extends URIS2>(F: Applicative2<F>): <L, A>(a: A) => Type2<F, L, Option<A>>;
export declare function some<F extends URIS>(F: Applicative1<F>): <A>(a: A) => Type<F, Option<A>>;
export declare function some<F>(F: Applicative<F>): <A>(a: A) => HKT<F, Option<A>>;
export declare function none<F extends URIS2>(F: Applicative2<F>): <L>() => Type2<F, L, Option<never>>;
export declare function none<F extends URIS>(F: Applicative1<F>): () => Type<F, Option<never>>;
export declare function none<F>(F: Applicative<F>): () => HKT<F, Option<never>>;
export declare function fromOption<F extends URIS2>(F: Applicative2<F>): <L, A>(fa: Option<A>) => Type2<F, L, Option<A>>;
export declare function fromOption<F extends URIS>(F: Applicative1<F>): <A>(fa: Option<A>) => Type<F, Option<A>>;
export declare function fromOption<F>(F: Applicative<F>): <A>(fa: Option<A>) => HKT<F, Option<A>>;
export declare function liftF<F extends URIS2>(F: Functor2<F>): <L, A>(fa: Type2<F, L, A>) => Type2<F, L, Option<A>>;
export declare function liftF<F extends URIS>(F: Functor1<F>): <A>(fa: HKT<F, A>) => Type<F, Option<A>>;
export declare function liftF<F>(F: Functor<F>): <A>(fa: HKT<F, A>) => HKT<F, Option<A>>;
export declare function fold<F extends URIS2>(F: Functor2<F>): <L, R, A>(r: R, some: (a: A) => R, fa: Type2<F, L, Option<A>>) => Type2<F, L, R>;
export declare function fold<F extends URIS>(F: Functor1<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => Type<F, R>;
export declare function fold<F>(F: Functor<F>): <R, A>(r: R, some: (a: A) => R, fa: HKT<F, Option<A>>) => HKT<F, R>;
export declare function getOrElse<F extends URIS2>(F: Functor2<F>): <A>(a: A) => <L>(fa: Type2<F, L, Option<A>>) => Type2<F, L, A>;
export declare function getOrElse<F extends URIS>(F: Functor1<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => Type<F, A>;
export declare function getOrElse<F>(F: Functor<F>): <A>(a: A) => (fa: HKT<F, Option<A>>) => HKT<F, A>;
export declare function getOptionT<M extends URIS2>(M: Monad2<M>): OptionT2<M>;
export declare function getOptionT<M extends URIS>(M: Monad1<M>): OptionT1<M>;
export declare function getOptionT<M>(M: Monad<M>): OptionT<M>;
