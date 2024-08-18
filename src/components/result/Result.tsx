import type { ReactNode } from 'react';

import { Card } from '../card/Card';
import styles from './styles.module.scss';

const result = [
  {
    index: 'a1',
    name: 'Alex',
    email: 'allugovskova@mail.ru',
    password: 'pass',
    age: '22',
    gender: 'female',
    country: 'US',
  },
  { index: 'a2', name: 'lev', email: 'lev@mail.ru', password: 'pass', age: '20', gender: 'male', country: 'US' },
  { index: 'a2', name: 'lev', email: 'lev@mail.ru', password: 'pass', age: '20', gender: 'male', country: 'US' },
];
export function Result(): ReactNode {
  return (
    <main className="main">
      <div className={styles.container}>
        {result.map((item) => (
          <Card key={item.index} item={item} />
        ))}
      </div>
    </main>
  );
}
