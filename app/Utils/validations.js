import {
  compose,
  curry,
  isEmpty,
  isNil,
  length,
  gte,
  test,
  not,
  view,
  set,
} from "ramda"
import { Success, Failure } from "data.validation"

export const getOrElse = (val) => (x) => x.getOrElse(val)

export const validate = curry((rule, lens, msg, data) =>
  rule(view(lens, data)) ? Success(data) : Failure([set(lens, msg, {})])
)

export const isRequired = compose(not, isEmpty)

export const IsNotNil = compose(not, isNil)
export const IsNotNilOrZero = (data) => IsNotNil(data) || data == 0

export const isNotNullOrEmpty = (data) => !isNullOrEmpty(data)

export const isNullOrEmpty = (data) => isNil(data) || isEmpty(data)

export const maxLength = (max) => compose(gte(max), length)

export const maxSize = curry((max, value) => gte(max, value))

export const emailFormat = test(/@/)

export const onlyAlpha = test(/^[a-zA-Z]*$/)

export const onlyAlphaNumeric = test(/^[a-zA-Z0-9]*$/)

export const onlyAlphaNumericUnderscore = test(/^[a-zA-Z0-9_]*$/)

export const onlyAlphaNumericSpace = test(/^[a-zA-Z0-9\s]*$/)

export const onlyAlphaNumericSpaceUnderscore = test(/^[a-zA-Z0-9_\s]*$/)

export const onlyAlphaNumericSpaceSpecial = test(
  /^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+\s]*$/
)

export const phoneFormat = test(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)

export const urlFormat = test(/^[a-zA-Z0-9_.~!*''();:@&=+$,/?#[%-\]+]*$/)

export const onlyNumeric = test(/^[0-9]*$/)

export const allCaps = (str) => str.toUpperCase() === str

export const isNilOrEmptyOrAtom = (item) =>
  isNil(item) || isEmpty(item) || item === "{$type:atom}"

export const isEqual = (input1) => (input2) => input2 === input1

export const isUniq = (xs) => (x) => not(xs.includes(x))
