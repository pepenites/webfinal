import './globals.css';
import UserProvider from './components/UserContext';
import Navigation from './components/Navigation'; // Barra de navegación
import React from 'react';

interface RootLayoutProps {
  children: React.ReactNode; // Especifica el tipo de children
}

export default function RootLayout({ children }: RootLayoutProps) {
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
