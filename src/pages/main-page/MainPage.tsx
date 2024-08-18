import type { ReactNode } from 'react';

import { Footer } from '../components/footer/Footer';
import { Header } from '../components/header/Header';
import { Result } from '../components/result/Result';

export function MainPage(): ReactNode {
  return (
    <>
      <Header />
      <Result />
      <Footer />
    </>
  );
}
