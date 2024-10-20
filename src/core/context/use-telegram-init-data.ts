import { useEffect, useState } from 'react';
import { WebAppInitData } from '../twa-types';
import { getWebAppFromGlobal } from '../../utils';

/**
 * Hook to get the initial data from the Telegram Web Apps API already parsed.
 * @example
 * const { hash } = useTelegramInitData();
 * console.log({ hash });
 */
export const useTelegramInitData = () => {
  const [data, setData] = useState<WebAppInitData | null>(null);

  useEffect(() => {
    const twa = getWebAppFromGlobal();
    if (!twa) return;

    const firstLayerInitData = Object.fromEntries(
      new URLSearchParams(twa.initData),
    );

    const initData: Record<string, string> = {};
    for (const key in firstLayerInitData) {
      try {
        initData[key] = JSON.parse(firstLayerInitData[key]!);
      } catch {
        initData[key] = firstLayerInitData[key] ?? '';
      }
    }

    setData({ ...twa.initDataUnsafe, ...initData }); //TODO: without concat
  }, []);

  return data;
};

export default useTelegramInitData;
