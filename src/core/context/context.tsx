import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { WebApp } from '../twa-types';
import { usePathname, useRouter } from 'next/navigation';
import { getWebAppFromGlobal } from '../../utils';

type StartAppType = {
  finished: boolean;
  value: any;
};

export type OnStartAppHandler = (startParams?: string) => ReturnType<any>;

export type NextTWAProviderProps = PropsWithChildren & {
  onStartApp?: OnStartAppHandler;
  useBackButton?: boolean;
};

export type UseNextTWAReturn = {
  /**
   * Telegram Web App
   */
  app?: WebApp;
  /**
   * value returned onStartApp
   */
  startAppValue?: any;
  /**
   * True when app is initialized and startAppValue is ready (If onStartApp is passed to NextTWAProviderProvider)
   */
  isReady: boolean;
};

export const webAppContext = createContext<UseNextTWAReturn>({
  isReady: false,
});

export const NextTWAProvider = ({
  children,
  onStartApp,
  useBackButton = true,
}: NextTWAProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [app, setApp] = useState<WebApp>();
  const [startApp, setStartApp] = useState<StartAppType>({
    finished: false,
    value: null,
  });

  useEffect(() => {
    if (app) return;

    const twa = getWebAppFromGlobal();
    setApp(twa);
    setStartApp({
      finished: true,
      value: onStartApp ? onStartApp(twa?.initDataUnsafe.start_param) : null,
    });
    if (twa?.ready) twa.ready();
  }, []);

  useEffect(() => {
    if (!app || !useBackButton) return;

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

  const isReady = !!app?.version && startApp.finished;

  console.log('app - ', app);
  console.log('startApp - ', startApp);
  console.log('isReady - ', isReady);

  return (
    <webAppContext.Provider
      value={{ app, startAppValue: startApp.value, isReady }}
    >
      {children}
    </webAppContext.Provider>
  );
};

export default NextTWAProvider;
