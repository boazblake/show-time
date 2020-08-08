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
var CampervanSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "campervan-solid"), mithril_1.default("path", { "d": "M9.5,24C7.6,24,6,25.6,6,27.5S7.6,31,9.5,31c0,0,0,0,0,0c1.9,0,3.5-1.6,3.5-3.5c0,0,0-0.1,0-0.1C13,25.5,11.4,24,9.5,24z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("circle", { "cx": 23.5, "cy": 27.5, "r": 3.5, "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("path", { "d": "M29.5,14.5C31,13.6,32,12,32,10.2V9.7c0,0,0,0,0-0.1C32,7,29.9,5,27.3,5h-8.5c-1.9,0-3.7,1.2-4.4,3H5c-1.7,0-3,1.3-3,3v17\n\t\th2V11c0-0.6,0.4-1,1-1h10.9L16,9.2C16.3,7.9,17.4,7,18.7,7h8.5C28.8,7,30,8.2,30,9.7v0.5c0,1.5-1.2,2.7-2.7,2.7H27h-3v9h7.8\n\t\tl0.2,0.3V25c0,0.6-0.4,1-1,1h-2v2h2c1.7,0,3-1.3,3-3v-3.3L29.5,14.5z", "class": "clr-i-solid clr-i-solid-path-3" }), mithril_1.default("rect", { "x": 19, "y": 9, "width": 7.9, "height": 2, "class": "clr-i-solid clr-i-solid-path-4" }), mithril_1.default("polygon", { "points": "20,22 21.9,22 21.9,13 15,13 15,28 16.9,28 16.9,15 20,15 \t", "class": "clr-i-solid clr-i-solid-path-5" }), mithril_1.default("rect", { "x": 6, "y": 13, "width": 6.9, "height": 7, "class": "clr-i-solid clr-i-solid-path-6" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CampervanSolid;
