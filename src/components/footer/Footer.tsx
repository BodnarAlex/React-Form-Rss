import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import styles from './styles.module.scss';

export function Footer(): ReactNode {
  return (
    <footer className={styles.footer}>
      <div className={styles.blur}>
        <div className={styles.links}>
          <Link to="https://github.com/BodnarAlex">by Alex</Link>
        </div>
      </div>
    </footer>
  );
}
