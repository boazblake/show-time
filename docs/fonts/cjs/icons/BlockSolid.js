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
var BlockSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "block-solid"), mithril_1.default("path", { "d": "M31.42,9.09l-13-6a1,1,0,0,0-.84,0l-13,6A1,1,0,0,0,4,10V27a1,1,0,0,0,.58.91l13,6a1,1,0,0,0,.84,0l13-6A1,1,0,0,0,32,27V10A1,1,0,0,0,31.42,9.09ZM18,14.9,7.39,10,18,5.1,28.61,10ZM30,26.36,19,31.44V16.64l11-5.08Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BlockSolid;
