import type { ReactNode } from 'react';

import styles from './styles.module.scss';

export function FormOne(): ReactNode {
  return (
    <main className="main">
      <h1 className={styles.title}>This is form one!</h1>
    </main>
  );
}
