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
var UnknownStatusLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "unknown-status-line"), mithril_1.default("circle", { "class": "clr-i-outline clr-i-outline-path-1", "cx": 17.58, "cy": 26.23, "r": 1.4 }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M24.7,13a5.18,5.18,0,0,0-2.16-3.56,7.26,7.26,0,0,0-5.71-1.09A11.34,11.34,0,0,0,12,10.44,1,1,0,1,0,13.26,12a9.32,9.32,0,0,1,3.94-1.72,5.29,5.29,0,0,1,4.16.74,3.21,3.21,0,0,1,1.35,2.19c.33,2.69-3.19,3.75-5.32,4.14l-.82.15v4.36a1,1,0,0,0,2,0V19.17C24.61,17.79,24.88,14.41,24.7,13Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = UnknownStatusLine;
