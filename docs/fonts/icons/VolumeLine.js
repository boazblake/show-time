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
var VolumeLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "volume-line"), mithril_1.default("path", { "d": "M25.88,32H12a4,4,0,0,1-4-4V11.46L2.31,5.77a1,1,0,0,1-.22-1.09A1,1,0,0,1,3,4.06H28.86a1,1,0,0,1,1,1V28A4,4,0,0,1,25.88,32ZM5.43,6l4.28,4.34a.75.75,0,0,1,.21.63v17A2.13,2.13,0,0,0,12,30H25.88A2.1,2.1,0,0,0,28,28V6Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M33,16a1,1,0,0,1-1-1V6H28.86a.92.92,0,0,1-1-.9,1,1,0,0,1,1-1H33a1,1,0,0,1,1,1V15A1,1,0,0,1,33,16Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M24,11H18a1,1,0,1,1,0-2H24a1,1,0,1,1,0,2Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("path", { "d": "M24,15H21a1,1,0,1,1,0-2H24a1,1,0,1,1,0,2Z", "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M24,19H18a1,1,0,1,1,0-2H24a1,1,0,1,1,0,2Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("path", { "d": "M24,27H18a1,1,0,1,1,0-2H24a1,1,0,1,1,0,2Z", "class": "clr-i-outline clr-i-outline-path-6" }), mithril_1.default("path", { "d": "M24,23H21A1,1,0,1,1,21,21H24A1,1,0,1,1,24,23Z", "class": "clr-i-outline clr-i-outline-path-7" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = VolumeLine;
