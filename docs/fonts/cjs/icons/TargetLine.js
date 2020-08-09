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
var TargetLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "target-line"), mithril_1.default("path", { "d": "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm0,30A14,14,0,1,1,32,18,14,14,0,0,1,18,32Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M18,7.2A10.8,10.8,0,1,0,28.8,18,10.81,10.81,0,0,0,18,7.2Zm0,20A9.2,9.2,0,1,1,27.2,18,9.21,9.21,0,0,1,18,27.2Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M18,12.31A5.69,5.69,0,1,0,23.69,18,5.69,5.69,0,0,0,18,12.31Zm0,9.77A4.09,4.09,0,1,1,22.09,18,4.09,4.09,0,0,1,18,22.09Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TargetLine;
