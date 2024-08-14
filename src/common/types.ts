export type RequireExactlyOne<T, Keys extends keyof T = keyof T> = {
  [K in Keys]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<Keys, K>>>
}[Keys]

export type DelimiterType = string
export type BlocksType = number[]

export interface StripDelimitersProps {
  value: string
  delimiters: DelimiterType[]
}

export interface GetFormattedValueProps {
  value: string
  blocks: BlocksType
  delimiter?: DelimiterType
  delimiters?: DelimiterType[]
  delimiterLazyShow?: boolean
}

export interface GetPrefixStrippedValueProps {
  value: string
  prefix: string
}
