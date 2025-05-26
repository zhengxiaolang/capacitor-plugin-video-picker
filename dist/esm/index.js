import { registerPlugin } from '@capacitor/core';
const VideoPicker = registerPlugin('VideoPicker', {
    web: () => import('./web').then(m => new m.VideoPickerWeb()),
});
export * from './definitions';
export { VideoPicker };
//# sourceMappingURL=index.js.map