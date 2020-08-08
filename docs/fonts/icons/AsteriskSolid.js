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
var AsteriskSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "asterisk-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M28.89,20.91l-5-2.91,4.87-2.86a3.11,3.11,0,0,0,1.14-1.08,3,3,0,0,0-4.09-4.15L21,12.76V7a3,3,0,0,0-6,0v5.76L10.15,9.91a3,3,0,1,0-3,5.18l5,2.91L7.2,20.86a3.11,3.11,0,0,0-1.14,1.08,3,3,0,0,0,4.09,4.14L15,23.24V28.9a3,3,0,0,0,2,2.94A3,3,0,0,0,21,29V23.24l4.85,2.85a3,3,0,1,0,3-5.18Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AsteriskSolid;
