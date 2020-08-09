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
var RadarLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "radar-line"), mithril_1.default("path", { "d": "M32,18c0,7.7-6.3,14-14,14c-7.7,0-14-6.3-14-14C4,10.6,9.7,4.5,17.1,4v3.7c-5.7,0.5-9.9,5.5-9.4,11.2s5.5,9.9,11.2,9.4\n\tc5.3-0.5,9.4-4.9,9.4-10.3h-2c0,4.6-3.7,8.3-8.3,8.3s-8.3-3.7-8.3-8.3c0-4.2,3.1-7.8,7.3-8.3v4.4c-1.8,0.4-3.1,2-3.1,3.9\n\tc0,2.2,1.8,4,4,4s4-1.8,4-4c0-1.8-1.3-3.4-3-3.8V2.1C18.6,2,18.3,2,18,2C9.2,2,2,9.2,2,18s7.2,16,16,16s16-7.2,16-16H32z M20,18\n\tc0,1.1-0.9,2-2,2s-2-0.9-2-2s0.9-2,2-2S20,16.9,20,18z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = RadarLine;
