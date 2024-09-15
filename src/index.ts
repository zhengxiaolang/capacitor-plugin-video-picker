import { registerPlugin } from '@capacitor/core';

import type { VideoPickerPlugin } from './definitions';

const VideoPicker = registerPlugin<VideoPickerPlugin>('VideoPicker', {
  web: () => import('./web').then(m => new m.VideoPickerWeb()),
});

export * from './definitions';
export { VideoPicker };
