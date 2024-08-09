import type { BlocksType } from '../common/types'
import {
  getFormattedValue,
  getMaxLength,
  headStr,
  stripDelimiters,
  stripNonNumeric,
} from '../common/utils'
import {
  DefaultTimeDelimiter,
  DefaultTimeFormat,
  DefaultTimePattern,
} from './constants'
import type {
  FormatTimeOptions,
  GetValidatedTimeProps,
  TimeFormatOptions,
  TimeFormatType,
  TimePatternType,
} from './types'

const getTimeFormatOptions = (
  timeFormat: TimeFormatType
): TimeFormatOptions => {
  if (timeFormat === '12') {
    return {
      maxHourFirstDigit: 1,
      maxHours: 12,
      maxMinutesFirstDigit: 5,
      maxMinutes: 60,
    }
  }

  return {
    maxHourFirstDigit: 2,
    maxHours: 23,
    maxMinutesFirstDigit: 5,
    maxMinutes: 60,
  }
}

const getBlocksByTimePattern = (timePattern: TimePatternType): BlocksType =>
  timePattern.map(item => (item.includes('x') ? item.length : 2))

const getValidatedTime = ({
  value,
  blocks,
  timePattern,
  timeFormat,
}: GetValidatedTimeProps): string => {
  let result: string = ''

  const timeFormatOptions: TimeFormatOptions = getTimeFormatOptions(timeFormat)

  blocks.forEach((length: number, index: number) => {
    if (value.length > 0) {
      let sub = value.slice(0, length)
      const sub0 = sub.slice(0, 1)

      switch (timePattern[index]) {
        case 'h':
          if (parseInt(sub0, 10) > timeFormatOptions.maxHourFirstDigit) {
            sub = '0' + sub0
          } else if (parseInt(sub, 10) > timeFormatOptions.maxHours) {
            sub = timeFormatOptions.maxHours + ''
          }

          break
        case 'm':
        case 's':
          if (parseInt(sub0, 10) > timeFormatOptions.maxMinutesFirstDigit) {
            sub = '0' + sub0
          } else if (parseInt(sub, 10) > timeFormatOptions.maxMinutes) {
            sub = timeFormatOptions.maxMinutes + ''
          }
          break
      }

      result += sub

      // update remaining string
      value = value.slice(length)
    }
  })

  return result
}

export const formatTime = (
  value: string,
  options?: FormatTimeOptions
): string => {
  const {
    delimiterLazyShow = false,
    delimiter = DefaultTimeDelimiter,
    delimiters = [],
    timePattern = DefaultTimePattern,
    timeFormat = DefaultTimeFormat,
  } = options ?? {}
  if (delimiter.length > 0) {
    delimiters.push(delimiter)
  }

  // strip non-numeric characters
  value = stripNonNumeric(value)

  const blocks: BlocksType = getBlocksByTimePattern(timePattern)
  value = getValidatedTime({
    value,
    blocks,
    timePattern,
    timeFormat,
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

  return value
}
