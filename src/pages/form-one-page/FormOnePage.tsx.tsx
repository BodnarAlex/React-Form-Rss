import type { ReactNode } from 'react';

import { Footer } from '../components/footer/Footer';
import { FormOne } from '../components/form-one/FormOne';
import { Header } from '../components/header/Header';

export function FormOnePage(): ReactNode {
  return (
    <>
      <Header />
      <FormOne />
      <Footer />
    </>
  );
}
