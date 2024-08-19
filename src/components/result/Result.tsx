import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/store.ts';
import { Card } from '../card/Card';
import styles from './styles.module.scss';

export function Result(): ReactNode {
  const formData = useSelector((state: RootState) => state.formData);

  return (
    <main className="main">
      <div className={styles.container}>
        {formData.map((item) => (
          <Card key={`${item.name}+${item.email}+${item.age}`} item={item} />
        ))}
      </div>
    </main>
  );
}
