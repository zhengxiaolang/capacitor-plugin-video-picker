import { WebPlugin } from '@capacitor/core';
import type { VideoPickerPlugin, VideoPickerResults } from './definitions';
export declare class VideoPickerWeb extends WebPlugin implements VideoPickerPlugin {
    pick(): Promise<VideoPickerResults>;
}
