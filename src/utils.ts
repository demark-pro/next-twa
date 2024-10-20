export const getWebAppFromGlobal = () =>
  typeof window !== 'undefined' ? window?.Telegram?.WebApp : undefined;
