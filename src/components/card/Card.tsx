import type { ReactNode } from 'react';

import styles from './styles.module.scss';

interface CardProps {
  item: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    age: string;
    gender: string;
    country: string;
    picture: string | null;
    terms: boolean;
  };
}

export function Card({ item }: CardProps): ReactNode {
  return (
    <div className={styles.card}>
      <h2>{item.name}</h2>
      {item.picture && <img className={styles.image} src={item.picture} alt="Uploaded" />}
      <p>Email: {item.email}</p>
      <p>Age: {item.age}</p>
      <p>Gender: {item.gender}</p>
      <p>Country: {item.country}</p>
      <p>Password: {item.password}</p>
    </div>
  );
}
