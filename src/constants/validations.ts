export const required = (value: string): string | undefined => (value && value.trim() !== '' ? undefined : "Поле не може бути пустим")

export const validateDoc = (type: string, value?: string) => {
  if (!value) return 'Поле обовʼязкове'

  if (type === 'passport' || type === 'passport-book') return undefined

  const match = value.match(/^([А-ЯІЇЄҐ]{3})(\d{5,9})$/iu)
  return match ? undefined : 'Формат: 3 укр. літери та 5–9 цифр'
}

export const validateDate = (value: string): string | undefined => {
  if (!value) return "Поле не може бути пустим"
  const match = value.match(/^(\d{2}\.\d{2}\.\d{4})$/)
  return match && value ? undefined : "Невірний формат: дд.мм.рррр"
}

export const minLength = (min: number) => (value: string) => {
  if (!value || value.trim() === '') return 'Поле не може бути пустим';
  if (value.trim().length < min) return `Мінімальна довжина ${min} символів`;
  return undefined;
};

export const validateRequiredEmail = (value: string) => {
  if (!value || value.trim() === '') return 'Обовʼязкове поле';
  const isValidEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
  return !isValidEmail ? 'Некоректний email' : undefined;
};