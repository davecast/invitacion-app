'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PDFViewer() {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ 
    width: 0, 
    height: 0 
  });

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => window.removeEventListener('resize', updateDimensions);
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
        height={dimensions.height || undefined}
        renderTextLayer={false}
        renderAnnotationLayer={true}
      />
    </Document>
  );
}
