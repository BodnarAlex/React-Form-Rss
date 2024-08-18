import { yupResolver } from '@hookform/resolvers/yup';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';

import { addFormData } from '../../store/store.ts';
import styles from './styles.module.scss';

const schema = yup
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

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
  country: string;
  picture: FileList;
  terms: boolean;
}

export function FormTwo(): ReactNode {
  const dispatch = useDispatch();
  const countries = ['United States', 'Canada', 'Mexico'];

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const onSubmit = (data: FormValues): void => {
    const picture = data.picture[0];
    const reader = new FileReader();

    reader.onloadend = (): void => {
      dispatch(
        addFormData({
          ...data,
          picture: reader.result as string,
        }),
      );
    };

    if (picture) {
      reader.readAsDataURL(picture);
    }
  };

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    handleSubmit(onSubmit)(e).catch(() => {});
  };

  return (
    <main className="main">
      <div className={styles.container}>
        <h1 className={styles.title}>React Hook Form</h1>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.form_element}>
            <label htmlFor="name">
              Name
              <input className={styles.input} id="name" {...register('name')} />
            </label>
            {errors.name && <p className={styles.error}>{errors.name.message}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="email">
              Email
              <input className={styles.input} id="email" type="email" {...register('email')} />
            </label>
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="password">
              Password
              <input className={styles.input} id="password" type="password" {...register('password')} />
            </label>
            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="confirmPassword">
              Confirm Password
              <input className={styles.input} id="confirmPassword" type="password" {...register('confirmPassword')} />
            </label>
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="age">
              Age
              <input className={styles.input} id="age" type="number" {...register('age')} />
            </label>
            {errors.age && <p className={styles.error}>{errors.age.message}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="gender">
              Gender
              <select id="gender" {...register('gender')}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            {errors.gender && <p className={styles.error}>{errors.gender.message}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="country">
              Country
              <select id="country" {...register('country')}>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            {errors.country && <p className={styles.error}>{errors.country.message}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="picture">
              Upload Picture
              <input id="picture" type="file" {...register('picture')} />
            </label>
            {errors.picture && <p className={styles.error}>{errors.picture.message}</p>}
          </div>

          <div className={styles.checkbox_container}>
            <label htmlFor="terms" className={styles.checkbox}>
              <input className={styles.input} id="terms" type="checkbox" {...register('terms')} />
              Accept Terms and Conditions
            </label>
            {errors.terms && <p className={styles.error}>{errors.terms.message}</p>}
          </div>

          <button type="submit" disabled={!isValid}>
            Submit
          </button>
        </form>
      </div>
    </main>
  );
}
