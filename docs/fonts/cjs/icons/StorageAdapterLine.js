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
var StorageAdapterLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "storage-adapter-line"), mithril_1.default("path", { "d": "M6.06,30a1,1,0,0,1-1-1V8h-2a1,1,0,0,1,0-2h4V29A1,1,0,0,1,6.06,30Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M30.06,27h-25V9h25a3,3,0,0,1,3,3V24A3,3,0,0,1,30.06,27Zm-23-2h23a1,1,0,0,0,1-1V12a1,1,0,0,0-1-1h-23Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("rect", { "x": 22.06, "y": 20, "width": 6, "height": 2, "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 22.06, "y": 14, "width": 6, "height": 2, "class": "clr-i-outline clr-i-outline-path-4" }), mithril_1.default("path", { "d": "M19.06,22h-8V20h7V14h2v7A1,1,0,0,1,19.06,22Z", "class": "clr-i-outline clr-i-outline-path-5" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = StorageAdapterLine;
