# Telegram WebApp for NextJS

A simple and efficient npm package to integrate Telegram Web Apps into your Next.js applications. This package provides seamless access to Telegram's API, enabling you to create interactive web experiences directly inside Telegram.

## Features:

- Easy integration with Next.js
- Access user data and chat information securely
- Simplified API calls to Telegram

## Live Demo

Telegram Bot [@nexttwa_bot](https://t.me/nexttwa_bot/app)

## Getting started

### Installation

```sh
npm i next-twa --save
```

### Usage

Import `NextTWAProvider` from the library

```js
import { NextTWAProvider } from 'next-twa';
```

Then wrap your code in the `NextTWAProvider` component to make it available to all components. `next-twa` will take care of the back button

```js
<NextTWAProvider>
  <App />
</NextTWAProvider>
```

Now you can call `useNextTWA` in any component.

```js
import { useNextTWA } from 'next-twa';

export const MyComponent = () => {
  const { isReady, app, startAppValue } = useNextTWA();

  return <p>Hi, {app?.initDataUnsafe.user?.username}</p>;
};
```

### Hooks

`useNextTWA(): UseNextTWAReturn` - Main hook for the app

`useTelegramInitData(): WebAppInitData` - Hook to get the initial data from the Telegram Web Apps API already parsed.

## Example

```js
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
};

export default function Home() {
  const handleStartApp: OnStartAppHandler = startParam => {
    if (startParam) {
      // Do something: redirect or extract data from `start_param`
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
```

## TODO

- Add Docs
- Add Tests
