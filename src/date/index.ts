import type { BlocksType } from '../common/types'
import {
  getFormattedValue,
  getMaxLength,
  headStr,
  stripDelimiters,
  stripNonNumeric,
  stripPrefix,
} from '../common/utils'
import { DefaultDateDelimiter, DefaultDatePattern } from './constants'
import type {
  DateCalculateOptions,
  DatePatternType,
  DateUnit,
  FormatDateOptions,
} from './types'

const getBlocksByDatePattern = (datePattern: DatePatternType): BlocksType =>
  datePattern.map((value: DateUnit) => {
    if (value === 'Y') {
      return 4
    } else {
      return 2
    }
  })

const getValidatedDate = ({
  value = '',
  blocks = [],
  datePattern,
}: DateCalculateOptions): string => {
  let result = ''

  blocks.forEach((length: number, index: number) => {
    if (value.length > 0) {
      let sub = value.slice(0, length)
      const sub0 = sub.slice(0, 1)
      const rest = value.slice(length)

      switch (datePattern[index]) {
        case 'd':
          if (sub === '00') {
            sub = '01'
          } else if (parseInt(sub0, 10) > 3) {
            sub = '0' + sub0
          } else if (parseInt(sub, 10) > 31) {
            sub = '31'
          }

          break

        case 'm':
          if (sub === '00') {
            sub = '01'
          } else if (parseInt(sub0, 10) > 1) {
            sub = '0' + sub0
          } else if (parseInt(sub, 10) > 12) {
            sub = '12'
          }

          break
      }

      result += sub

      // update remaining string
      value = rest
    }
  })

  return result
}

export const formatDate = (
  value: string,
  options?: FormatDateOptions
): string => {
  const {
    delimiterLazyShow = false,
    delimiter = DefaultDateDelimiter,
    delimiters = [],
    datePattern = DefaultDatePattern,
    prefix = '',
  } = options ?? {}
  if (delimiter.length > 0) {
    delimiters.push(delimiter)
  }

  // strip prefix
  value = stripPrefix({
    value,
    prefix,
  })

  // strip non-numeric characters
  value = stripNonNumeric(value)

  const blocks: BlocksType = getBlocksByDatePattern(datePattern)

  value = getValidatedDate({
    value,
    blocks,
    datePattern,
  })

  // strip delimiters
  value = stripDelimiters({
    value,
    delimiters,
  })

  // max length
  const maxLength = getMaxLength(blocks)
  value = headStr(value, maxLength)

  // calculate
  value = getFormattedValue({
    value,
    blocks,
    delimiters,
    delimiterLazyShow,
  })

  // prevent from showing prefix when no immediate option enabled with empty input value
  if (prefix.length > 0) {
    value = prefix + value
  }

  return value
}
