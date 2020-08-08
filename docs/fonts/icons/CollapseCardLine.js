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
var CollapseCardLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "collapse-card-line"), mithril_1.default("path", { "d": "M33,21H3a1,1,0,0,0-1,1v6a1,1,0,0,0,1,1H33a1,1,0,0,0,1-1V22A1,1,0,0,0,33,21Zm-1,6H4V23H32Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M18,20.22l5.65-5.65a.81.81,0,0,0,0-1.14.8.8,0,0,0-1.13,0L18,18l-4.52-4.52a.8.8,0,0,0-1.13,0,.81.81,0,0,0,0,1.14Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M18,14.22l5.65-5.65a.81.81,0,0,0,0-1.14.8.8,0,0,0-1.13,0L18,12,13.48,7.43a.8.8,0,0,0-1.13,0,.81.81,0,0,0,0,1.14Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CollapseCardLine;
