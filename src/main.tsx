import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './infraestructure/context/auth/AuthProvider.tsx';
import { SnackbarProvider } from 'notistack';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthProvider>
    <BrowserRouter basename="/cuestionario/">
      <NextUIProvider>
        {/* <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}> */}
          <SnackbarProvider />
          <App />
        {/* </GoogleOAuthProvider> */}
      </NextUIProvider>
    </BrowserRouter>
  </AuthProvider>
  // </React.StrictMode>,
)
