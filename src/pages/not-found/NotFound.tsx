import type { ReactNode } from 'react';

import { Error } from '../components/404/Error';
import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';

export function NotFound(): ReactNode {
  return (
    <>
      <Header />
      <Error />
      <Footer />
    </>
  );
}
