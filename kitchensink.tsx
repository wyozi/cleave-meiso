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
  placeholder: string,
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
      className="border p-1"
      ref={inputRef}
      value={value}
      placeholder={placeholder}
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
    <ExampleBlock title="credit card" code={`formatCreditCard(value)`}>
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
    </ExampleBlock>
  )
}

function DateFormatting() {
  const date = useCleaveExample('2024-08-11', ['-'], value =>
    formatDate(value, {
      delimiter: '-',
      datePattern: ['Y', 'm', 'd'],
    })
  )
  const monthYear = useCleaveExample('08/24', ['/'], value =>
    formatDate(value, {
      datePattern: ['m', 'y'],
    })
  )

  return (
    <>
      <ExampleBlock
        title="date"
        code={`formatDate(value, {
  delimiter: '-',
  datePattern: ['Y', 'm', 'd'],
})`}
      >
        {date}
      </ExampleBlock>
      <ExampleBlock
        title="month year"
        code={`formatDate(value, {
  datePattern: ['m', 'y'],
})`}
      >
        {monthYear}
      </ExampleBlock>
    </>
  )
}

function TimeFormatting() {
  const hms = useCleaveExample('12:05:02', [':'], value =>
    formatTime(value, {
      timePattern: ['h', 'm', 's'],
    })
  )
  const hm = useCleaveExample('16:04', [':'], value =>
    formatTime(value, {
      timePattern: ['h', 'm'],
    })
  )

  return (
    <>
      <ExampleBlock
        code={`formatTime(value, {
  timePattern: ['h', 'm', 's'],
})`}
      >
        {hms}
      </ExampleBlock>
      <ExampleBlock
        code={`formatTime(value, {
  timePattern: ['h', 'm'],
})`}
      >
        {hm}
      </ExampleBlock>
    </>
  )
}

function TimeRange() {
  const ex = useCleaveExample('08:00 — 16:00', [':', ' — '], value =>
    formatTime(value, {
      delimiters: [':', ' — ', ':'],
      timePattern: ['h', 'm', 'h', 'm'],
    })
  )

  return (
    <ExampleBlock
      title="time range"
      code={`formatTime(value, {
  delimiters: [':', ' — ', ':'],
  timePattern: ['h', 'm', 'h', 'm'],
})`}
    >
      {ex}
    </ExampleBlock>
  )
}

function Duration() {
  const ex = useCleaveExample('08h45', ['h'], value =>
    formatTime(value, {
      delimiters: ['h'],
      timePattern: ['xx', 'm'],
    })
  )

  return (
    <ExampleBlock
      title="duration"
      code={`formatTime(value, {
  delimiters: ['h'],
  timePattern: ['xx', 'm'],
})`}
    >
      {ex}
    </ExampleBlock>
  )
}

function DateRange() {
  const ex = useCleaveExample('01.03.2024 — 14.08.2024', ['.', ' — '], value =>
    formatDate(value, {
      delimiters: ['.', '.', ' — ', '.', '.'],
      datePattern: ['d', 'm', 'Y', 'd', 'm', 'Y'],
    })
  )

  return (
    <ExampleBlock
      title="date range"
      code={`formatDate(value, {
  delimiters: ['.', '.', ' — ', '.', '.'],
  datePattern: ['d', 'm', 'Y', 'd', 'm', 'Y'],
})`}
    >
      {ex}
    </ExampleBlock>
  )
}

function ExampleBlock({
  title,
  code,
  children,
}: {
  title: string
  code: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-between p-4 border-2 border-black">
      <h2 className="font-semibold mb-4 text-lg">{title}</h2>
      <div>{children}</div>
      <div className="bg-black whitespace-pre text-white font-mono mt-8 rounded p-1">
        {code}
      </div>
    </div>
  )
}

function App() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4">
      <CreditCard />
      <DateFormatting />
      <TimeFormatting />
      <TimeRange />
      <Duration />
      <DateRange />
    </div>
  )
}
const domNode = document.getElementById('root')
const root = createRoot(domNode)
root.render(<App />)
