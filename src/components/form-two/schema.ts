import * as yup from 'yup';

export const schema = yup
  .object({
    name: yup
      .string()
      .matches(/^[A-Z]/, 'Name must start with an uppercase letter')
      .required(),
    email: yup.string().email('Invalid email').required(),
    password: yup
      .string()
      .matches(/[0-9]/, 'Password must contain a number')
      .matches(/[A-Z]/, 'Password must contain an uppercase letter')
      .matches(/[a-z]/, 'Password must contain a lowercase letter')
      .matches(/[\W_]/, 'Password must contain a special character')
      .min(8, 'Password must be at least 8 characters')
      .required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Passwords must match')
      .required(),
    age: yup.number().min(0, 'Age cannot be negative').required(),
    gender: yup.string().required(),
    country: yup.string().required(),
    picture: yup
      .mixed<FileList>()
      .test('fileSize', 'File is too large', (value) => {
        if (value && value.length && value[0]) {
          return value[0]?.size <= 5 * 1024 * 1024;
        }
        return true;
      })
      .test('fileType', 'Unsupported File Format', (value) => {
        if (value && value.length && value[0]) {
          return ['image/jpeg', 'image/png'].includes(value[0]?.type);
        }
        return true;
      })
      .required(),
    terms: yup.bool().oneOf([true], 'You must accept the terms').required(),
  })
  .required();
