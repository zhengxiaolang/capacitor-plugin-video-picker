import { WebPlugin } from '@capacitor/core';

import type { VideoPickerPlugin } from './definitions';

export class VideoPickerWeb extends WebPlugin implements VideoPickerPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
