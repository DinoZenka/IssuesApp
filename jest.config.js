module.exports = {
  preset: '@react-native/jest-preset',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-native-reanimated|react-native-worklets)/)',
  ],
  setupFilesAfterEnv: ['./jest-setup.js'],
};
