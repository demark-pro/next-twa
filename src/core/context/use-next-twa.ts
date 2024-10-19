import { useContext } from 'react';
import { WebAppContext } from './context';

/**
 * @private
 * @ignore
 */
export const useNextTWA = () => {
  const context = useContext(WebAppContext);

  return context;
};
