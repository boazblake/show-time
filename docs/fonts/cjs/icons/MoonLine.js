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
var MoonLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "moon-line"), mithril_1.default("path", { "d": "M31,27.19a1,1,0,0,0-1-.56c-.28,0-.56,0-.85,0A11,11,0,0,1,24.92,5.61a1,1,0,0,0,.61-1,1,1,0,0,0-.67-.91,14.7,14.7,0,0,0-5-.87,15.12,15.12,0,0,0,0,30.24,14.78,14.78,0,0,0,11-4.81A1,1,0,0,0,31,27.19ZM19.89,31.12a13.12,13.12,0,0,1,0-26.24,11.81,11.81,0,0,1,2,.16,13,13,0,0,0,5.72,23.53A12.75,12.75,0,0,1,19.89,31.12Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = MoonLine;
