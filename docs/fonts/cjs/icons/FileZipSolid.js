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
var FileZipSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "file-zip-solid"), mithril_1.default("path", { "d": "M15,25.6c0.9,0,1.6-0.7,1.6-1.6v-2.6h-3.2V24C13.4,24.9,14.1,25.6,15,25.6z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M21.9,4H7.8C6.8,4,6,4.9,6,5.9v24.2c0,1,0.8,1.9,1.8,1.9h20.3c1,0,1.8-0.9,1.8-1.9V11.9L21.9,4z M18,24c0,1.7-1.3,3-3,3\n\t\ts-3-1.3-3-3v-4h6V24z M17.2,12c0.6,0,1,0.4,1,1s-0.4,1-1,1H15v2h2.2c0.6,0,1,0.4,1,1s-0.4,1-1,1H15v-2h-2.2c-0.6,0-1-0.4-1-1\n\t\ts0.4-1,1-1H15v-2h-2.2c-0.6,0-1-0.4-1-1s0.4-1,1-1H15V8h2.2c0.6,0,1,0.4,1,1s-0.4,1-1,1H15v2H17.2z M21.9,12V6.5l5.7,5.5H21.9z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FileZipSolid;
