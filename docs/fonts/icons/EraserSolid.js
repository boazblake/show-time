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
var EraserSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "eraser-solid"), mithril_1.default("path", { "d": "M28,32H15.33L19,28.37l-9.9-9.9L3.54,24a1.83,1.83,0,0,0,0,2.6L9,32H3a1,1,0,0,0,0,2H28a1,1,0,0,0,0-2Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M34.08,10.65l-7.3-7.3a1.83,1.83,0,0,0-2.6,0L10.47,17.06l9.9,9.9L34.08,13.25A1.85,1.85,0,0,0,34.08,10.65Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = EraserSolid;
