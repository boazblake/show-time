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
var PortraitLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "portrait-line"), mithril_1.default("path", { "d": "M15.34,26.45a.8.8,0,0,0-1.13,0,.79.79,0,0,0,0,1.13L18,31.09l3.74-3.47a.79.79,0,0,0,.05-1.13.8.8,0,0,0-1.13,0L18.8,28.17V7.83l1.86,1.72a.8.8,0,1,0,1.08-1.17L18,4.91,14.26,8.38a.79.79,0,0,0,0,1.13.8.8,0,0,0,1.13,0L17.2,7.83V28.17Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M28,2H8A2,2,0,0,0,6,4V32a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V4A2,2,0,0,0,28,2Zm0,30H8V4H28Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PortraitLine;
