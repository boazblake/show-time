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
var YenSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "yen-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm8.07,7.91L19.74,20H22a1,1,0,0,1,0,2H19.25v2H22a1,1,0,0,1,0,2H19.25v2.75a1.25,1.25,0,0,1-2.5,0V26H14a1,1,0,1,1,0-2h2.75V22H14a1,1,0,1,1,0-2h2.26L9.93,9.91a1.25,1.25,0,1,1,2.12-1.33L18,18.08l5.95-9.49a1.25,1.25,0,1,1,2.12,1.33Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = YenSolid;
