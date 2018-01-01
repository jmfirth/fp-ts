import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Apply, FantasyApply } from './Apply'
import {
  getFunctorComposition,
  FunctorComposition,
  FunctorComposition11,
  FunctorComposition12,
  FunctorComposition21,
  FunctorComposition22
} from './Functor'

/**
 * @typeclass
 *
 * The `Applicative` type class extends the `Apply` type class
 * with a `of` function, which can be used to create values of type `f a`
 * from values of type `a`.
 *
 * Where `Apply` provides the ability to lift functions of two or
 * more arguments to functions whose arguments are wrapped using `f`, and
 * `Functor` provides the ability to lift functions of one
 * argument, `of` can be seen as the function which lifts functions of
 * _zero_ arguments. That is, `Applicative` functors support a lifting
 * operation for any number of function arguments.
 *
 * Instances must satisfy the following laws in addition to the `Apply` laws:
 *
 * - Identity: `fa => F.ap(F.of(identity), fa) = identity`
 * - Composition: `fa => F.ap(fbc, F.ap(fab, fa)) = fa => F.ap(F.ap(F.ap(F.of(bc => ab => compose(bc, ab)), fbc), fab), fa)`
 * - Homomorphism: `a => F.ap(F.of(ab), F.of(a)) = a => F.of(ab(a))`
 * - Interchange: `a => F.ap(fab, F.of(a)) = a => F.ap(F.of(ab => ab(a)), fab)`
 */
export interface Applicative<F> extends Apply<F> {
  of: <A>(a: A) => HKT<F, A>
}

export interface FantasyApplicative<F, A> extends FantasyApply<F, A> {}

export interface ApplicativeComposition<F, G> extends FunctorComposition<F, G> {
  of: <A>(a: A) => HKT<F, HKT<G, A>>
  ap<A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>>
}

export interface ApplicativeComposition11<F extends HKTS, G extends HKTS> extends FunctorComposition11<F, G> {
  of: <A>(a: A) => HKTAs<F, HKTAs<G, A>>
  ap<A, B>(fgab: HKTAs<F, HKTAs<G, (a: A) => B>>, fga: HKTAs<F, HKTAs<G, A>>): HKTAs<F, HKTAs<G, B>>
}

export interface ApplicativeComposition12<F extends HKTS, G extends HKT2S> extends FunctorComposition12<F, G> {
  of: <L, A>(a: A) => HKTAs<F, HKT2As<G, L, A>>
  ap<L, A, B>(fgab: HKTAs<F, HKT2As<G, L, (a: A) => B>>, fga: HKTAs<F, HKT2As<G, L, A>>): HKTAs<F, HKT2As<G, L, B>>
}

export interface ApplicativeComposition21<F extends HKT2S, G extends HKTS> extends FunctorComposition21<F, G> {
  of: <L, A>(a: A) => HKT2As<F, L, HKTAs<G, A>>
  ap<L, A, B>(fgab: HKT2As<F, L, HKTAs<G, (a: A) => B>>, fga: HKT2As<F, L, HKTAs<G, A>>): HKT2As<F, L, HKTAs<G, B>>
}

export interface ApplicativeComposition22<F extends HKT2S, G extends HKT2S> extends FunctorComposition22<F, G> {
  of: <L, M, A>(a: A) => HKT2As<F, L, HKT2As<G, M, A>>
  ap<L, M, A, B>(
    fgab: HKT2As<F, L, HKT2As<G, M, (a: A) => B>>,
    fga: HKT2As<F, L, HKT2As<G, M, A>>
  ): HKT2As<F, L, HKT2As<G, M, B>>
}

/** Perform a applicative action when a condition is true */
export function when<F extends HKT3S>(
  F: Applicative<F>
): <U, L>(condition: boolean, fu: HKT3As<F, U, L, void>) => HKT3As<F, U, L, void>
export function when<F extends HKT2S>(
  F: Applicative<F>
): <L>(condition: boolean, fu: HKT2As<F, L, void>) => HKT2As<F, L, void>
export function when<F extends HKTS>(F: Applicative<F>): (condition: boolean, fu: HKTAs<F, void>) => HKTAs<F, void>
export function when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void>
/**
 * Perform a applicative action when a condition is true
 * @function
 */
export function when<F>(F: Applicative<F>): (condition: boolean, fu: HKT<F, void>) => HKT<F, void> {
  return (condition, fu) => (condition ? fu : F.of(undefined))
}

export function getApplicativeComposition<F extends HKT2S, G extends HKT2S>(
  F: Applicative<F>,
  G: Applicative<G>
): ApplicativeComposition22<F, G>
export function getApplicativeComposition<F extends HKT2S, G extends HKTS>(
  F: Applicative<F>,
  G: Applicative<G>
): ApplicativeComposition21<F, G>
export function getApplicativeComposition<F extends HKTS, G extends HKT2S>(
  F: Applicative<F>,
  G: Applicative<G>
): ApplicativeComposition12<F, G>
export function getApplicativeComposition<F extends HKTS, G extends HKTS>(
  F: Applicative<F>,
  G: Applicative<G>
): ApplicativeComposition11<F, G>
export function getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G>
/** @function */
export function getApplicativeComposition<F, G>(F: Applicative<F>, G: Applicative<G>): ApplicativeComposition<F, G> {
  return {
    ...getFunctorComposition(F, G),
    of: a => F.of(G.of(a)),
    ap: <A, B>(fgab: HKT<F, HKT<G, (a: A) => B>>, fga: HKT<F, HKT<G, A>>): HKT<F, HKT<G, B>> =>
      F.ap(F.map(h => (ga: HKT<G, A>) => G.ap<A, B>(h, ga), fgab), fga)
  }
}
