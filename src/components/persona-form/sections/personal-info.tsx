import { Box, Typography } from "@mui/material"
import { FC } from "react"
import { Field } from "react-final-form"
import { TextFieldComponent } from "../../shared/text-field/text-field"
import { required } from "@/constants/validations"
import { FormApi } from "final-form"
import { FormValues } from "../persona-form"

interface PersonalInfoProps {
    patronymicChecked: boolean
    setPatronymicChecked: (checked: boolean) => void
    form: FormApi<FormValues, Partial<FormValues>>
}

export const PersonalInfoSection: FC<PersonalInfoProps> = ({ patronymicChecked, setPatronymicChecked, form }) => {
    return (
        <Box>
            <Typography sx={{
                fontSize: 24,
                fontWeight: 500,
                marginBottom: 2,
            }}>
                Дані пацієнта
            </Typography>

            <Box sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                mb: 3,
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: '1fr 1fr',
                    md: '1fr 1fr 1fr',
                },
            }}>
                <Field
                    name={'surname'}
                    validate={required}
                    render={({ input, meta }) => (
                        <TextFieldComponent
                            meta={meta}
                            required
                            label={'Прізвище'}
                            {...input}
                        />
                    )} />

                <Field
                    name={'name'}
                    validate={required}
                    render={({ input, meta }) => (
                        <TextFieldComponent
                            meta={meta}
                            required
                            label={'Ім\'я'}
                            {...input}
                        />
                    )} />

                <Field
                    name={'patronymic'}
                    validate={required}
                    render={({ input, meta }) => (
                        <TextFieldComponent
                            {...input}
                            meta={meta}
                            required={patronymicChecked}
                            label={'По батькові'}
                            disabled={!patronymicChecked}
                            helperText={!patronymicChecked ? 'Немає по батькові згідно документів' : (meta.touched && meta.error)}
                            showSwitch
                            switchChecked={patronymicChecked}
                            switchOnChange={(e) => {
                                setPatronymicChecked(e.target.checked);
                                if (!e.target.checked) {
                                    form.change('patronymic', 'Немає по батькові');
                                }
                            }}
                        />
                    )} />
            </Box>
        </Box>
    )
} 