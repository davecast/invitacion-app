'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const PDFViewer = dynamic(() => import('./PDFViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <p>Cargando PDF...</p>
    </div>
  ),
});

export default function Home() {
  return (
    <div className="w-full h-screen overflow-hidden flex justify-center bg-gray-100">
      <PDFViewer />
    </div>
  );
}
