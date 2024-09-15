var capacitorVideoPicker = (function (exports, core) {
    'use strict';

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

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
