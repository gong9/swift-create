import React, { FC, useState } from 'react'
import { Box, Text } from 'ink';
import TextInput from 'ink-text-input';

interface ConfirmInputProps {
    description: string
    onSubmit: (value: boolean) => void
}

const ConfirmInput: FC<ConfirmInputProps> = ({ onSubmit, description }) => {
    const [value, setValue] = useState('Y');
    const [isChecked, setIsChecked] = useState(true);

    const validator = (data: string, type: 'change' | 'submit') => {
        type === 'change' && setValue(data)

        if (data === "Y" || data === "y" || data === "N" || data === "n") {
            setIsChecked(true)
            return true
        } else {
            setIsChecked(false)
            return false
        }
    }

    const handleSubmit = (value: string) => {
        if (validator(value, 'submit')) {
            onSubmit(value === "Y" || value === "y" ? true : false)
        }
    }

    return (
        <Box flexDirection='column'>
            <Box>
                <Text>{description} (Y/n)</Text>
                <TextInput
                    value={value}
                    onChange={(data) => validator(data, 'change')}
                    onSubmit={handleSubmit}
                />
            </Box>

            <Box marginTop={1}>
                {!isChecked && <Text color="red">请输入正确的格式!</Text>}
            </Box>
        </Box>
    );
}

export default ConfirmInput;