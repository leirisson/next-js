import Head from 'next/head';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title = 'Sistema de Ponto' }) => {
  return (
    <div data-theme="mytheme" className="min-h-screen bg-base-100 text-darkText">
      <Head>
        <title>{title}</title>
        <meta name="description" content="Sistema de Ponto" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;