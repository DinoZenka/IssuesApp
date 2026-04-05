import { Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <Text>React Native App</Text>
    </SafeAreaProvider>
  );
}
export default App;
