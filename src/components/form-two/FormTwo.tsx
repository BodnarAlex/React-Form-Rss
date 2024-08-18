import type { ReactNode } from 'react';

import styles from './styles.module.scss';

const countries = ['United States', 'Canada', 'Mexico'];

export function FormTwo(): ReactNode {
  return (
    <main className="main">
      <div className={styles.container}>
        <h1 className={styles.title}> React Hook Form</h1>
        <form className={styles.form}>
          <div className={styles.form_element}>
            <label htmlFor="name">
              Name
              <input className={styles.input} id="name" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="email">
              Email
              <input className={styles.input} id="email" type="email" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="password">
              Password
              <input className={styles.input} id="password" type="password" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="confirmPassword">
              Confirm Password
              <input className={styles.input} id="confirmPassword" type="password" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="age">
              Age
              <input className={styles.input} id="age" type="number" />
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="gender">
              Gender
              <select id="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </label>
          </div>

          <div className={styles.form_element}>
            <label htmlFor="country">
              Country
              <select id="country">
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
              <input id="picture" type="file" accept="image/png, image/jpeg" />
            </label>
          </div>

          <div>
            <label htmlFor="terms" className={styles.checkbox}>
              <input className={styles.input} id="terms" type="checkbox" />
              Accept Terms and Conditions
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      </div>
    </main>
  );
}
