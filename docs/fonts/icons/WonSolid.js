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
var WonSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "won-solid"), mithril_1.default("polygon", { "class": "clr-i-solid clr-i-solid-path-1", "points": "17.74 16 17.22 18 18.85 18 18.32 16 17.74 16" }), mithril_1.default("polygon", { "class": "clr-i-solid clr-i-solid-path-2", "points": "11.94 18 14.63 18 15.16 16 11.41 16 11.94 18" }), mithril_1.default("polygon", { "class": "clr-i-solid clr-i-solid-path-3", "points": "13.29 23.1 14.1 20 12.47 20 13.29 23.1" }), mithril_1.default("polygon", { "class": "clr-i-solid clr-i-solid-path-4", "points": "21.44 18 24.13 18 24.66 16 20.91 16 21.44 18" }), mithril_1.default("polygon", { "class": "clr-i-solid clr-i-solid-path-5", "points": "22.78 23.1 23.6 20 21.97 20 22.78 23.1" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-6", "d": "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2ZM29,20H26.19L24,28.32a1.25,1.25,0,0,1-2.42,0L19.38,20H16.69l-2.19,8.32a1.25,1.25,0,0,1-2.42,0L9.88,20H7a1,1,0,0,1,0-2H9.35l-.53-2H7a1,1,0,0,1,0-2H8.3l-1-3.68a1.25,1.25,0,0,1,2.42-.64L10.88,14h4.8l1.14-4.32a1.25,1.25,0,0,1,2.42,0L20.38,14h4.8l1.14-4.32a1.25,1.25,0,0,1,2.42.64l-1,3.68H29a1,1,0,0,1,0,2H27.24l-.53,2H29a1,1,0,0,1,0,2Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = WonSolid;
