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
var ReplayOneLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "replay-one-line"), mithril_1.default("path", { "d": "M19,27.27a1,1,0,0,0,1-1V14a1,1,0,0,0-1-1H19a3.8,3.8,0,0,0-1.1.23l-2,.62a.92.92,0,0,0-.72.86.88.88,0,0,0,.88.86,1.46,1.46,0,0,0,.43-.08L18,15.07v11.2A1,1,0,0,0,19,27.27Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M18.06,5h-6.7l2.92-2.64A1,1,0,0,0,12.94.88L7.32,6,12.94,11a1,1,0,0,0,.67.26,1,1,0,0,0,.74-.33,1,1,0,0,0-.07-1.42L11.46,7h6.6A11.78,11.78,0,1,1,7.71,24.41,1,1,0,0,0,6,25.36,13.78,13.78,0,1,0,18.06,5Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ReplayOneLine;
