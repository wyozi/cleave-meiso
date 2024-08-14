import type {
  BlocksType,
  DelimiterType,
  GetFormattedValueProps,
  GetPrefixStrippedValueProps,
  StripDelimitersProps,
} from './types'

// const test = (): string => {
//   return 'test-eslint'
// }

export const isString = (value: any): value is string =>
  typeof value === 'string'

export const stripNonNumeric = (value: string): string =>
  value.replace(/[^\d]/g, '')

export const getMaxLength = (blocks: BlocksType): number =>
  blocks.reduce((previous: number, current: number) => previous + current, 0)

export const headStr = (str: string, length: number): string =>
  str.slice(0, length)

/**
 * create a regexp that matches given delimiter
 * escapes the delimiter if it's a special character
 */
export const getDelimiterRegexByDelimiter = (delimiter: string): RegExp =>
  new RegExp(delimiter.replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1'), 'g')

/**
 * strips all delimiters from the value
 */
export const stripDelimiters = ({
  value,
  delimiters,
}: StripDelimitersProps): string => {
  delimiters.forEach((current: DelimiterType) => {
    current.split('').forEach(letter => {
      value = value.replace(getDelimiterRegexByDelimiter(letter), '')
    })
  })

  return value
}

// strip prefix
export const stripPrefix = ({
  value,
  prefix,
}: GetPrefixStrippedValueProps): string => {
  const prefixLength: number = prefix.length

  // No prefix
  if (prefixLength === 0) {
    return value
  }

  // Value is prefix
  if (value === prefix && value !== '') {
    return ''
  }

  // result prefix string does not match pre-defined prefix
  if (value.slice(0, prefixLength) !== prefix) {
    return ''
  }

  // No issue, strip prefix for new value
  return value.slice(prefixLength)
}

export const getFormattedValue = ({
  value,
  blocks,
  delimiter = '',
  delimiters = [],
  delimiterLazyShow = false,
}: GetFormattedValueProps): string => {
  let result = ''
  let valueRemaining = value
  let currentDelimiter = ''

  blocks.forEach((length: number, index: number) => {
    if (valueRemaining.length > 0) {
      const sub = valueRemaining.slice(0, length)
      const rest = valueRemaining.slice(length)

      if (delimiters.length > 0) {
        currentDelimiter =
          delimiters[delimiterLazyShow ? index - 1 : index] ?? currentDelimiter
      } else {
        currentDelimiter = delimiter
      }

      if (delimiterLazyShow) {
        if (index > 0) {
          result += currentDelimiter
        }

        result += sub
      } else {
        result += sub

        if (sub.length === length && index < blocks.length - 1) {
          result += currentDelimiter
        }
      }

      // update remaining string
      valueRemaining = rest
    }
  })

  return result
}
