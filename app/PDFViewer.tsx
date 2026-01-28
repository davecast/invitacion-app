'use client';

import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useState } from 'react';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export default function PDFViewer() {
  const [dimensions, setDimensions] = useState<{ width?: number; height?: number }>({});

  useEffect(() => {
    const updateDimensions = () => {
      const screenWidth = window.innerWidth;
      // Usar visualViewport si está disponible, sino window.innerHeight
      const screenHeight = window.visualViewport?.height || window.innerHeight;
      
      // Proporción del PDF: 1080x1920 = 0.5625 (ancho/alto)
      const pdfRatio = 1080 / 1920;
      const screenRatio = screenWidth / screenHeight;
      
      if (screenRatio > pdfRatio) {
        // Pantalla más ancha proporcionalmente, limitar por altura
        setDimensions({ height: screenHeight });
      } else {
        // Pantalla más angosta proporcionalmente, limitar por ancho
        setDimensions({ width: screenWidth });
      }
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.visualViewport?.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      window.visualViewport?.removeEventListener('resize', updateDimensions);
    };
  }, []);

  return (
    <Document
      file="/back.pdf"
      loading={
        <div className="flex items-center justify-center h-screen"></div>
      }
    >
      <Page 
        pageNumber={1} 
        width={dimensions.width}
        height={dimensions.height}
        renderTextLayer={false}
        renderAnnotationLayer={true}
      />
    </Document>
  );
}
