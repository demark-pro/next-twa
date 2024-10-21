import type { Metadata } from 'next';
import Providers from './providers/providers';

export const metadata: Metadata = {
  title: 'Next TWA Example',
  description: 'Telegram WebApp for NextJS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
