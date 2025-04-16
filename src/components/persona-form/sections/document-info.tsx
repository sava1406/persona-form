import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material"
import { FC } from "react"
import { Field } from "react-final-form"
import { FormApi } from "final-form"
import { TextFieldComponent } from "../../shared/text-field/text-field"
import { required, validateDoc } from "@/constants/validations"
import { documentTypes } from "@/constants/options"

interface DocumentInfoProps {
    form: FormApi
}

export const DocumentInfoSection: FC<DocumentInfoProps> = ({ form }) => {
    return (
        <Box>
            <Typography sx={{
                fontSize: 24,
                fontWeight: 500,
                marginBottom: 2,
            }}>
                Документ, що посвідчує особу
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
                    name={'documentType'}
                    validate={required}
                    render={({ input, meta }) => (
                        <FormControl variant="standard" error={!!meta.error && meta.touched}>
                            <InputLabel>Тип документа</InputLabel>
                            <Select
                                {...input}
                                label="Тип документа"
                            >
                                {documentTypes.map((type) => (
                                    <MenuItem key={type.value} value={type.value}>
                                        {type.label}
                                    </MenuItem>
                                ))}
                            </Select>
                            {meta.touched && meta.error && (
                                <FormHelperText>{meta.error}</FormHelperText>
                            )}
                        </FormControl>
                    )} />

                <Field
                    name={'documentNumber'}
                    validate={(value) => validateDoc(form.getState().values.documentType, value)}
                    render={({ input, meta }) => (
                        <TextFieldComponent
                            meta={meta}
                            required
                            label={'Номер документа'}
                            {...input}
                        />
                    )} />
            </Box>
        </Box>
    )
} 