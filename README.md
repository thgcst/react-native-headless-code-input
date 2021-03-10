# react-native-code-input
A headless hook to handle verification code input.


[![npm](https://img.shields.io/npm/v/react-native-headless-code-input.svg?style=flat-square)](https://www.npmjs.com/package/react-native-headless-code-input)

Inspired by [react-dropzone](https://github.com/react-dropzone/react-dropzone) and [react-table](https://github.com/tannerlinsley/react-table), this is a hook completely UI-free.


## Installation


```bash
npm install react-native-headless-code-input
```
or:
```bash
yarn add react-native-headless-code-input
```


## Usage

```tsx static
import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import useCodeInput from 'react-native-headless-code-input';

import { Container, Wrapper, Field, Value } from './styles';

const App: React.FC = () => {
  const { wrapperProps, fields, inputProps, focusedId, value } = useCodeInput({
    length: 4,
    onFulfill: (code) => handleSubmit(code),
    onChangeText: (code) => handleChange(code),
  });
  return (
    <Container>
      <TouchableOpacity {...wrapperProps}>
        {fields.map(item => (
          <Field
            focused={focusedId === item.id}
            filled={Boolean(item.value)}
            key={item.id}
          >
            <Value>{item.value}</Value>
          </Field>
        ))}
      </TouchableOpacity>
      <TextInput {...inputProps} /> {/* Add this TextInput to handle input value */}
    </Container>
  );
};

export default App;

```

**IMPORTANT**: Under the hood, this lib makes use of [hooks](https://reactjs.org/docs/hooks-intro.html), therefore, using it requires React `>= 16.8`.
