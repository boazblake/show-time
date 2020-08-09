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
var ThumbsUpSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "thumbs-up-solid"), mithril_1.default("path", { "d": "M19.63,12.12C17.51,9.28,14.88,2,14.88,2S12,2.83,12,5.25V15H2.23a29.46,29.46,0,0,0,1.44,9.74C5.61,30.27,7.8,32,7.8,32h6.86C16.9,32,21,30.06,24,28.31V15.51A10.84,10.84,0,0,1,19.63,12.12Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M27,13a1,1,0,0,0-1,1V30a1,1,0,0,0,1,1h7V13Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ThumbsUpSolid;
