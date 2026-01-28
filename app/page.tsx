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

    // Prevenir zoom con pinch/gestos
    const preventZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        e.preventDefault();
      }
    };

    const preventGestureZoom = (e: Event) => {
      e.preventDefault();
    };

    // Prevenir zoom con doble tap
    let lastTouchEnd = 0;
    const preventDoubleTapZoom = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };

    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('gesturestart', preventGestureZoom);
    document.addEventListener('gesturechange', preventGestureZoom);
    document.addEventListener('gestureend', preventGestureZoom);
    document.addEventListener('touchend', preventDoubleTapZoom, { passive: false });
    
    return () => {
      window.removeEventListener('resize', hideAddressBar);
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('gesturestart', preventGestureZoom);
      document.removeEventListener('gesturechange', preventGestureZoom);
      document.removeEventListener('gestureend', preventGestureZoom);
      document.removeEventListener('touchend', preventDoubleTapZoom);
    };
  }, []);

  return (
    <div className="w-full overflow-hidden flex items-center justify-center bg-white" style={{ height: '100dvh' }}>
      <PDFViewer />
    </div>
  );
}
