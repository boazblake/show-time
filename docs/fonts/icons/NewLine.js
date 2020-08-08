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
var NewLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "new-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M34.59,23l-4.08-5,4-4.9a1.82,1.82,0,0,0,.23-1.94A1.93,1.93,0,0,0,32.94,10h-31A1.91,1.91,0,0,0,0,11.88V24.13A1.91,1.91,0,0,0,1.94,26H33.05a1.93,1.93,0,0,0,1.77-1.09A1.82,1.82,0,0,0,34.59,23ZM2,24V12H32.78l-4.84,5.93L32.85,24Z" }), mithril_1.default("polygon", { "class": "clr-i-outline clr-i-outline-path-2", "points": "9.39 19.35 6.13 15 5 15 5 21.18 6.13 21.18 6.13 16.84 9.39 21.18 10.51 21.18 10.51 15 9.39 15 9.39 19.35" }), mithril_1.default("polygon", { "class": "clr-i-outline clr-i-outline-path-3", "points": "12.18 21.18 16.84 21.18 16.84 20.16 13.31 20.16 13.31 18.55 16.5 18.55 16.5 17.52 13.31 17.52 13.31 16.03 16.84 16.03 16.84 15 12.18 15 12.18 21.18" }), mithril_1.default("polygon", { "class": "clr-i-outline clr-i-outline-path-4", "points": "24.52 19.43 23.06 15 21.84 15 20.37 19.43 19.05 15 17.82 15 19.78 21.18 20.89 21.18 22.45 16.59 24 21.18 25.13 21.18 27.08 15 25.85 15 24.52 19.43" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = NewLine;
