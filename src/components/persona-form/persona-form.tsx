import { minLength, required, validateDate, validateDoc, validateRequiredEmail } from "@/constants/validations";
import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Field, Form } from "react-final-form";
import { TextFieldComponent } from "../shared/text-field/text-field";
import InputMask from "react-input-mask"
import { contactMethods, documentTypes, genderOptions } from "@/constants/options";


type FormValues = {
    surname: string;
    name: string;
    patronymic: string;
    rnokpp: string;
    birthday: string;
    email: string;
    phone: string;
    secretWord: string;
    documentType: string;
    documentNumber: string;
    whoGaveDocument: string;
}

export const PersonaFormComponent: FC = () => {
    const [patronymicChecked, setPatronymicChecked] = useState(true);
    const [rnokppChecked, setRnokppChecked] = useState(true);
    const [submitted, setSubmitted] = useState<unknown>(null)

    const onSubmit = (values: FormValues) => {
        console.log(values);
        setSubmitted(values);
    }

    return (
        <Form<FormValues> onSubmit={onSubmit}>
            {({ handleSubmit, submitting, form, values }) => (
                <Box component={'form'} onSubmit={handleSubmit} noValidate>
                    <Box sx={{
                        padding: 2,
                    }}>
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
                                            } else {
                                                form.change('patronymic', '');
                                            }
                                        }}
                                    />
                                )} />

                            <Field
                                name={'rnokpp'}
                                validate={required}
                                render={({ input, meta }) => (
                                    <TextFieldComponent
                                        {...input}
                                        meta={meta}
                                        required={rnokppChecked}
                                        label={'РНОКПП(ІПН)'}
                                        disabled={!rnokppChecked}
                                        helperText={!rnokppChecked ? 'Немає ІПН за віком чи має відмітку у паспорті' : (meta.touched && meta.error)}
                                        showSwitch
                                        switchChecked={rnokppChecked}
                                        switchOnChange={(e) => {
                                            setRnokppChecked(e.target.checked);
                                            if (!e.target.checked) {
                                                form.change('rnokpp', 'Немає РНОКПП(ІПН)');
                                            } else {
                                                form.change('rnokpp', '');
                                            }
                                        }}
                                    />
                                )} />

                            <Field
                                name={'birthday'}
                                validate={validateDate}
                                render={({ input, meta }) => (
                                    <InputMask
                                        mask="99.99.9999"
                                        maskChar=""
                                        {...input}
                                    >
                                        {(inputProps) => (
                                            <TextFieldComponent
                                                required
                                                placeholder="дд.мм.рррр"
                                                {...inputProps}
                                                label="Дата народження"
                                                meta={meta}
                                                shrinkLabel
                                            />
                                        )}
                                    </InputMask>
                                )} />


                            <Field
                                name={'gender'}
                                validate={required}
                                render={({ input, meta }) => (
                                    <FormControl required error={!!meta.error && meta.touched}>
                                        <InputLabel>Стать</InputLabel>
                                        <Select
                                            {...input}
                                            required
                                            label="Стать"
                                            variant="standard"
                                        >
                                            {genderOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>

                                        {meta.touched && meta.error && <FormHelperText sx={{ textAlign: 'right' }}>{meta.error}</FormHelperText>}
                                    </FormControl>
                                )} />
                        </Box>

                        <Box sx={{
                            display: 'grid',
                            marginBottom: 4,
                            columnGap: 2,
                            rowGap: 3,
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: '1fr 1fr',
                            },
                        }}>
                            <Field
                                name={'birthcountry'}
                                validate={required}
                                render={({ input, meta }) => (
                                    <TextFieldComponent meta={meta} required label={'Країна народження'} {...input} />
                                )} />

                            <Field
                                name={'birthplace'}
                                validate={required}
                                render={({ input, meta }) => (
                                    <TextFieldComponent meta={meta} required label={'Місце народження'} {...input} />
                                )} />

                            <Field
                                name={'contactMethod'}
                                validate={required}
                                render={({ input, meta }) => (
                                    <FormControl required error={!!meta.error && meta.touched}>
                                        <InputLabel>Бажаний спосіб зв\'язку із пацієнтом</InputLabel>
                                        <Select
                                            {...input}
                                            required
                                            label="Бажаний спосіб зв'язку із пацієнтом"
                                            variant="standard"
                                        >
                                            {contactMethods.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )} />

                            <Field
                                name={'sercert-word'}
                                validate={minLength(6)}
                                render={({ input, meta }) => (
                                    <TextFieldComponent meta={meta} required label={'Секретне слово (не менше 6 символів)'} {...input} />
                                )} />

                            <Field name={'phone'} validate={required}>
                                {({ input, meta }) => (
                                    <InputMask
                                        mask="+38 (999) 999-99-99"
                                        value={input.value}
                                        onChange={input.onChange}
                                        onBlur={input.onBlur}
                                        onFocus={input.onFocus}
                                    >
                                        {(inputProps) => (
                                            <TextFieldComponent
                                                {...inputProps}
                                                meta={meta}
                                                placeholder="+38 (___) ___-__-__"
                                                shrinkLabel
                                                fullWidth
                                                label="Контактний номер телефону"
                                            />
                                        )}
                                    </InputMask>
                                )}
                            </Field>

                            <Field
                                name={'email'}
                                validate={validateRequiredEmail}
                                render={({ input, meta }) => (
                                    <TextFieldComponent
                                        meta={meta}
                                        required
                                        placeholder={'example@gmail.com'}
                                        shrinkLabel
                                        label={'Електронна пошта'}
                                        {...input}
                                    />
                                )} />
                        </Box>


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
                            gridTemplateColumns: {
                                xs: '1fr',
                                sm: '1fr 1fr',
                            },
                        }}>
                            <Field
                                name={'documentType'}
                                validate={required}
                                render={({ input, meta }) => (
                                    <FormControl required error={!!meta.error && meta.touched}>
                                        <InputLabel>Тип документа</InputLabel>
                                        <Select
                                            {...input}
                                            required
                                            label="Тип документа"
                                            variant="standard"
                                        >
                                            {documentTypes.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                )} />

                            <Field
                                name={'documentNumber'}
                                validate={(value) => validateDoc(values.documentType, value)}
                                render={({ input, meta }) => (
                                    <TextFieldComponent meta={meta} required label={'Серія(за наявності), номер'} {...input} />
                                )} />

                            <Field
                                name={'whenGaveDocument'}
                                validate={required}
                                render={({ input, meta }) => (
                                    <InputMask
                                        mask="99.99.9999"
                                        maskChar=""
                                        {...input}
                                    >
                                        {(inputProps) => (
                                            <TextFieldComponent
                                                meta={meta}
                                                required
                                                shrinkLabel
                                                label={'Коли видано'}
                                                placeholder="31.01.2025"
                                                {...inputProps} />
                                        )}
                                    </InputMask>
                                )} />

                            <Field
                                name={'validityPeriod'}
                                render={({ input, meta }) => (
                                    <InputMask
                                        mask="99.99.9999"
                                        maskChar=""
                                        {...input}
                                    >
                                        {(inputProps) => (
                                            <TextFieldComponent
                                                meta={meta}
                                                shrinkLabel
                                                label={'Діє до'}
                                                placeholder="31.01.2025"
                                                {...inputProps} />
                                        )}
                                    </InputMask>
                                )} />

                            <Field name="issuedBy" validate={required}>
                                {({ input, meta }) => (
                                    <TextFieldComponent
                                        {...input}
                                        meta={meta}
                                        label="Ким видано"
                                        required
                                        fullWidth
                                        multiline
                                        minRows={1}
                                        maxRows={6}
                                    />
                                )}
                            </Field>


                            <Field name="unzr">
                                {({ input, meta }) => (
                                    <TextFieldComponent
                                        {...input}
                                        meta={meta}
                                        fullWidth
                                        label="Запис № (УНЗР)"
                                        placeholder="РРРРММДД-ХХХХХ"
                                        shrinkLabel
                                        variant="standard"
                                        helperText="Вкажіть унікальний номер запису в Демографічному реєстрі (Запис №)"
                                    />
                                )}
                            </Field>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            marginTop: 2,
                        }}>
                            <Button type="submit" variant="contained" disabled={submitting}>
                                Надіслати
                            </Button>
                        </Box>

                        {submitted && (
                            <pre style={{ background: "#f0f0f0", padding: "1rem" }}>
                                {JSON.stringify(submitted, null, 2)}
                            </pre>
                        )}
                    </Box>
                </Box>
            )}
        </Form>
    )
}