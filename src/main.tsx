import vkBridge from '@vkontakte/vk-bridge';

import { createRoot } from 'react-dom/client';
import { AppConfig } from './AppConfig.tsx';

import './i18n';

vkBridge.send('VKWebAppInit');

if (import.meta.env.MODE === 'development') {
  vkBridge.subscribe(e => console.log(e));
  import('./eruda.ts');
}

createRoot(document.getElementById('root')!).render(<AppConfig />);
