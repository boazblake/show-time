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
var BetaLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "beta-line"), mithril_1.default("path", { "d": "M7.21,14.07h3a1.61,1.61,0,0,1,1.81,1.5,1.44,1.44,0,0,1-.84,1.34,1.67,1.67,0,0,1,1.1,1.53,1.75,1.75,0,0,1-2,1.63H7.21Zm2.71,2.42c.48,0,.82-.28.82-.67s-.34-.65-.82-.65H8.49v1.32Zm.2,2.48a.75.75,0,1,0,0-1.47H8.49V19Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M14.55,15.23v1.2h3v1.16h-3v1.32h3.33v1.16H13.26v-6h4.62v1.16Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M20.41,15.23H18.54V14.07h5v1.16H21.7v4.84H20.41Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M28,19.12H25.32l-.38.95H23.5l2.44-6h1.44l2.45,6H28.38ZM27.55,18l-.89-2.19L25.77,18Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M8.06,30a.84.84,0,0,1-.38-.08A1,1,0,0,1,7.06,29V25h-4a1,1,0,0,1-1-1V10a1,1,0,0,1,1-1h30a1,1,0,0,1,1,1V24a1,1,0,0,1-1,1H13.48L8.77,29.71A1,1,0,0,1,8.06,30Zm-4-7h4a1,1,0,0,1,1,1v2.59l3.3-3.3a1,1,0,0,1,.7-.29h19V11h-28Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BetaLine;
