import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <div className={styles.blur}>
        <nav className={styles.links}>
          <Link to="/form-one/">To form one</Link>
          <Link to="/">To main</Link>
          <Link to="/form-two/">To form two</Link>
        </nav>
      </div>
    </header>
  );
}
