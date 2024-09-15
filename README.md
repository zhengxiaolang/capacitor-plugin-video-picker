# capacitor-plugin-video-picker

Capacitor plugin to pick video files

## Install

```bash
npm install https://github.com/coderpradp/capacitor-plugin-video-picker.git
npx cap sync
```

## API

<docgen-index>

* [`pick()`](#pick)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### pick()

```typescript
pick() => Promise<VideoPickerResults>
```

**Returns:** <code>Promise&lt;<a href="#videopickerresults">VideoPickerResults</a>&gt;</code>

--------------------


### Interfaces


#### VideoPickerResults

| Prop        | Type                             |
| ----------- | -------------------------------- |
| **`files`** | <code>VideoPickerResult[]</code> |


#### VideoPickerResult

| Prop            | Type                | Description                                                                                                       |
| --------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **`path`**      | <code>string</code> | File Path                                                                                                         |
| **`webPath`**   | <code>string</code> | webPath returns a path that can be used to set the src attribute of an image for efficient loading and rendering. |
| **`name`**      | <code>string</code> | File Name                                                                                                         |
| **`extension`** | <code>string</code> | File Extensions                                                                                                   |

</docgen-api>
