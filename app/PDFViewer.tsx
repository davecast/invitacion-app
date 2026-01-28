'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PDFViewer() {
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const updateScale = () => {
      const pdfAspectRatio = 1080 / 1920; // ancho / alto del PDF
      const screenAspectRatio = window.innerWidth / window.innerHeight;
      
      if (screenAspectRatio > pdfAspectRatio) {
        // La pantalla es más ancha que el PDF, usar height
        setScale(window.innerHeight / 1920);
      } else {
        // La pantalla es más angosta que el PDF, usar width
        setScale(window.innerWidth / 1080);
      }
    };
    
    updateScale();
    window.addEventListener('resize', updateScale);
    
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  return (
    <Document
      file="/back.pdf"
      loading={
        <div className="flex items-center justify-center h-screen">
          <p>Cargando PDF...</p>
        </div>
      }
    >
      <Page 
        pageNumber={1} 
        scale={scale}
        renderTextLayer={false}
        renderAnnotationLayer={true}
      />
    </Document>
  );
}
