import { yupResolver } from '@hookform/resolvers/yup';
import type { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addFormData } from '../../store/store.ts';
import { schema } from './schema.ts';
import styles from './styles.module.scss';

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
  const navigate = useNavigate();
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
      navigate('/');
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
