import { registerRootComponent } from 'expo';
import { Platform } from 'react-native';

import App from './App';

// Injeta um estilo global para a web para corrigir a rolagem
if (Platform.OS === 'web') {
    const style = document.createElement('style');
    style.type = 'text/css';
    // Este CSS força a página a ter 100% de altura e desativa a rolagem do navegador,
    // deixando o ScrollView da sua aplicação tomar o controlo.
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