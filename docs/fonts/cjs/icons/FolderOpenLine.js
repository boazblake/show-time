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
var FolderOpenLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "folder-open-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M35.32,13.74A1.71,1.71,0,0,0,33.87,13H11.17a2.59,2.59,0,0,0-2.25,1.52,1,1,0,0,0,0,.14L6,25V7h6.49l2.61,3.59a1,1,0,0,0,.81.41H32a2,2,0,0,0-2-2H16.42L14.11,5.82A2,2,0,0,0,12.49,5H6A2,2,0,0,0,4,7V29.69A1.37,1.37,0,0,0,5.41,31H30.34a1,1,0,0,0,1-.72l4.19-15.1A1.64,1.64,0,0,0,35.32,13.74ZM29.55,29H6.9l3.88-13.81a.66.66,0,0,1,.38-.24H33.49Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FolderOpenLine;
