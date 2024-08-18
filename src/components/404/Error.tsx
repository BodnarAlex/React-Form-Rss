import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export function Error(): ReactNode {
  return (
    <main className="main">
      <div className={styles.blur}>
        <div className={styles.container}>
          <h2>This is</h2>
          <h1>404</h1>
          <Link to="/">Return on other side</Link>
        </div>
      </div>
    </main>
  );
}
