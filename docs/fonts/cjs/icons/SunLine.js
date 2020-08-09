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
var SunLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "sun-line"), mithril_1.default("path", { "d": "M18,6.31a1,1,0,0,0,1-1V1.91a1,1,0,0,0-2,0v3.4A1,1,0,0,0,18,6.31Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M18,29.69a1,1,0,0,0-1,1v3.4a1,1,0,0,0,2,0v-3.4A1,1,0,0,0,18,29.69Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M8.32,9.74A1,1,0,0,0,9,10a1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42L7.33,5.92A1,1,0,0,0,5.92,7.33Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M27.68,26.26a1,1,0,1,0-1.42,1.42l2.41,2.4a1,1,0,0,0,.71.3,1,1,0,0,0,.7-.3,1,1,0,0,0,0-1.41Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M6.31,18a1,1,0,0,0-1-1H1.91a1,1,0,0,0,0,2h3.4A1,1,0,0,0,6.31,18Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M34.09,17h-3.4a1,1,0,1,0,0,2h3.4a1,1,0,0,0,0-2Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("path", { "d": "M8.32,26.26l-2.4,2.41a1,1,0,0,0,.7,1.71,1,1,0,0,0,.71-.3l2.41-2.4a1,1,0,1,0-1.42-1.42Z", "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("path", { "d": "M27,10a1,1,0,0,0,.71-.29l2.4-2.41a1,1,0,0,0,0-1.41,1,1,0,0,0-1.41,0l-2.41,2.4a1,1,0,0,0,0,1.42A1,1,0,0,0,27,10Z", "class": "clr-i-outline clr-i-outline-path-8" }), mithril_1.default("path", { "d": "M18.13,7.75a10.13,10.13,0,1,0,10,10.13A10.08,10.08,0,0,0,18.13,7.75Zm0,18.25a8.13,8.13,0,1,1,8-8.12A8.08,8.08,0,0,1,18.13,26Z", "class": "clr-i-outline clr-i-outline-path-9" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = SunLine;
