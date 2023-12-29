import { useEffect } from 'react';

import { MainRouter } from './infraestructure/routes/';

import { authService } from './domain/services/auth.service';
import { InitialScreen } from './infraestructure/components/ui';

function App() {

  const { startRevalidateSession, loading } = authService();

  useEffect(() => {
    startRevalidateSession();
  }, []);

  return loading ? <InitialScreen /> : <MainRouter />
}

export default App
