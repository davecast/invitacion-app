'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PDFViewer() {
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      setWidth(window.innerWidth);
    };
    
    updateWidth();
    window.addEventListener('resize', updateWidth);
    
    return () => window.removeEventListener('resize', updateWidth);
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
        width={width || undefined}
        renderTextLayer={false}
        renderAnnotationLayer={true}
      />
    </Document>
  );
}
