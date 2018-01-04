import * as assert from 'assert'
import {
  checkLaws,
  getSemigroupLaws,
  getMonoidLaws,
  getMonadLaws,
  getApplicativeLaws,
  getApplyLaws,
  getChainLaws,
  getSetoidLaws,
  getOrdLaws,
  getSemiringLaws,
  getRingLaws,
  getFieldLaws,
  getFunctorLaws
} from '../src/laws'
import { gen, Generator } from 'testcheck'
import { setoidNumber, setoidString, setoidBoolean } from '../src/Setoid'
import { ordNumber } from '../src/Ord'
import { fieldInteger, fieldNumber } from '../src/Field'
import * as option from '../src/Option'
import { monoidSum, monoidString } from '../src/Monoid'

const NumberGenerator: Generator<number> = gen.number.suchThat(n => n !== Infinity && n !== -Infinity && !isNaN(n))
const IntegerGenerator: Generator<number> = gen.int
const OptionStringGenerator: Generator<option.Option<string>> = gen.string.then(n => option.of(n))
const agenerator = gen.string
const fagenerator = OptionStringGenerator
const SFA = option.getSetoid(setoidString)
const SFC = option.getSetoid(setoidBoolean)
const SFB = option.getSetoid(setoidNumber)
const ab = (a: string) => a.length
const bc = (b: number) => b >= 2
const fab = option.option.of(ab)
const fbc = option.option.of(bc)
const afb = (a: string) => option.option.of(ab(a))
const bfc = (b: number) => option.option.of(bc(b))

describe('laws', () => {
  it('getSemigroupLaws', () => {
    const S = option.getSemigroup(monoidString)
    checkLaws(getSemigroupLaws(S, OptionStringGenerator, SFA)).fold(assert.fail, () => undefined)
  })

  it('getMonoidLaws', () => {
    checkLaws(getMonoidLaws(monoidSum, IntegerGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('getApplicativeLaws', () => {
    checkLaws(getApplicativeLaws(option.option)(agenerator, SFA, SFC, SFB)(ab, bc)).fold(assert.fail, () => undefined)
  })

  it('getApplyLaws', () => {
    checkLaws(getApplyLaws(option.option)(fagenerator, SFA, SFC)(ab, bc, fab, fbc)).fold(assert.fail, () => undefined)
  })

  it('getChainLaws', () => {
    checkLaws(getChainLaws(option.option)(fagenerator, SFA, SFC)(ab, bc, fab, fbc, afb, bfc)).fold(
      assert.fail,
      () => undefined
    )
  })

  it('getFieldLaws', () => {
    checkLaws(getFieldLaws(fieldInteger, IntegerGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('getFunctorLaws', () => {
    checkLaws(getFunctorLaws(option.option)(fagenerator, SFA, SFC)(ab, bc)).fold(assert.fail, () => undefined)
  })

  it('getMonadLaws', () => {
    checkLaws(getMonadLaws(option.option)(agenerator, SFA, SFC, SFB)(ab, bc)).fold(assert.fail, () => undefined)
  })

  it('getOrdLaws', () => {
    checkLaws(getOrdLaws(ordNumber, NumberGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('getRingLaws', () => {
    checkLaws(getRingLaws(fieldNumber, IntegerGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('getSemiringLaws', () => {
    checkLaws(getSemiringLaws(fieldNumber, IntegerGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('getSetoidLaws', () => {
    checkLaws(getSetoidLaws(setoidNumber, NumberGenerator)).fold(assert.fail, () => undefined)
  })
})
