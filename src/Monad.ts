import { Applicative, FantasyApplicative } from './Applicative'
import { Chain, FantasyChain } from './Chain'

/**
 * @typeclass
 *
 * The `Monad` type class combines the operations of the `Chain` and
 * `Applicative` type classes. Therefore, `Monad` instances represent type
 * constructors which support sequential composition, and also lifting of
 * functions of arbitrary arity.
 *
 * Instances must satisfy the following laws in addition to the
 * `Applicative` and `Chain` laws:
 *
 * - Left Identity: `a => F.chain(afb, F.of(a)) = afb`
 * - Right Identity: `a => F.chain(b => F.of(b), afb(a))`
 */
export interface Monad<F> extends Applicative<F>, Chain<F> {}

export interface FantasyMonad<F, A> extends FantasyApplicative<F, A>, FantasyChain<F, A> {}
