import type { ReactNode } from 'react';

import { Footer } from '../../components/footer/Footer';
import { FormTwo } from '../../components/form-two/FormTwo';
import { Header } from '../../components/header/Header';

export function FormTwoPage(): ReactNode {
  return (
    <>
      <Header />
      <FormTwo />
      <Footer />
    </>
  );
}
