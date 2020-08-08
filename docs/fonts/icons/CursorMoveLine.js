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
var CursorMoveLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "cursor-move-line"), mithril_1.default("path", { "d": "M28.85,12.89a1,1,0,0,0-1.42,0,1,1,0,0,0,0,1.41L30.14,17H19V5.86l2.69,2.7a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.42L18,2,12.89,7.15a1,1,0,0,0-.29.71,1,1,0,0,0,1.71.7L17,5.86V17H5.86l2.7-2.69a1,1,0,0,0,0-1.41,1,1,0,0,0-1.42,0L2,18l5.14,5.11a1,1,0,0,0,.71.29,1,1,0,0,0,.7-1.71L5.86,19H17V30.14l-2.69-2.7a1,1,0,0,0-1.71.7,1,1,0,0,0,.29.71L18,34l5.11-5.14a1,1,0,0,0,0-1.42,1,1,0,0,0-1.41,0L19,30.14V19H30.14l-2.7,2.69a1,1,0,0,0,.7,1.71,1,1,0,0,0,.71-.29L34,18Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CursorMoveLine;
