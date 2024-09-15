import { WebPlugin } from '@capacitor/core';

import type { VideoPickerPlugin, VideoPickerResults } from './definitions';

export class VideoPickerWeb extends WebPlugin implements VideoPickerPlugin {
  async pick(): Promise<VideoPickerResults> {
    throw this.unimplemented('Not implemented on web.');
  }
}
