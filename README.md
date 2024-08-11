# `cleave-meiso`

[![npm version](https://badge.fury.io/js/cleave-meiso.svg)](https://badge.fury.io/js/cleave-meiso)
[![npm downloads](https://img.shields.io/npm/dm/cleave-meiso.svg)](https://www.npmjs.com/package/cleave-meiso)

A simple library to help you format input text content. Forked from [cleave-zen](https://github.com/nosir/cleave-zen) to add some features I needed myself, e.g. time/date range formatting.

## Features

- Credit card formatting
- Numeral formatting
- Date / Time formatting
- Date Range / Time Range formatting
- Custom delimiter, prefix and blocks pattern
- Non-intrusive: only providing the formatting methods

**TL;DR** [Demo](https://nosir.github.io/cleave-meiso)

## Install

```sh
npm install --save cleave-meiso
```

You can use it on [unpkg.com](https://unpkg.com/cleave-meiso) as a CDN version

## Usage

### Basic

You have two text fields to display credit card number and type

```html
<input class="creditcard-input" type="text" />
<input class="creditcard-type" type="text" />
```

Now in your JavaScript

```js
import { formatCreditCard, getCreditCardType } from 'cleave-meiso'

const creditcardInput = document.querySelector('.creditcard-input')
const creditCardType = document.querySelector('.creditcard-type')

creditcardInput.addEventListener('input', e => {
  const value = e.target.value
  creditcardInput.value = formatCreditCard(value)
  creditCardType.innerHTML = getCreditCardType(value)
})
```

### ReactJS (hook)

```js
import React, { useRef, useState } from 'react'
import { formatCreditCard, getCreditCardType } from 'cleave-meiso'

const App = () => {
  const inputRef = useRef(null)
  const [value, setValue] = useState('')
  const [type, setType] = useState('')

  return (
    <>
      <input
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
```

### TypeScript

This lib is written by TypeScript, so if you prefer to use it that way:

```js
import { formatCreditCard, type FormatCreditCardOptions } from 'cleave-meiso'

const options: FormatCreditCardOptions = { delimiter: '-' }
const value: string = formatCreditCard('5163000011112222', options)
```

### Track cursor (optional)

When you manually updating the input field with formatted value, the cursor
moves to the end of the field, which can be super annoying when you typing or
deleting letters inside the string content.

This library can fix this issue for you! Simply add `registerCursorTracker` for
the input field:

```js
import { registerCursorTracker, DefaultCreditCardDelimiter } from 'cleave-meiso'

registerCursorTracker({ input: creditCardInput, delimiter: DefaultCreditCardDelimiter }})
```

And for ReactJS usage above:

```js
import { useRef, useEffect } from 'react'

...

const inputRef = useRef(null)
useEffect(() => {
    // registerCursorTracker itself returns an unregister destructor
    // function so you can place it here for hook component unmount
    return registerCursorTracker({ input: inputRef.current, delimiter: DefaultCreditCardDelimiter })
}, [])

...
```

## Documentation

- [API](https://github.com/nosir/cleave-meiso/blob/main/docs/modules.md)

