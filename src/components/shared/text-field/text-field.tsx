import { InputAdornment, Switch, TextField } from "@mui/material"
import { FC } from "react"
import { FieldMetaState } from "react-final-form"
import { ErrorOutline } from "@mui/icons-material"
import React from 'react'

interface TextFieldComponentProps {
    meta: FieldMetaState<string>
    shrinkLabel?: boolean
    helperText?: string
    showSwitch?: boolean
    switchChecked?: boolean
    switchOnChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
    [key: string]: unknown
}

export const TextFieldComponent: FC<TextFieldComponentProps> = (props) => {
    const { meta, showSwitch, switchChecked, switchOnChange, helperText, shrinkLabel, ...rest } = props

    return <TextField
        {...rest}
        slotProps={{
            inputLabel: {
                shrink: shrinkLabel,
            },
            formHelperText: {
                sx: { textAlign: helperText ? 'left' : 'right', width: '100%', ml: 'auto' },
            },
            input: {
                endAdornment:
                    <>
                        {(meta.touched && meta.error) && (
                        <InputAdornment position="end">
                            <ErrorOutline sx={{ color: 'error.main' }} />
                        </InputAdornment>)}
                        {showSwitch && (
                            <InputAdornment position="end">
                                <Switch checked={switchChecked} onChange={switchOnChange} color="default" />
                            </InputAdornment>
                        )}
                    </>
            }
        }}
        variant={'standard'}
        error={!!meta.error && meta.touched}
        helperText={helperText || (meta.touched && meta.error)}
    />
}