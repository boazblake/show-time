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
var RubleSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "ruble-solid"), mithril_1.default("path", { "d": "M20.75,9.25H15v8.81h5.79a4.66,4.66,0,0,0,4.86-4.4A4.65,4.65,0,0,0,20.75,9.25Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm2.75,18.56H15V22h8.29a1,1,0,0,1,0,2H15v5a1.25,1.25,0,0,1-2.5,0V24H11.25a1,1,0,0,1,0-2h1.21V20.56H11.25a1.25,1.25,0,0,1,0-2.5h1.21V8a1.25,1.25,0,0,1,1.25-1.25h7a7.14,7.14,0,0,1,7.36,6.9A7.15,7.15,0,0,1,20.75,20.56Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = RubleSolid;
