'use client';

import { NextTWAProvider, useNextTWA } from 'next-twa';

const App = () => {
  const { app } = useNextTWA();

  console.log(app);
  return <div></div>;
};

export default function Home() {
  return (
    <NextTWAProvider>
      <App />
    </NextTWAProvider>
  );
}
