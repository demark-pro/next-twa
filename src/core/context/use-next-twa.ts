import { useContext } from 'react';
import { webAppContext } from './context';

/**
 * @private
 * @ignore
 */
export const useNextTWA = () => {
  const context = useContext(webAppContext);

  return context;
};
