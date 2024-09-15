export interface VideoPickerPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
