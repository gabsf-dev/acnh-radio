import { Analytics } from '@vercel/analytics/next';
import { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Animal Crossing: New Horizons Radio',
  description:
    'A radio with Animal Crossing: New Horizons music played like the game. Choose the weather and play/pause the music!',
};

export const viewport: Viewport = {
  themeColor: '#BCDEC8',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-acnh antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
