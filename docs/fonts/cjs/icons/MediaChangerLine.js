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
var MediaChangerLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "media-changer-outline"), mithril_1.default("g", { "id": "a29051cd-f44c-4c21-9fc8-7ef7ad7836ef", "data-name": "Layer 4" }, mithril_1.default("path", { "d": "M30,4H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H7.88v1.57a1,1,0,0,0,2,0V32h16v1.57a1,1,0,0,0,2,0V32H30a2,2,0,0,0,2-2V6A2,2,0,0,0,30,4ZM6,30V6H30V30Z" }), mithril_1.default("rect", { "x": 20, "y": 18, "width": 2, "height": 2 }), mithril_1.default("rect", { "x": 24, "y": 18, "width": 2, "height": 2 }), mithril_1.default("rect", { "x": 20, "y": 22, "width": 2, "height": 2 }), mithril_1.default("rect", { "x": 24, "y": 22, "width": 2, "height": 2 }), mithril_1.default("path", { "d": "M27.22,10H20v4a.8.8,0,1,0,1.59,0V11.6h5.63a.8.8,0,1,0,0-1.6Z" }), mithril_1.default("rect", { "x": 8.81, "y": 10, "width": 8.14, "height": 2 }), mithril_1.default("rect", { "x": 8.81, "y": 14, "width": 8.14, "height": 2 }), mithril_1.default("rect", { "x": 8.81, "y": 18, "width": 8.14, "height": 2 }), mithril_1.default("rect", { "x": 8.81, "y": 22, "width": 8.14, "height": 2 }), mithril_1.default("rect", { "x": 8.81, "y": 26, "width": 8.14, "height": 2 })));
    } };
exports.default = MediaChangerLine;
