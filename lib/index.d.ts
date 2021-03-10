import React from 'react';
import { TextInput, TextInputProps, TouchableOpacityProps } from 'react-native';
interface Props {
    /**
     * Code length
     */
    length: number;
    onFulfill?: (code: string) => void;
    onChangeText?: (code: string) => void;
}
interface Field {
    value: string;
    id: number;
}
interface Return {
    wrapperProps: TouchableOpacityProps;
    inputProps: TextInputProps & {
        ref: React.RefObject<TextInput>;
    };
    fields: Field[];
    focusedId: number | null;
    value: string;
}
declare const useCodeInput: (props: Props) => Return;
export default useCodeInput;
