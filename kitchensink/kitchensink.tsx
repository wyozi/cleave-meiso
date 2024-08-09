import * as React from 'react'
import { createRoot } from 'react-dom/client'
import {
  DefaultCreditCardDelimiter,
  formatCreditCard,
  formatDate,
  formatTime,
  getCreditCardType,
  registerCursorTracker,
} from '../src/index'

function useCleaveExample(
  delimiters: string[],
  callback: (value: string) => string
) {
  const inputRef = React.useRef(null)
  const [value, setValue] = React.useState('')

  React.useEffect(() => {
    return registerCursorTracker({
      input: inputRef.current,
      delimiters,
    })
  }, [delimiters])

  return (
    <input
      className="border"
      ref={inputRef}
      value={value}
      onChange={e => {
        const value = e.target.value
        setValue(callback(value))
      }}
    />
  )
}

function CreditCard() {
  const inputRef = React.useRef(null)
  const [value, setValue] = React.useState('')
  const [type, setType] = React.useState('')

  React.useEffect(() => {
    return registerCursorTracker({
      input: inputRef.current,
      delimiter: DefaultCreditCardDelimiter,
    })
  }, [])

  return (
    <>
      <input
        className="border"
        ref={inputRef}
        value={value}
        onChange={e => {
          const value = e.target.value
          setValue(formatCreditCard(value))
          setType(getCreditCardType(value))
        }}
      />
      <div>value: {value}</div>
      <div>type: {type}</div>
    </>
  )
}

function DateFormatting() {
  const date = useCleaveExample(['-'], value =>
    formatDate(value, {
      delimiter: '-',
      datePattern: ['Y', 'm', 'd'],
    })
  )
  const monthYear = useCleaveExample(['/'], value =>
    formatDate(value, {
      datePattern: ['m', 'y'],
    })
  )

  return (
    <>
      <ExampleBlock>{date}</ExampleBlock>
      <ExampleBlock>{monthYear}</ExampleBlock>
    </>
  )
}

function TimeFormatting() {
  const hms = useCleaveExample([':'], value =>
    formatTime(value, {
      timePattern: ['h', 'm', 's'],
    })
  )
  const hm = useCleaveExample([':'], value =>
    formatTime(value, {
      timePattern: ['h', 'm'],
    })
  )

  return (
    <>
      <ExampleBlock>{hms}</ExampleBlock>
      <ExampleBlock>{hm}</ExampleBlock>
    </>
  )
}

function TimeRange() {
  const ex = useCleaveExample([':', ' — '], value =>
    formatTime(value, {
      delimiters: [':', ' — ', ':'],
      timePattern: ['h', 'm', 'h', 'm'],
    })
  )

  return ex
}

function Duration() {
  const ex = useCleaveExample(['h'], value =>
    formatTime(value, {
      delimiters: ['h'],
      timePattern: ['xx', 'm'],
    })
  )

  return ex
}

function DateRange() {
  const ex = useCleaveExample(['.', ' — '], value =>
    formatDate(value, {
      delimiters: ['.', '.', ' — ', '.', '.'],
      datePattern: ['d', 'm', 'Y', 'd', 'm', 'Y'],
    })
  )

  return ex
}

function ExampleBlock({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center border-2 border-black">
      {children}
    </div>
  )
}

function App() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 grid-rows-2 h-screen">
      <ExampleBlock>
        <CreditCard />
      </ExampleBlock>
      <DateFormatting />
      <TimeFormatting />
      <ExampleBlock>
        <TimeRange />
      </ExampleBlock>
      <ExampleBlock>
        <Duration />
      </ExampleBlock>
      <ExampleBlock>
        <DateRange />
      </ExampleBlock>
    </div>
  )
}
const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(<App />)
