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
var ClockSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "clock-solid-badged"), mithril_1.default("path", { "d": "M33.12,12.81A7.48,7.48,0,0,1,22.68,7.63,11.24,11.24,0,0,0,18,6.6a11.39,11.39,0,0,0-2.69,22.47L15,30.63A13,13,0,0,1,18,5a12.81,12.81,0,0,1,4.51.82,7.46,7.46,0,0,1,.68-2.94,16.06,16.06,0,1,0,9.93,9.93ZM24.2,23.18a1,1,0,0,1-1.39.28l-5.9-4V10.75a1,1,0,0,1,2,0V18.4l5,3.39A1,1,0,0,1,24.2,23.18Z", "class": "clr-i-solid--badged clr-i-solid-path-1--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-solid--badged clr-i-solid-path-2--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ClockSolidBadged;
