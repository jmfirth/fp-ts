// @flow
import { Identity, identity } from './lib/Identity'
import type { Option } from './lib/Option'
import { option, some, none, fromNullable, mapNullable } from './lib/Option'
import type { Either } from './lib/Either'
import { right, either, fromNullable as fromNullableEither } from './lib/Either'
import { IO, io } from './lib/IO'
import { array } from './lib/Array'
import type { Validation } from './lib/Validation'
import { success, validation } from './lib/Validation'
import { Task, task } from './lib/Task'
import { getMonad } from './lib/These'
import type { These } from './lib/These'
import { semigroupSum } from './lib/Semigroup'

const double = (n: number): number => n * 2
const len = (s: string): number => s.length

//
// Identity
//
;(identity.traverse(either)(a => (right(a): Either<string, number>), new Identity(1)): Either<string, Identity<number>>)
;(new Identity(1).traverse(either)(a => (right(a): Either<string, number>)): Either<string, Identity<number>>)

//
// Option
//

// $FlowFixMe
;(some(1).map(double): Option<string>)
;(some(1).map(double): Option<number>)

declare var o1: ?number
fromNullable(o1).map(n => n * 2)
declare var fo1: number => ?number
some(1)
  .mapNullable(fo1)
  .map(n => n * 2)

//
// Either
//
const e1: Either<string, number> = right(1)
;(e1.toOption(): Option<number>)

declare var e2: ?number
fromNullableEither('foo')(e2).map(n => n * 2)

//
// Functor
//

import { lift } from './lib/Functor'

const liftedEitherDouble = lift(either)(double)
// $FlowFixMe
;(liftedEitherDouble(e1): number)
// $FlowFixMe
;(liftedEitherDouble(e1): Either<string, string>)
;(liftedEitherDouble(e1): Either<string, number>)

const liftedIdentityDouble = lift(identity)(double)
// $FlowFixMe
;(liftedIdentityDouble(new Identity(1)): number)
// $FlowFixMe
;(liftedIdentityDouble(new Identity(1)): Identity<string>)
;(liftedIdentityDouble(new Identity(1)): Identity<number>)

const liftedIODouble = lift(io)(double)
// $FlowFixMe
;(liftedIODouble(io.of(1)): number)
// $FlowFixMe
;(liftedIODouble(io.of(1)): IO<string>)
;(liftedIODouble(io.of(1)): IO<number>)

const liftOption = lift(option)
const liftedOptionDouble = liftOption(double)
// $FlowFixMe
;(liftedOptionDouble(some(1)): number)
// $FlowFixMe
;(liftedOptionDouble(some(1)): Option<string>)
;(liftedOptionDouble(some(1)): Option<number>)
const liftedOptionLen = liftOption(len)
;(liftedOptionLen(some('foo')): Option<number>)

const liftedTaskDouble = lift(task)(double)
// $FlowFixMe
;(liftedTaskDouble(task.of(1)): number)
// $FlowFixMe
;(liftedTaskDouble(task.of(1)): Task<string>)
;(liftedTaskDouble(task.of(1)): Task<number>)

const liftedTheseDouble = lift(getMonad(semigroupSum))(double)
// $FlowFixMe
;(liftedTheseDouble(these.of(1)): number)
// $FlowFixMe
;(liftedTheseDouble(these.of(1)): These<string, string>)
;(liftedTheseDouble(these.of(1)): These<string, number>)

const liftedValidationDouble = lift(validation)(double)
// $FlowFixMe
;(liftedValidationDouble(success(1)): number)
// $FlowFixMe
;(liftedValidationDouble(success(1)): Validation<string, string>)
;(liftedValidationDouble(success(1)): Validation<string, number>)

//
// Apply
//
import { liftA2 } from './lib/Apply'

const sum = (a: number) => (b: number): number => a + b
const liftedA2OptionSum = liftA2(option)(sum)
// $FlowFixMe
;(liftedA2OptionSum(option.some(1)): number)
;(liftedA2OptionSum(some(1))(some(2)): Option<number>)

//
// Applicative
//
import { getApplicativeComposition } from './lib/Applicative'
const arrayOptionApplicative = getApplicativeComposition(array, option)
// $FlowFixMe
;(arrayOptionApplicative.map(double, arrayOptionApplicative.of(1)): Array<Option<string>>)
;(arrayOptionApplicative.map(double, arrayOptionApplicative.of(1)): Array<Option<number>>)
const arrayEitherApplicative = getApplicativeComposition(array, either)
// $FlowFixMe
;(arrayEitherApplicative.map(len, (arrayEitherApplicative.of('foo'): Array<Either<string, string>>)): Array<
  Either<boolean, number>
>)
;(arrayEitherApplicative.map(len, (arrayEitherApplicative.of('foo'): Array<Either<string, string>>)): Array<
  Either<string, number>
>)

//
// Traversable
//
import { sequence, getTraversableComposition } from './lib/Traversable'
const sequenceOptions = sequence(option, array)([some(1), none])
// $FlowFixMe
;(sequenceOptions: number)
// $FlowFixMe
;(sequenceOptions: Option<number>)
;(sequenceOptions: Option<Array<number>>)

const arrayOptionTraversable = getTraversableComposition(array, option)
;(arrayOptionTraversable.traverse(either)(a => (right(len(a)): Either<string, number>), [some('foo'), none]): Either<
  string,
  Array<Option<number>>
>)

import { compose, pipe, curry } from './lib/function'

const fun1 = (s: string): number => s.length
const fun2 = (n: number): number => n * 2
const fun3 = (n: number): boolean => n >= 2

const fun4 = compose(fun2, fun1)
const fun4x1: number = fun4('foo')
const fun5 = compose(fun3, fun2, fun1)
const fun5x1: boolean = fun5('foo')

const fun6 = pipe(fun1, fun2)
const fun6x1: number = fun6('foo')
const fun7 = pipe(fun1, fun2, fun3)
const fun7x1: boolean = fun7('foo')

const fun8 = (a: number, b: string, c: boolean) => a >= 2 && b.length < 2 && c
const fun8x1: boolean = curry(fun8)(2)('a')(true)
