import * as assert from 'assert'
import {
  checkLaws,
  getApplicativeLaws,
  getApplyLaws,
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

const NumberGenerator: Generator<number> = gen.number.suchThat(n => n !== Infinity && n !== -Infinity && !isNaN(n))

const IntegerGenerator: Generator<number> = gen.int

const OptionStringGenerator: Generator<option.Option<string>> = gen.string.then(n => option.of(n))

describe('laws', () => {
  it('checkApplicativeLaws', () => {
    const agenerator = gen.string
    const SFA = option.getSetoid(setoidString)
    const SFC = option.getSetoid(setoidBoolean)
    const SFB = option.getSetoid(setoidNumber)
    const g = (s: string) => s.length
    const f = (n: number) => n >= 2
    checkLaws(getApplicativeLaws(option.option)(agenerator, SFA, SFC, SFB)(g, f)).fold(assert.fail, () => undefined)
  })

  it('checkApplyLaws', () => {
    const fagenerator = OptionStringGenerator
    const SFA = option.getSetoid(setoidString)
    const SFC = option.getSetoid(setoidBoolean)
    const g = (s: string) => s.length
    const f = (n: number) => n >= 2
    const fab = option.option.of(g)
    const fbc = option.option.of(f)
    checkLaws(getApplyLaws(option.option)(fagenerator, SFA, SFC)(g, f, fab, fbc)).fold(assert.fail, () => undefined)
  })

  it('checkFieldLaws', () => {
    checkLaws(getFieldLaws(fieldInteger, IntegerGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('checkFunctorLaws', () => {
    const fagenerator = OptionStringGenerator
    const SFA = option.getSetoid(setoidString)
    const SFC = option.getSetoid(setoidBoolean)
    checkLaws(getFunctorLaws(option.option)(fagenerator, SFA, SFC)(s => s.length, n => n >= 2)).fold(
      assert.fail,
      () => undefined
    )
  })

  it('checkOrdLaws', () => {
    checkLaws(getOrdLaws(ordNumber, NumberGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('checkRingLaws', () => {
    checkLaws(getRingLaws(fieldNumber, IntegerGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('checkSemiringLaws', () => {
    checkLaws(getSemiringLaws(fieldNumber, IntegerGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('checkSetoidLaws', () => {
    checkLaws(getSetoidLaws(setoidNumber, NumberGenerator)).fold(assert.fail, () => undefined)
  })
})
