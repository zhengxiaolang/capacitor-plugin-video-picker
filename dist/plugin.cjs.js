'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@capacitor/core');

const VideoPicker = core.registerPlugin('VideoPicker', {
    web: () => Promise.resolve().then(function () { return web; }).then(m => new m.VideoPickerWeb()),
});

class VideoPickerWeb extends core.WebPlugin {
    async pick() {
        throw this.unimplemented('Not implemented on web.');
    }
}

var web = /*#__PURE__*/Object.freeze({
    __proto__: null,
    VideoPickerWeb: VideoPickerWeb
});

exports.VideoPicker = VideoPicker;
//# sourceMappingURL=plugin.cjs.js.map
