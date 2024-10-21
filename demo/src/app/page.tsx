'use client';
import { useNextTWA, useTelegramInitData } from 'next-twa';

export default function Home() {
  const { isReady, app, startAppValue } = useNextTWA();
  const initData = useTelegramInitData();

  if (!isReady) return <p>Loading...</p>;

  return (
    <div>
      {/* <p>StartAppValue: {startAppValue}</p> */}
      <p>
        {initData &&
          Object.entries(initData).map(([key, value]) => (
            <p key={key}>
              {key}: {JSON.stringify(value)}
            </p>
          ))}
      </p>
      <button
        onClick={() => {
          app?.showAlert('Hi!');
        }}
      >
        Show Alert
      </button>
    </div>
  );
}
