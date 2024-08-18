import type { ReactNode } from 'react';

import type { IFormData } from '../../store/types.ts';
import styles from './styles.module.scss';

interface CardProps {
  item: IFormData;
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
