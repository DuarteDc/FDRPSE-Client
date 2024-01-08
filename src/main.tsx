import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './infraestructure/context/auth/AuthProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <AuthProvider>
    <BrowserRouter>
      <NextUIProvider>
        <GoogleOAuthProvider clientId={import.meta.env.GOOGLE_CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </NextUIProvider>
    </BrowserRouter>
  </AuthProvider>
  // </React.StrictMode>,
)
