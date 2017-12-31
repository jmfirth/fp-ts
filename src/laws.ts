import { check, Property, Generator, property, CheckOptions } from 'testcheck'
import { Setoid } from './Setoid'
import { Ord } from './Ord'
import { Semiring } from './Semiring'
import { Ring } from './Ring'
import { Field } from './Field'
import { HKT, HKTS, HKTAs } from './HKT'
import { Functor } from './Functor'
import { identity, compose } from './function'
import { Either, right, left, either } from './Either'
import { sequence } from './Traversable'
import { array } from './Array'

export class Law<A> {
  constructor(readonly name: string, readonly property: Property<A>) {}
  check(options?: CheckOptions): Either<string, string> {
    const name = this.name
    const c = check(this.property, options)
    if (c.result) {
      return right(name)
    } else {
      return left(`Law "${name}" failed with the following case: ${JSON.stringify(c, null, 2)}`)
    }
  }
}

export type Laws = Array<Law<any>>

export function checkLaws(laws: Laws, options?: CheckOptions): Either<string, Array<string>> {
  return sequence(either, array)(laws.map(l => l.check(options)))
}

export function getSetoidLaws<A>(E: Setoid<A>, generator: Generator<A>): Laws {
  return [
    new Law(
      'Setoid: Reflexivity',
      property(generator, a => {
        return E.equals(a)(a)
      })
    ),
    new Law(
      'Setoid: Symmetry',
      property(generator, generator, (a, b) => {
        return E.equals(a)(b) ? E.equals(b)(a) : true
      })
    ),
    new Law(
      'Setoid: Transitivity',
      property(generator, generator, generator, (a, b, c) => {
        return E.equals(a)(b) && E.equals(b)(c) ? E.equals(a)(c) : true
      })
    )
  ]
}

export function getFieldLaws<A>(F: Field<A>, generator: Generator<A>, E: Setoid<A>, options?: CheckOptions): Laws {
  const one = F.one()
  const zero = F.zero()
  const isZero: (a: A) => boolean = E.equals(zero)
  return getRingLaws(F, generator, E).concat([
    new Law(
      'Field: Commutative multiplication',
      property(generator, generator, (a, b) => {
        return E.equals(F.mul(a)(b))(F.mul(b)(a))
      })
    ),
    new Law(
      'Field: Integral domain',
      property(generator, generator, (a, b) => {
        return !E.equals(a)(zero) && !E.equals(b)(zero) ? !E.equals(F.mul(a)(b))(zero) : !E.equals(one)(zero)
      })
    ),
    new Law(
      'Field: Nonnegativity',
      property(generator, a => {
        return F.degree(a) >= 0
      })
    ),
    new Law(
      'Field: Quotient/remainder',
      property(generator, generator, (a, b) => {
        if (!isZero(b)) {
          const q = F.div(a)(b)
          const r = F.mod(a)(b)
          return E.equals(a)(F.add(F.mul(q)(b))(r)) && (isZero(r) || F.degree(r) < F.degree(b))
        } else {
          return true
        }
      })
    ),
    new Law(
      'Field: Submultiplicative',
      property(generator, generator, (a, b) => {
        return !isZero(a) && !isZero(b) ? F.degree(a) <= F.degree(F.mul(a)(b)) : true
      })
    )
  ])
}

export function getFunctorLaws<F extends HKTS>(
  F: Functor<F>
): <A, C>(
  generator: Generator<HKTAs<F, A>>,
  SA: Setoid<HKTAs<F, A>>,
  SC: Setoid<HKTAs<F, C>>
) => <B>(g: (a: A) => B, f: (b: B) => C, options?: CheckOptions) => Laws
export function getFunctorLaws<F>(
  F: Functor<F>
): <A, C>(
  generator: Generator<HKT<F, A>>,
  SA: Setoid<HKT<F, A>>,
  SC: Setoid<HKT<F, C>>
) => <B>(g: (a: A) => B, f: (b: B) => C, options?: CheckOptions) => Laws
export function getFunctorLaws<F>(
  F: Functor<F>
): <A, C>(
  generator: Generator<HKT<F, A>>,
  SA: Setoid<HKT<F, A>>,
  SC: Setoid<HKT<F, C>>
) => <B>(g: (a: A) => B, f: (b: B) => C, options?: CheckOptions) => Laws {
  return <A, B, C>(generator: Generator<HKT<F, A>>, SA: Setoid<HKT<F, A>>, SC: Setoid<HKT<F, C>>) => (
    g: (a: A) => B,
    f: (b: B) => C,
    options?: CheckOptions
  ) => {
    return [
      new Law(
        'Funtor: Identity',
        property(generator, fa => {
          return SA.equals(F.map<A, A>(identity, fa))(fa)
        })
      ),
      new Law(
        'Funtor: Composition',
        property(generator, fa => {
          const fc1 = F.map(compose(f, g), fa)
          const fc2 = compose((fb: HKT<F, B>) => F.map(f, fb), (fa: HKT<F, A>) => F.map(g, fa))(fa)
          return SC.equals(fc1)(fc2)
        })
      )
    ]
  }
}

export function getOrdLaws<A>(O: Ord<A>, generator: Generator<A>, E: Setoid<A>): Laws {
  return [
    new Law(
      'Ord: Compatibility with Setoid',
      property(generator, generator, (a, b) => {
        return O.compare(a)(b) === 'EQ' ? E.equals(a)(b) : true
      })
    ),
    new Law(
      'Ord: Reflexivity',
      property(generator, a => {
        return O.compare(a)(a) !== 'GT'
      })
    ),
    new Law(
      'Ord: Antisymmetry',
      property(generator, generator, (a, b) => {
        return O.compare(a)(b) !== 'GT' && O.compare(b)(a) !== 'GT' ? E.equals(a)(b) : true
      })
    ),
    new Law(
      'Ord: Transitivity',
      property(generator, generator, generator, (a, b, c) => {
        return O.compare(a)(b) !== 'GT' && O.compare(b)(c) !== 'GT' ? O.compare(a)(c) !== 'GT' : true
      })
    )
  ]
}

export function getRingLaws<A>(R: Ring<A>, generator: Generator<A>, E: Setoid<A>): Laws {
  const zero = R.zero()
  return getSemiringLaws(R, generator, E).concat([
    new Law(
      'Ring: Additive inverse',
      property(generator, a => {
        const b = R.sub(a)(a)
        const c = R.add(R.sub(zero)(a))(a)
        return E.equals(b)(c) && E.equals(b)(zero)
      })
    )
  ])
}

export function getSemiringLaws<A>(S: Semiring<A>, generator: Generator<A>, E: Setoid<A>): Laws {
  const zero = S.zero()
  const one = S.one()
  return [
    new Law(
      'Semiring: Addition Associativity',
      property(generator, generator, generator, (a, b, c) => {
        return E.equals(S.add(S.add(a)(b))(c))(S.add(a)(S.add(b)(c)))
      })
    ),
    new Law(
      'Semiring: Addition Identity',
      property(generator, a => {
        const b = S.add(a)(zero)
        const c = S.add(zero)(a)
        return E.equals(b)(c) && E.equals(b)(a)
      })
    ),
    new Law(
      'Semiring: Addition Commutativity',
      property(generator, generator, (a, b) => {
        return E.equals(S.add(a)(b))(S.add(b)(a))
      })
    ),
    new Law(
      'Semiring: Multiplication Associativity',
      property(generator, generator, generator, (a, b, c) => {
        return E.equals(S.mul(S.mul(a)(b))(c))(S.mul(a)(S.mul(b)(c)))
      })
    ),
    new Law(
      'Semiring: Multiplication Identity',
      property(generator, a => {
        const b = S.mul(a)(one)
        const c = S.mul(one)(a)
        return E.equals(b)(c) && E.equals(b)(a)
      })
    ),
    new Law(
      'Semiring: Left distributivity',
      property(generator, generator, generator, (a, b, c) => {
        return E.equals(S.mul(a)(S.add(b)(c)))(S.add(S.mul(a)(b))(S.mul(a)(c)))
      })
    ),
    new Law(
      'Semiring: Right distributivity',
      property(generator, generator, generator, (a, b, c) => {
        return E.equals(S.mul(S.add(a)(b))(c))(S.add(S.mul(a)(c))(S.mul(b)(c)))
      })
    ),
    new Law(
      'Semiring: Annihilation',
      property(generator, a => {
        const b = S.mul(a)(zero)
        const c = S.mul(zero)(a)
        return E.equals(b)(c) && E.equals(b)(zero)
      })
    )
  ]
}
