import { Ring } from './Ring'
import { Setoid } from './Setoid'

// adapted from https://github.com/purescript/purescript-prelude/blob/master/src/Data/Field.purs

/**
 * @typeclass
 *
 * Instances must satisfy the following laws in addition to the `Ring` laws
 *
 * - Commutative multiplication: `a * b = b * a`
 * - Integral domain: `one /= zero`, and if `a` and `b` are both nonzero then so is their product `a * b`
 * - Euclidean function `degree`:
 *   - Nonnegativity: For all nonzero `a`, `degree a >= 0`
 *   - Quotient/remainder: For all `a` and `b`, where `b` is nonzero,
 *     let `q = a / b` and ``r = a `mod` b``; then `a = q*b + r`, and also
 *     either `r = zero` or `degree r < degree b`
 * - Submultiplicative euclidean function:
 *   - For all nonzero `a` and `b`, `degree a <= degree (a * b)`
 */
export interface Field<A> extends Ring<A> {
  degree: (a: A) => number
  div: (x: A) => (y: A) => A
  mod: (x: A) => (y: A) => A
}

/** @instance */
export const fieldInteger: Field<number> = {
  add: x => y => (x + y) | 0,
  zero: () => 0,
  mul: x => y => (x * y) | 0,
  one: () => 1,
  sub: x => y => (x - y) | 0,
  degree: x => Math.min(Math.abs(x), 2147483647),
  div: x => y => (x / y) | 0,
  mod: x => y => (x % y) | 0
}

/** @instance */
export const fieldNumber: Field<number> = {
  add: x => y => x + y,
  zero: () => 0,
  mul: x => y => x * y,
  one: () => 1,
  sub: x => y => x - y,
  degree: _ => 1,
  div: x => y => x / y,
  mod: _ => _ => 0
}

/**
 * The *greatest common divisor* of two values
 * @function
 */
export const gcd = <A>(S: Setoid<A>, field: Field<A>): ((x: A) => (y: A) => A) => {
  const zero = field.zero()
  const f = (x: A) => (y: A): A => (S.equals(y)(zero) ? x : f(y)(field.mod(x)(y)))
  return f
}

/**
 * The *least common multiple* of two values
 * @function
 */
export const lcm = <A>(setoid: Setoid<A>, field: Field<A>): ((x: A) => (y: A) => A) => {
  const zero = field.zero()
  return x => y =>
    setoid.equals(x)(zero) || setoid.equals(y)(zero) ? zero : field.div(field.mul(x)(y))(gcd(setoid, field)(x)(y))
}
