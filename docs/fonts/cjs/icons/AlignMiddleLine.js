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
var AlignMiddleLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "align-middle-line"), mithril_1.default("path", { "d": "M34,17H30V11a1,1,0,0,0-1-1H21a1,1,0,0,0-1,1v6H16V5a1,1,0,0,0-1-1H7A1,1,0,0,0,6,5V17H2a1,1,0,0,0,0,2H6V31a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V19h4v6a1,1,0,0,0,1,1h8a1,1,0,0,0,1-1V19h4a1,1,0,0,0,0-2ZM14,30H8V6h6Zm14-6H22V12h6Z", "class": "clr-i-outline clr-i-outline-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AlignMiddleLine;
