import type { Metadata } from 'next';
import { OnStartAppHandler } from 'next-twa';
import { NextTWAProvider } from 'next-twa';

export const metadata: Metadata = {
  title: 'Next TWA Example',
  description: 'Telegram WebApp for NextJS',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const handleStartApp: OnStartAppHandler = startParam => {
    if (startParam) {
      // Do something. redirect or extract data from `start_param`
      // The returned value will be written to `startAppValue`.

      return { foo: 'bar' };
    }

    return 'string or anything';
  };

  return (
    <html lang="en">
      <body>
        <NextTWAProvider
          // onStartApp={handleStartApp}
          useBackButton={true}
        >
          {children}
        </NextTWAProvider>
      </body>
    </html>
  );
}
