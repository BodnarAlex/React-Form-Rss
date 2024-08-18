import type { ReactNode } from 'react';

import styles from './styles.module.scss';

export function FormTwo(): ReactNode {
  return (
    <main className="main">
      <h1 className={styles.title}> This is form two!</h1>
    </main>
  );
}
