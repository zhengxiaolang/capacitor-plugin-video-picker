export interface VideoPickerPlugin {
    pick(): Promise<VideoPickerResults>;
}
export interface VideoPickerResults {
    files: VideoPickerResult[];
}
export interface VideoPickerResult {
    /**
     * File Path
     */
    path: string;
    /**
     * webPath returns a path that can be used to set the src attribute of an image for efficient
     * loading and rendering.
     */
    webPath: string;
    /**
     * File Name
     */
    name: string;
    /**
     * File Extensions
     */
    extension: string;
}
