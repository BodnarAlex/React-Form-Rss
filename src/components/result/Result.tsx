import type { ReactNode } from 'react';

import styles from './styles.module.scss';

export function Result(): ReactNode {
  return (
    <main className="main">
      <h1 className={styles.title}>This is main!</h1>
    </main>
  );
}
