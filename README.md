# Telegram WebApp and NextJS

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

Then wrap your code in `NextTWAProvider` component to make it available to all components. `next-twa` will take care of the back button

```js
<NextTWAProvider>
  <App />
</NextTWAProvider>
```

Now you can call `useNextTWA` in any component.

```js
import { useNextTWA } from 'next-twa';

export const MyComponent = () => {
  const { app } = useNextTWA();

  return <p>Hi, {app?.initDataUnsafe.user?.username}</p>;
};
```
