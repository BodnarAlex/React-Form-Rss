import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export function Header(): ReactNode {
  return (
    <header className={styles.header}>
      <div className={styles.blur}>
        <nav className={styles.links}>
          <Link to="/form-one/">Uncontrolled</Link>
          <Link to="/">Main</Link>
          <Link to="/form-two/">React Hook Form</Link>
        </nav>
      </div>
    </header>
  );
}
