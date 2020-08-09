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
var HeadphonesSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "headphones-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M18,3A14.27,14.27,0,0,0,4,17.5V31H8.2A1.74,1.74,0,0,0,10,29.33V22.67A1.74,1.74,0,0,0,8.2,21H6V17.5A12.27,12.27,0,0,1,18,5,12.27,12.27,0,0,1,30,17.5V21H27.8A1.74,1.74,0,0,0,26,22.67v6.67A1.74,1.74,0,0,0,27.8,31H32V17.5A14.27,14.27,0,0,0,18,3Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HeadphonesSolid;
