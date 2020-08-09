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
var WalletLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "wallet-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M32,15H31V9a1,1,0,0,0-1-1H6a1,1,0,0,1-1-.82V6.82A1,1,0,0,1,6,6H29.58a1,1,0,0,0,0-2H6A3,3,0,0,0,3,7a3.08,3.08,0,0,0,0,.36V27.93A4.1,4.1,0,0,0,7.13,32H30a1,1,0,0,0,1-1V25h1a1,1,0,0,0,1-1V16A1,1,0,0,0,32,15ZM29,30H7.13A2.11,2.11,0,0,1,5,27.93V9.88A3.11,3.11,0,0,0,6,10H29v5H22a5,5,0,0,0,0,10h7Zm2-7H22a3,3,0,0,1,0-6H31Z" }), mithril_1.default("circle", { "class": "clr-i-outline clr-i-outline-path-2", "cx": 23.01, "cy": 20, "r": 1.5 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = WalletLine;
