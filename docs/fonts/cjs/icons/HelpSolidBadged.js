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
var HelpSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "help-solid-badged"), mithril_1.default("path", { "d": "M33.12,12.81a7.49,7.49,0,0,1-9.93-9.93,16.06,16.06,0,1,0,9.93,9.93Zm-15.34,15a1.65,1.65,0,1,1,1.65-1.65A1.65,1.65,0,0,1,17.78,27.85Zm1.37-8.06v1.72a1.37,1.37,0,0,1-1.3,1.36h-.11a1.34,1.34,0,0,1-1.39-1.3c0-.44,0-2.76,0-2.76a1.19,1.19,0,0,1,1.12-1.31c1.57-.12,4.18-.7,4.18-3.25,0-1.83-1.41-3.07-3.43-3.07a5.31,5.31,0,0,0-4,1.92,1.36,1.36,0,0,1-2.35-.9,1.43,1.43,0,0,1,.43-1,7.77,7.77,0,0,1,6-2.69c3.7,0,6.28,2.3,6.28,5.6C24.58,17.16,22.61,19.2,19.15,19.79Z", "class": "clr-i-solid--badged clr-i-solid-path-1--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-solid--badged clr-i-solid-path-2--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HelpSolidBadged;
