import * as assert from 'assert'
import {
  checkLaws,
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
  it('checkFieldLaws', () => {
    checkLaws(getFieldLaws(fieldInteger, IntegerGenerator, setoidNumber)).fold(assert.fail, () => undefined)
  })

  it('checkFunctorLaws', () => {
    const SA = option.getSetoid(setoidString)
    const SC = option.getSetoid(setoidBoolean)
    checkLaws(getFunctorLaws(option.option)(OptionStringGenerator, SA, SC)(s => s.length, n => n >= 2)).fold(
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
