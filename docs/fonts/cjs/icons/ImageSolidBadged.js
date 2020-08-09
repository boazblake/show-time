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
var ImageSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "image-solid-badged"), mithril_1.default("path", { "d": "M30,13.5A7.48,7.48,0,0,1,22.78,4H4A2,2,0,0,0,2,6V30a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V12.34A7.46,7.46,0,0,1,30,13.5ZM8.92,8a3,3,0,1,1-3,3A3,3,0,0,1,8.92,8ZM6,27V22.9l6-6.08a1,1,0,0,1,1.41,0L16,19.35,8.32,27Zm24,0H11.15l6.23-6.23,5.4-5.4a1,1,0,0,1,1.41,0L30,21.18Z", "class": "clr-i-solid--badged clr-i-solid-path-1--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-solid--badged clr-i-solid-path-2--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ImageSolidBadged;
