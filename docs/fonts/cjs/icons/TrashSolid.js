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
var TrashSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "trash-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M6,9V31a2.93,2.93,0,0,0,2.86,3H27.09A2.93,2.93,0,0,0,30,31V9Zm9,20H13V14h2Zm8,0H21V14h2Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M30.73,5H23V4A2,2,0,0,0,21,2h-6.2A2,2,0,0,0,13,4V5H5A1,1,0,1,0,5,7H30.73a1,1,0,0,0,0-2Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TrashSolid;
