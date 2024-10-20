import React, {
  createContext,
  PropsWithChildren,
  useEffect,
  useState,
} from 'react';
import { WebApp } from '../twa-types';
import { usePathname, useRouter } from 'next/navigation';
import { getWebAppFromGlobal } from '../../utils';

export type NextTWAProviderReturn = {
  app?: WebApp;
};

export type NextTWAProviderProps = PropsWithChildren & {
  onStartParam?: (start_param?: string) => void;
  useBackButton?: boolean;
};

export const WebAppContext = createContext<NextTWAProviderReturn>({});

export const NextTWAProvider = ({
  children,
  onStartParam,
  useBackButton = true,
}: NextTWAProviderProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const [app, setApp] = useState<WebApp>();

  useEffect(() => {
    if (app) return;

    const twa = getWebAppFromGlobal();
    setApp(twa);

    if (twa && onStartParam) onStartParam(twa.initDataUnsafe.start_param);
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

  return (
    <WebAppContext.Provider value={{ app }}>{children}</WebAppContext.Provider>
  );
};

export default NextTWAProvider;
