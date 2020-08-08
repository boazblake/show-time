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
var NodeGroupLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "node-group-line"), mithril_1.default("path", { "d": "M33.53,21.58l-4.94-2.83V13.09a1,1,0,0,0-.51-.87L22.64,9.1a1,1,0,0,0-1,0L16.2,12.22a1,1,0,0,0-.51.87v5.66l-4.94,2.83a1,1,0,0,0-.5.87v6.24a1,1,0,0,0,.5.86l5.45,3.12a1,1,0,0,0,1,0l4.95-2.83,4.95,2.83a1,1,0,0,0,.5.14,1,1,0,0,0,.49-.14l5.45-3.12a1,1,0,0,0,.5-.86V22.45A1,1,0,0,0,33.53,21.58ZM22.14,11.12l4.45,2.55V19l-4.46,2.56-4.44-2.6V13.67ZM16.69,30.65l-4.44-2.54V23l4.68-2.68,4.4,2.57V28ZM32,28.11l-4.44,2.54L22.93,28V22.93l4.46-2.57L32,23Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M7,27.43a1,1,0,0,1-1-1V19.9A1,1,0,0,1,6.5,19l4.95-2.83V10.54a1,1,0,0,1,.5-.87l5.21-3a1,1,0,0,1,1.37.37,1,1,0,0,1-.38,1.37l-4.7,2.68v5.66a1,1,0,0,1-.51.87L8,20.48v5.95A1,1,0,0,1,7,27.43Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M3,25.05a1,1,0,0,1-1-1V17.53a1,1,0,0,1,.5-.86l5-2.84V8.17A1,1,0,0,1,8,7.31l5.25-3a1,1,0,0,1,1,1.74L9.45,8.75v5.66a1,1,0,0,1-.51.87L4,18.11v5.94A1,1,0,0,1,3,25.05Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = NodeGroupLine;
