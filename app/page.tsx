'use client';

import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('./PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <p>Cargando...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden flex items-center justify-center bg-black">
      <PDFViewer />
    </div>
  );
}
