import type { ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { addFormData } from '../../store/store.ts';
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

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
  country: string;
  picture: string | null;
  terms: boolean;
}

export function FormOne(): ReactNode {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const pictureFile = formData.get('picture') as File | null;
    let pictureBase64: string | null = null;

    if (pictureFile) {
      pictureBase64 = await convertToBase64(pictureFile);
    }

    const data: FormData = {
      name: (formData.get('name') as string) || '',
      email: (formData.get('email') as string) || '',
      password: (formData.get('password') as string) || '',
      confirmPassword: (formData.get('confirmPassword') as string) || '',
      age: Number(formData.get('age')),
      gender: (formData.get('gender') as string) || '',
      country: (formData.get('country') as string) || '',
      picture: pictureBase64,
      terms: formData.get('terms') === 'on',
    };

    if (data.password === data.confirmPassword) {
      dispatch(addFormData(data));
      navigate('/');
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    handleSubmit(e).catch(() => {});
  };

  return (
    <main className="main">
      <div className={styles.container}>
        <h1 className={styles.title}>Uncontrolled form</h1>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <div className={styles.form_element}>
            <label htmlFor="name">
              Name
              <input className={styles.input} id="name" name="name" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="email">
              Email
              <input className={styles.input} id="email" name="email" type="email" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="password">
              Password
              <input className={styles.input} id="password" name="password" type="password" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="confirmPassword">
              Confirm Password
              <input className={styles.input} id="confirmPassword" name="confirmPassword" type="password" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="age">
              Age
              <input className={styles.input} id="age" name="age" type="number" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="gender">
              Gender
              <select id="gender" name="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="country">
              Country
              <select id="country" name="country">
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="picture">
              Upload Picture
              <input id="picture" name="picture" type="file" accept="image/png, image/jpeg" />
            </label>
          </div>

          <div>
            <label htmlFor="terms" className={styles.checkbox}>
              <input className={styles.input} id="terms" name="terms" type="checkbox" />
              Accept Terms and Conditions
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
