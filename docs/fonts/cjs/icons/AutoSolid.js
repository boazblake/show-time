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
var AutoSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "auto-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M26.87,14.28A22.36,22.36,0,0,0,19.65,6.9a9.64,9.64,0,0,0-9-.7,8.6,8.6,0,0,0-4.82,6.4c-.08.49-.15,1-.21,1.4h-1A2.59,2.59,0,0,0,2,16.59v8.55a.86.86,0,0,0,.86.86H4.59c0-.13,0-.26,0-.39a5.77,5.77,0,0,1,7.71-5.45l-1,1a4.56,4.56,0,0,0-4.34,1.58,3,3,0,0,0-.63.93A4.5,4.5,0,1,0,14.82,26h5.48c0-.13,0-.26,0-.39A5.77,5.77,0,0,1,28,20.16l-1,1a4.56,4.56,0,0,0-4.34,1.58,3,3,0,0,0-.63.93A4.5,4.5,0,1,0,30.53,26h2.61a.86.86,0,0,0,.86-.86V23.36A9.39,9.39,0,0,0,26.87,14.28ZM12,14H8c0-.35.1-.71.16-1.07a6.52,6.52,0,0,1,3.87-5h0ZM10.36,28.36a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,10.36,28.36ZM19,19H16V17h3Zm-6-5V7.47a8.16,8.16,0,0,1,5.4,1.15A19.15,19.15,0,0,1,24,14ZM26.06,28.36a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,26.06,28.36Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AutoSolid;
