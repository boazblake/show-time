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
var EraserLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "eraser-line"), mithril_1.default("path", { "d": "M35.62,12a2.82,2.82,0,0,0-.84-2L27.49,2.65a2.9,2.9,0,0,0-4,0L2.83,23.28a2.84,2.84,0,0,0,0,4L7.53,32H3a1,1,0,0,0,0,2H28a1,1,0,0,0,0-2H16.74l18-18A2.82,2.82,0,0,0,35.62,12ZM13.91,32H10.36L4.25,25.89a.84.84,0,0,1,0-1.19l5.51-5.52,8.49,8.48ZM33.37,12.54,19.66,26.25l-8.48-8.49,13.7-13.7a.86.86,0,0,1,1.19,0l7.3,7.29a.86.86,0,0,1,.25.6A.82.82,0,0,1,33.37,12.54Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = EraserLine;
