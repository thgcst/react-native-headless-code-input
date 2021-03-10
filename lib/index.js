/* eslint-disable no-unused-expressions */
import { useState, useRef } from 'react';
const useCodeInput = (props) => {
    const { length, onFulfill } = props;
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');
    const [fields, setFields] = useState(Array(length)
        .fill({ value: '' })
        .map((item, id) => (Object.assign(Object.assign({}, item), { id }))));
    const [focusedId, setFocusedId] = useState(null);
    const onChangeText = (e) => {
        setInputValue(e);
        setFields(fields.map((_, id) => ({ value: e[id] || '', id })));
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
                var _a;
                (_a = inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
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
    };
};
export default useCodeInput;
