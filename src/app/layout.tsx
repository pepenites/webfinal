import UserProvider from './components/UserContext';
import './globals.css'; // Importa los estilos globales

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
