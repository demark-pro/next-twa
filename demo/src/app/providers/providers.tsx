'use client';
import React from 'react';
import { NextTWAProvider } from 'next-twa';
import { OnStartAppHandler } from 'next-twa';

interface IPropsProviders {
  children: React.ReactNode;
}

const Providers = ({ children }: IPropsProviders) => {
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
      {children}
    </NextTWAProvider>
  );
};

export default Providers;
