'use client';
import {
  NextTWAProvider,
  useNextTWA,
  OnStartAppHandler,
  useTelegramInitData,
} from 'next-twa';

const App = () => {
  const { isReady, app, startAppValue } = useNextTWA();
  const initData = useTelegramInitData();

  if (!isReady) return <p>Loading...</p>;

  return (
    <div>
      <p>StartAppValue: {startAppValue}</p>
      <p>
        {initData &&
          Object.entries(initData).map(([key, value]) => (
            <p key={key}>
              {key}: {JSON.parse(value)}
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
};

export default function Home() {
  const handleStartApp: OnStartAppHandler = startParam => {
    if (startParam) {
      // Do something. redirect or extract data from `start_param`
      // The returned value will be written to `startAppValue`.

      return { foo: 'bar' };
    }

    return 'string or anything';
  };

  return (
    <NextTWAProvider onStartApp={handleStartApp} useBackButton={true}>
      <App />
    </NextTWAProvider>
  );
}
