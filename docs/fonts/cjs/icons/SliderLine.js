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
var SliderLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "slider-line"), mithril_1.default("path", { "d": "M12,12.37A4,4,0,0,0,9,8.48V5A1,1,0,1,0,7,5V8.48a4,4,0,0,0,0,7.78V31a1,1,0,1,0,2,0V16.26A4,4,0,0,0,12,12.37Zm-4,2a2,2,0,1,1,2-2A2,2,0,0,1,8,14.4Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M32,15.83a4,4,0,0,0-3-3.89V5a1,1,0,1,0-2,0v6.94a4,4,0,0,0,0,7.78V31a1,1,0,1,0,2,0V19.72A4,4,0,0,0,32,15.83Zm-4,2a2,2,0,1,1,2-2A2,2,0,0,1,28,17.87Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M22,24.5a4,4,0,0,0-3-3.89V5a1,1,0,1,0-2,0V20.61a4,4,0,0,0,0,7.78V31a1,1,0,1,0,2,0V28.39A4,4,0,0,0,22,24.5Zm-4,2a2,2,0,1,1,2-2A2,2,0,0,1,18,26.53Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = SliderLine;
