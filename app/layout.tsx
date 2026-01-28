import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Baby Shower de Somebaby 👶",
  description: "Haz clic para ver los detalles y confirmar tu asistencia.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
  openGraph: {
    title: "¡Estás invitado al Baby Shower!",
    description: "Haz clic para ver los detalles y confirmar tu asistencia.",
    images: [
      {
        url: "/preview-del-pdf.jpg",
        width: 1200,
        height: 1200,
        alt: "Baby Shower de Somebaby",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "¡Estás invitado al Baby Shower!",
    description: "Haz clic para ver los detalles y confirmar tu asistencia.",
    images: ["/preview-del-pdf.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
