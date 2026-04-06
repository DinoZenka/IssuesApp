import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { server } from '@src/server/handlers';

// if (__DEV__) {
try {
  server.listen({
    onUnhandledRequest: 'warn',
  });
} catch (error) {
  console.error('MSW: Failed to start server', error);
}
// }

AppRegistry.registerComponent(appName, () => App);
