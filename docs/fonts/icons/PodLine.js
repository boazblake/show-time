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
var PodLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "pod-line"), mithril_1.default("path", { "d": "M26,32H10a6,6,0,0,1-6-6V10a6,6,0,0,1,6-6H26a6,6,0,0,1,6,6V26A6,6,0,0,1,26,32ZM10,6a4,4,0,0,0-4,4V26a4,4,0,0,0,4,4H26a4,4,0,0,0,4-4V10a4,4,0,0,0-4-4Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("path", { "d": "M26.56,15H15.44A1.43,1.43,0,0,0,14,16.44v8.12A1.43,1.43,0,0,0,15.44,26H26.56A1.43,1.43,0,0,0,28,24.56V16.44A1.43,1.43,0,0,0,26.56,15ZM26,24H16V17H26Z", "class": "clr-i-outline clr-i-outline-path-2" }), mithril_1.default("path", { "d": "M12.4,19H10V12H20v1.4h2v-2A1.43,1.43,0,0,0,20.56,10H9.44A1.43,1.43,0,0,0,8,11.44v8.12A1.43,1.43,0,0,0,9.44,21h3Z", "class": "clr-i-outline clr-i-outline-path-3" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PodLine;
