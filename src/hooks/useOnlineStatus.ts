import { useState, useEffect } from 'react';
import { onlineManager } from '@tanstack/react-query';
import NetInfo from '@react-native-community/netinfo';

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(onlineManager.isOnline());

  useEffect(() => {
    const unsubscribeOnlineManager = onlineManager.subscribe(setIsOnline);

    const unsubscribeNetInfo = NetInfo.addEventListener(state => {
      const nextOnline =
        state.isConnected != null
          ? state.isConnected
          : !!state.isInternetReachable;
      onlineManager.setOnline(nextOnline);
    });

    return () => {
      unsubscribeOnlineManager();
      unsubscribeNetInfo();
    };
  }, []);

  return isOnline;
};
