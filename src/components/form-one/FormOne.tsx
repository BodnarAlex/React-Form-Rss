import type { ReactNode } from 'react';
import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ValidationError } from 'yup';

import { schema } from '../../schema/schema.ts';
import { addFormData } from '../../store/store.ts';
import type { IFormData } from '../../store/types.ts';
import styles from './styles.module.scss';

const countries = ['United States', 'Canada', 'Mexico'];

const convertToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = (): void => {
      resolve(reader.result as string);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

export function FormOne(): ReactNode {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      age: ageRef.current?.valueAsNumber,
      gender: genderRef.current?.value,
      country: countryRef.current?.value,
      picture: pictureRef.current?.files,
      terms: termsRef.current?.checked,
    };

    try {
      await schema.validate(formData, { abortEarly: false });

      let pictureBase64: string | null = null;
      if (formData.picture && formData.picture[0]) {
        pictureBase64 = await convertToBase64(formData.picture[0]);
      }

      const data: IFormData = {
        name: formData.name || '',
        email: formData.email || '',
        password: formData.password || '',
        confirmPassword: formData.confirmPassword || '',
        age: formData.age ?? 0,
        gender: formData.gender || '',
        country: formData.country || '',
        picture: pictureBase64,
        terms: formData.terms ?? false,
      };

      if (data.password === data.confirmPassword) {
        dispatch(addFormData(data));
        navigate('/');
      } else {
        setErrors({ confirmPassword: 'Passwords must match' });
      }
    } catch (validationErrors) {
      if (validationErrors instanceof ValidationError) {
        const errors: Record<string, string> = {};
        validationErrors.inner.forEach((item) => {
          if (item.path) {
            errors[item.path] = item.message;
            setErrors(errors);
          }
        });
      }
    }
  };

  const onSubmitHandler = (e: FormEvent): void => {
    handleSubmit(e).catch(() => {});
  };

  return (
    <main className="main">
      <div className={styles.container}>
        <h1 className={styles.title}>Uncontrolled Form</h1>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.form_element}>
            <label htmlFor="name">
              Name
              <input className={styles.input} id="name" name="name" ref={nameRef} />
            </label>
            {errors.name && <p className={styles.error}>{errors.name}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="email">
              Email
              <input className={styles.input} id="email" name="email" type="email" ref={emailRef} />
            </label>
            {errors.email && <p className={styles.error}>{errors.email}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="password">
              Password
              <input className={styles.input} id="password" name="password" type="password" ref={passwordRef} />
            </label>
            {errors.password && <p className={styles.error}>{errors.password}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="confirmPassword">
              Confirm Password
              <input
                className={styles.input}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                ref={confirmPasswordRef}
              />
            </label>
            {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="age">
              Age
              <input className={styles.input} id="age" name="age" type="number" ref={ageRef} />
            </label>
            {errors.age && <p className={styles.error}>{errors.age}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="gender">
              Gender
              <select id="gender" name="gender" ref={genderRef}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
            {errors.gender && <p className={styles.error}>{errors.gender}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="country">
              Country
              <select id="country" name="country" ref={countryRef}>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
            {errors.country && <p className={styles.error}>{errors.country}</p>}
          </div>

          <div className={styles.form_element}>
            <label htmlFor="picture">
              Upload Picture
              <input id="picture" name="picture" type="file" accept="image/png, image/jpeg" ref={pictureRef} />
            </label>
            {errors.picture && <p className={styles.error}>{errors.picture}</p>}
          </div>

          <div className={styles.checkbox_container}>
            <label htmlFor="terms" className={styles.checkbox}>
              <input className={styles.input} id="terms" name="terms" type="checkbox" ref={termsRef} />
              Accept Terms and Conditions
            </label>
            {errors.terms && <p className={styles.error}>{errors.terms}</p>}
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
