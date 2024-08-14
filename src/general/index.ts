import {
  getFormattedValue,
  stripDelimiters,
  stripNonNumeric,
  stripPrefix,
} from '../common/utils'
import type { FormatGeneralOptions } from './types'

export const formatGeneral = (
  value: string,
  options: FormatGeneralOptions
): string => {
  const {
    blocks,
    delimiter = '',
    delimiters = [],
    delimiterLazyShow = false,
    prefix = '',
    numericOnly = false,
    uppercase = false,
    lowercase = false,
  } = options

  if (delimiter.length > 0) {
    delimiters.push(delimiter)
  }

  // strip delimiters
  value = stripDelimiters({
    value,
    delimiters,
  })

  // strip prefix
  value = stripPrefix({
    value,
    prefix,
  })

  // strip non-numeric characters
  value = numericOnly ? stripNonNumeric(value) : value

  // convert case
  value = uppercase ? value.toUpperCase() : value
  value = lowercase ? value.toLowerCase() : value

  // prevent from showing prefix when no immediate option enabled with empty input value
  if (prefix.length > 0) {
    value = prefix + value
  }

  // apply blocks
  value = getFormattedValue({
    value,
    blocks,
    delimiter,
    delimiters,
    delimiterLazyShow,
  })

  return value
}

export const unformatGeneral = (
  value: string,
  options: Pick<FormatGeneralOptions, 'delimiter' | 'delimiters'>
): string => {
  const { delimiter = '', delimiters = [] } = options
  return stripDelimiters({ value, delimiters: [...delimiters, delimiter] })
}
