'use client';
import { useNextTWA, useTelegramInitData } from 'next-twa';

export default function Home() {
  const { isReady, app, startAppValue } = useNextTWA();
  const initData = useTelegramInitData();

  return (
    <div>
      <p>isReady: {isReady ? 'true' : 'false'}</p>
      <p>startAppValue: {JSON.stringify(startAppValue)}</p>
      <p>
        {initData
          ? Object.entries(initData).map(([key, value]) => (
              <p key={key}>
                {key}: {JSON.stringify(value)}
              </p>
            ))
          : 'initData is empty'}
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
