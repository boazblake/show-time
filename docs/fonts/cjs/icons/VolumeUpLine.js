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
var VolumeUpLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "volume-up-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M23.41,25.25a1,1,0,0,1-.54-1.85,6.21,6.21,0,0,0-.19-10.65,1,1,0,1,1,1-1.73,8.21,8.21,0,0,1,.24,14.06A1,1,0,0,1,23.41,25.25Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M25.62,31.18a1,1,0,0,1-.45-1.89A12.44,12.44,0,0,0,25,6.89a1,1,0,1,1,.87-1.8,14.44,14.44,0,0,1,.24,26A1,1,0,0,1,25.62,31.18Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-3", "d": "M18,32.06a2,2,0,0,1-1.42-.59L9.14,24H4a2,2,0,0,1-2-2V14a2,2,0,0,1,2-2H9.22l7.33-7.39A2,2,0,0,1,20,6v24a2,2,0,0,1-1.24,1.85A2,2,0,0,1,18,32.06ZM4,14v8H9.56a1,1,0,0,1,.71.3L18,30.06V6L10.35,13.7a1,1,0,0,1-.71.3ZM18,6Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = VolumeUpLine;
