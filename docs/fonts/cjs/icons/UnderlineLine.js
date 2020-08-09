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
var UnderlineLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "underline-line"), mithril_1.default("path", { "d": "M18,28.17c5.08,0,8.48-3.08,8.48-9V8.54a1.15,1.15,0,1,0-2.3,0v10.8c0,4.44-2.38,6.71-6.13,6.71s-6.21-2.47-6.21-6.85V8.54a1.15,1.15,0,1,0-2.3,0v10.8C9.53,25.09,13,28.17,18,28.17Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M31,30H5a1.11,1.11,0,0,0,0,2.21H31A1.11,1.11,0,0,0,31,30Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = UnderlineLine;
