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
var MapMarkerLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "map-marker-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M18,6.72a5.73,5.73,0,1,0,5.73,5.73A5.73,5.73,0,0,0,18,6.72Zm0,9.46a3.73,3.73,0,1,1,3.73-3.73A3.73,3.73,0,0,1,18,16.17Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M18,2A11.79,11.79,0,0,0,6.22,13.73c0,4.67,2.62,8.58,4.54,11.43l.35.52a99.61,99.61,0,0,0,6.14,8l.76.89.76-.89a99.82,99.82,0,0,0,6.14-8l.35-.53c1.91-2.85,4.53-6.75,4.53-11.42A11.79,11.79,0,0,0,18,2ZM23.59,24l-.36.53c-1.72,2.58-4,5.47-5.23,6.9-1.18-1.43-3.51-4.32-5.23-6.9L12.42,24c-1.77-2.64-4.2-6.25-4.2-10.31a9.78,9.78,0,1,1,19.56,0C27.78,17.79,25.36,21.4,23.59,24Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = MapMarkerLine;
