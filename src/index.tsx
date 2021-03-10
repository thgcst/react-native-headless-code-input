/* eslint-disable no-unused-expressions */
import React, { useState, useRef } from 'react';
import { TextInput, TextInputProps, TouchableOpacityProps } from 'react-native';

interface Props {
  /**
   * Code length
   */
  length: number;
  onFulfill?: (code: string) => void;
  onChangeText?: (code: string) => void
}

interface Field {
  value: string;
  id: number;
}

interface Return {
  wrapperProps: TouchableOpacityProps;
  inputProps: TextInputProps & { ref: React.RefObject<TextInput> };
  fields: Field[];
  focusedId: number | null;
  value: string;
}

const useCodeInput = (props: Props): Return => {
  const { length, onFulfill, onChangeText: changeText } = props;
  const inputRef = useRef<TextInput>(null);

  const [inputValue, setInputValue] = useState('');
  const [fields, setFields] = useState<Field[]>(
    Array(length)
      .fill({ value: '' })
      .map((item, id) => ({ ...item, id })),
  );
  const [focusedId, setFocusedId] = useState<null | number>(null);

  const onChangeText = (e: string) => {
    setInputValue(e);
    changeText?.(e)
    setFields(fields.map((_:Field, id:number) => ({ value: e[id] || '', id })));
    setFocusedId(e.length);
    if (onFulfill && e.length === length) {
      onFulfill(e);
    }
  };

  const onFocus = () => {
    setFocusedId(inputValue.length);
  };

  const onBlur = () => {
    setFocusedId(null);
  };

  return {
    wrapperProps: {
      onPress: () => {
        inputRef?.current?.focus();
      },
      activeOpacity: 1,
    },
    inputProps: {
      style: { display: 'none' },
      onChangeText,
      value: inputValue,
      keyboardType: 'number-pad',
      maxLength: length,
      onFocus,
      onBlur,
      ref: inputRef,
    },
    fields,
    focusedId,
    value: inputValue
  };
};

export default useCodeInput;
