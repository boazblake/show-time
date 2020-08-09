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
var TrashLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "trash-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M27.14,34H8.86A2.93,2.93,0,0,1,6,31V11.23H8V31a.93.93,0,0,0,.86,1H27.14A.93.93,0,0,0,28,31V11.23h2V31A2.93,2.93,0,0,1,27.14,34Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M30.78,9H5A1,1,0,0,1,5,7H30.78a1,1,0,0,1,0,2Z" }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-3", "x": 21, "y": 13, "width": 2, "height": 15 }), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-4", "x": 13, "y": 13, "width": 2, "height": 15 }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-5", "d": "M23,5.86H21.1V4H14.9V5.86H13V4a2,2,0,0,1,1.9-2h6.2A2,2,0,0,1,23,4Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TrashLine;
