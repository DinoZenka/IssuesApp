import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '@src/navigation';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { StatusBar } from 'react-native';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 4, // 4 hours
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
});

function App() {
  return (
    <SafeAreaProvider>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{ persister: asyncStoragePersister }}
      >
        <NavigationContainer>
          <StatusBar barStyle={'dark-content'} />
          <RootNavigator />
        </NavigationContainer>
      </PersistQueryClientProvider>
    </SafeAreaProvider>
  );
}
export default App;
