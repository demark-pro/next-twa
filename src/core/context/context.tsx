import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { WebApp } from '../twa-types';
import { usePathname, useRouter } from 'next/navigation';

export type NextTWAProviderReturn = {
  app?: WebApp;
};

export type NextTWAProviderProps = PropsWithChildren;

export const WebAppContext = createContext<NextTWAProviderReturn>({});

export const NextTWAProvider = ({ children }: NextTWAProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [app, setApp] = useState<WebApp>();

  useEffect(() => {
    if (app || typeof window === 'undefined') return;

    const twa = window?.Telegram?.WebApp as WebApp;
    setApp(twa);
    if (twa?.ready) twa.ready();
  }, [app]);

  useEffect(() => {
    if (!app) return;

    const BackButton = app.BackButton;
    if (pathname === '/') {
      BackButton.hide();
      return;
    }

    const handleClickBackButton = () => {
      router.back();
    };

    BackButton.show();
    BackButton.onClick(handleClickBackButton);

    return () => {
      BackButton.offClick(handleClickBackButton);
    };
  }, [pathname, app]);

  return (
    <WebAppContext.Provider value={{ app }}>{children}</WebAppContext.Provider>
  );
};

export default NextTWAProvider;
