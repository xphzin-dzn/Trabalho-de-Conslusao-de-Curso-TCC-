import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

import App from './App';

if (Platform.OS === 'web') {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = `
    html, body, #root {
      height: 100%;
      width: 100%;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
}

registerRootComponent(App);