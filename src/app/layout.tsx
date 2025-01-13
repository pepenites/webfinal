import './globals.css';
import UserProvider from './components/UserContext';
import Navigation from './components/Navigation'; // Barra de navegación

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <Navigation />
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
