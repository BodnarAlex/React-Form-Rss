import type { ReactNode } from 'react';
import { Route, Routes } from 'react-router-dom';

import { FormOnePage } from './pages/form-one-page/FormOnePage.tsx.tsx';
import { FormTwoPage } from './pages/form-two-page/FormTwoPage.tsx';
import { MainPage } from './pages/main-page/MainPage.tsx';

export function App(): ReactNode {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/form-one/" element={<FormOnePage />} />
      <Route path="/form-two/" element={<FormTwoPage />} />
    </Routes>
  );
}
