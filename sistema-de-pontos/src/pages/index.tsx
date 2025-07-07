// components/Layout.tsx
import React, { ReactNode } from 'react';
import Head from 'next/head'; // Importe Head de next/head

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Sistema de Ponto' }) => {
  return (
    <div data-theme="mytheme" className="min-h-screen bg-base-100 text-darkText">
      <Head> {/* Use o componente Head aqui */}
        <title>{title}</title>
        <meta name="description" content="Sistema de Ponto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="bg-darkBlue text-white py-2 px-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="font-bold text-lg">Sistema de Ponto</span>
        </div>
        <nav>
          {/* Opcional: Links globais aqui */}
        </nav>
      </header>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout