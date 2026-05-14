import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'FlowAI - The Intelligence Layer for Modern Workflows',
  description:
    'FlowAI is the modern intelligence layer that helps teams automate tasks, generate insights, and scale operations effortlessly.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/FlowAI.svg',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/DarkLogo.svg',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  );
}
