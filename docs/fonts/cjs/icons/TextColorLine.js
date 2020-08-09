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
var TextColorLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "text-color-line"), mithril_1.default("path", { "d": "M19.47,3.84a1.45,1.45,0,0,0-1.4-1H18a1.45,1.45,0,0,0-1.42,1L8.42,21.56a1.35,1.35,0,0,0-.14.59,1,1,0,0,0,1,1,1.11,1.11,0,0,0,1.08-.77l2.08-4.65h11l2.08,4.59a1.24,1.24,0,0,0,1.12.83,1.08,1.08,0,0,0,1.08-1.08,1.59,1.59,0,0,0-.14-.57ZM13.36,15.71,18,5.49l4.6,10.22Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 4.06, "y": 25, "width": 28, "height": 8, "rx": 2, "ry": 2, "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TextColorLine;
