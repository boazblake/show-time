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
var PoundLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "pound-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M27.9,30H13.4A8.45,8.45,0,0,0,15,24.65V21h4.31a1,1,0,0,0,0-2H15V11.31A5.24,5.24,0,0,1,20.21,6,5.19,5.19,0,0,1,24,7.73a1,1,0,0,0,1.48-1.35A7.19,7.19,0,0,0,13,11.31V19H8.72a1,1,0,1,0,0,2H13v3.65C13,29.38,10.12,30,10,30a1,1,0,0,0,.17,2H27.9a1,1,0,1,0,0-2Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PoundLine;
