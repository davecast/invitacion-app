'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('./PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen"></div>
  ),
});

export default function Home() {
  useEffect(() => {
    // Hacer scroll para ocultar la barra del navegador
    const hideAddressBar = () => {
      window.scrollTo(0, 1);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    };

    // Ejecutar después de que cargue el contenido
    setTimeout(hideAddressBar, 500);
    
    // También ejecutar cuando cambie el tamaño de la ventana
    window.addEventListener('resize', hideAddressBar);
    
    return () => {
      window.removeEventListener('resize', hideAddressBar);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden flex items-center justify-center bg-white" style={{ height: '100dvh' }}>
      <PDFViewer />
    </div>
  );
}
