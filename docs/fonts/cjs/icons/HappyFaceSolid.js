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
var HappyFaceSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "happy-face-solid"), mithril_1.default("path", { "d": "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2ZM8.89,13.89a2,2,0,1,1,2,2A2,2,0,0,1,8.89,13.89Zm9.24,14.32a8.67,8.67,0,0,1-8.26-6H26.38A8.67,8.67,0,0,1,18.13,28.21Zm6.93-12.32a2,2,0,1,1,2-2A2,2,0,0,1,25.05,15.89Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HappyFaceSolid;
