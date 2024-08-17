import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

export function NotFound(): ReactNode {
  const navigate = useNavigate();

  const handleClick = (): void => {
    navigate('/');
  };

  return (
    <main className="main">
      <h1>This is</h1>
      <div>
        <div>404</div>
      </div>
      <div onClick={handleClick}>Return on other side</div>
    </main>
  );
}
