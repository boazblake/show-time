"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mithril_1 = __importDefault(require("mithril"));
var VideoGalleryLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "video-gallery-line"), mithril_1.default("path", { "d": "M32.12,10H3.88A1.88,1.88,0,0,0,2,11.88V30.12A1.88,1.88,0,0,0,3.88,32H32.12A1.88,1.88,0,0,0,34,30.12V11.88A1.88,1.88,0,0,0,32.12,10ZM32,30H4V12H32Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M30.14,3h0a1,1,0,0,0-1-1h-22a1,1,0,0,0-1,1h0V4h24Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M32.12,7V7a1,1,0,0,0-1-1h-26a1,1,0,0,0-1,1h0V8h28Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M12.82,26.79a1.74,1.74,0,0,0,.93.28,1.68,1.68,0,0,0,.69-.15l9.77-4.36a1.69,1.69,0,0,0,0-3.1L14.44,15.1a1.7,1.7,0,0,0-2.39,1.55v8.72A1.7,1.7,0,0,0,12.82,26.79Zm.63-10.14a.29.29,0,0,1,.14-.25.3.3,0,0,1,.16,0,.27.27,0,0,1,.12,0l9.77,4.35a.29.29,0,0,1,.18.28.28.28,0,0,1-.18.27l-9.77,4.36a.28.28,0,0,1-.28,0,.31.31,0,0,1-.14-.25Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = VideoGalleryLine;
