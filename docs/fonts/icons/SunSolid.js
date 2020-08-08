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
var SunSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "sun-solid"), mithril_1.default("path", { "d": "M18,6.42a1,1,0,0,0,1-1V1.91a1,1,0,0,0-2,0V5.42A1,1,0,0,0,18,6.42Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M18,29.58a1,1,0,0,0-1,1v3.51a1,1,0,0,0,2,0V30.58A1,1,0,0,0,18,29.58Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M8.4,9.81A1,1,0,0,0,9.81,8.4L7.33,5.92A1,1,0,0,0,5.92,7.33Z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("path", { "d": "M27.6,26.19a1,1,0,0,0-1.41,1.41l2.48,2.48a1,1,0,0,0,1.41-1.41Z", "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("path", { "d": "M6.42,18a1,1,0,0,0-1-1H1.91a1,1,0,0,0,0,2H5.42A1,1,0,0,0,6.42,18Z", "class": "clr-i-solid clr-i-solid-path-5" }), mithril_1.default("path", { "d": "M34.09,17H30.58a1,1,0,0,0,0,2h3.51a1,1,0,0,0,0-2Z", "class": "clr-i-solid clr-i-solid-path-6" }), mithril_1.default("path", { "d": "M8.4,26.19,5.92,28.67a1,1,0,0,0,1.41,1.41L9.81,27.6A1,1,0,0,0,8.4,26.19Z", "class": "clr-i-solid clr-i-solid-path-7" }), mithril_1.default("path", { "d": "M27.6,9.81l2.48-2.48a1,1,0,0,0-1.41-1.41L26.19,8.4A1,1,0,0,0,27.6,9.81Z", "class": "clr-i-solid clr-i-solid-path-8" }), mithril_1.default("circle", { "cx": 18, "cy": 18, "r": 10, "class": "clr-i-solid clr-i-solid-path-9" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = SunSolid;
