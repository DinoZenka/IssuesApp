// msw.polyfills.js
import 'fast-text-encoding';
import 'react-native-url-polyfill/auto';

function defineMockGlobal(name) {
  if (typeof global[name] === 'undefined' || global[name] === null) {
    global[name] = class {
      constructor(type, eventInitDict) {
        this.type = type;
        Object.assign(this, eventInitDict);
      }
      addEventListener() {}
      removeEventListener() {}
      dispatchEvent() {
        return true;
      }
      postMessage() {}
      close() {}
    };
  }
}

['MessageEvent', 'Event', 'EventTarget', 'BroadcastChannel'].forEach(
  defineMockGlobal,
);

// Ensure TextEncoder/TextDecoder are global (sometimes needed for MSW/Fast-text-encoding)
if (typeof global.TextEncoder === 'undefined') {
  const { TextEncoder, TextDecoder } = require('fast-text-encoding');
  global.TextEncoder = TextEncoder;
  global.TextDecoder = TextDecoder;
}
