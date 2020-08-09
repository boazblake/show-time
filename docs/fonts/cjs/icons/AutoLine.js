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
var AutoLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "auto-line"), mithril_1.default("rect", { "class": "clr-i-outline clr-i-outline-path-1", "x": 15, "y": 17, "width": 3, "height": 2 }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M26.45,14.17A22.1,22.1,0,0,0,19.38,7a9.64,9.64,0,0,0-9-.7,8.6,8.6,0,0,0-4.82,6.4c-.08.47-.14.92-.2,1.36A4,4,0,0,0,2,18v6.13a2,2,0,0,0,2,2V20H4V18a2,2,0,0,1,2-2H24.73A7.28,7.28,0,0,1,32,23.27V24h-2a4.53,4.53,0,1,0,.33,2H32a2,2,0,0,0,2-2v-.73A9.28,9.28,0,0,0,26.45,14.17ZM11,14H6.93c0-.31.09-.63.15-1A6.52,6.52,0,0,1,11,8h0Zm2,0V7.58a8.17,8.17,0,0,1,5.36,1.16A19,19,0,0,1,23.9,14ZM25.8,28.38a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,25.8,28.38Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-3", "d": "M14.17,24a4.53,4.53,0,1,0,.33,2h5.3c0-.08,0-.17,0-.25A6,6,0,0,1,20,24ZM10,28.38a2.5,2.5,0,1,1,2.5-2.5A2.5,2.5,0,0,1,10,28.38Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AutoLine;
