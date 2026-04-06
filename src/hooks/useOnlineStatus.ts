import { useState, useEffect } from 'react';
import { onlineManager } from '@tanstack/react-query';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(onlineManager.isOnline());

  useEffect(() => {
    return onlineManager.subscribe(setIsOnline);
  }, []);

  return isOnline;
};
