# @usereact/use-form-fields

> react hook to simplify forms

[![NPM](https://img.shields.io/npm/v/@usereact/use-form-fields.svg)](https://www.npmjs.com/package/@usereact/use-form-fields)

## Install

```bash
npm install --save @usereact/use-form-fields
```

## Usage

```tsx
import React from 'react'

import useFormFields from '@usereact/use-form-fields'

const initialValues = {
  name: '',
  email: '',
  message: '',
}

function Example() {
  const { values, fields } = useFormFields(initialValues)

  const handleSubmit = e => {
    e.preventDefault();
    console.log('values: ', values)
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input type="text" {...fields.name} />
      <label>Email: </label>
      <input type="email" {...fields.email} />
      <label>Message: </label>
      <textarea {...fields.message} />
      <button type="submit">Submit</button>
    </form>
  )
}
```

## License

MIT © [JuHwon](https://github.com/JuHwon)
