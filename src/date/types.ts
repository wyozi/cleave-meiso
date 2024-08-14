import type { BlocksType, DelimiterType } from '../common/types'

export type DateUnit = 'Y' | 'y' | 'm' | 'd'
export type DatePatternType = DateUnit[]

export interface FormatDateOptions {
  delimiterLazyShow?: boolean
  delimiter?: DelimiterType
  delimiters?: DelimiterType[]
  datePattern?: DatePatternType
  prefix?: string
}

export interface DateCalculateOptions {
  date?: number[]
  value?: string
  blocks?: BlocksType
  datePattern: DatePatternType
}
