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
var PoundSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "pound-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M18,2A16,16,0,1,0,34,18,16,16,0,0,0,18,2Zm6.5,25.92H11.74a1.25,1.25,0,0,1-.22-2.48c.15,0,1.72-.49,1.72-3.54V19h-2.5a1,1,0,0,1,0-2h2.5V11.88a5.85,5.85,0,0,1,5.72-6,5.63,5.63,0,0,1,4.21,1.94A1.25,1.25,0,1,1,21.3,9.51,3.08,3.08,0,0,0,19,8.42a3.35,3.35,0,0,0-3.22,3.46V17h3a1,1,0,0,1,0,2h-3v2.9A7.65,7.65,0,0,1,15,25.42H24.5a1.25,1.25,0,0,1,0,2.5Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = PoundSolid;
