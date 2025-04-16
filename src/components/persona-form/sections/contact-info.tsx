import { Box, Typography } from "@mui/material"
import { FC } from "react"
import { Field } from "react-final-form"
import { TextFieldComponent } from "../../shared/text-field/text-field"
import { required, validateRequiredEmail } from "@/constants/validations"
import InputMask from "react-input-mask"

export const ContactInfoSection: FC = () => {
    return (
        <Box>
            <Typography sx={{
                fontSize: 24,
                fontWeight: 500,
                marginBottom: 2,
            }}>
                Контактна інформація
            </Typography>

            <Box sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                mb: 3,
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                },
            }}>
                <Field
                    name={'email'}
                    validate={validateRequiredEmail}
                    render={({ input, meta }) => (
                        <TextFieldComponent
                            meta={meta}
                            required
                            label={'Електронна пошта'}
                            {...input}
                        />
                    )} />

                <Field
                    name={'phone'}
                    validate={required}
                    render={({ input, meta }) => (
                        <InputMask
                            mask="+38 (099) 999-99-99"
                            {...input}
                        >
                            {(props) => (
                                <TextFieldComponent
                                    meta={meta}
                                    required
                                    label={'Телефон'}
                                    {...props}
                                />
                            )}
                        </InputMask>
                    )} />
            </Box>
        </Box>
    )
} 