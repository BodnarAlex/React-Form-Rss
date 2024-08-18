import type { ReactNode } from 'react';

import exampleImage from '../../assets/back.jpg';
import styles from './styles.module.scss';

interface CardProps {
  item: {
    name: string;
    email: string;
    password: string;
    age: string;
    gender: string;
    country: string;
  };
}

export function Card({ item }: CardProps): ReactNode {
  return (
    <div className={styles.card}>
      <h2>{item.name}</h2>
      <img className={styles.image} src={exampleImage} alt="example" />
      <p>Email: {item.email}</p>
      <p>Age: {item.age}</p>
      <p>Gender: {item.gender}</p>
      <p>Country: {item.country}</p>
      <p>Password: {item.password}</p>
    </div>
  );
}
