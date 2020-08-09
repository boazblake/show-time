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
var AddTextLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "add-text-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M31,21H13a1,1,0,0,0,0,2H31a1,1,0,0,0,0-2Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-2", "d": "M12,16a1,1,0,0,0,1,1H31a1,1,0,0,0,0-2H13A1,1,0,0,0,12,16Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-3", "d": "M27,27H13a1,1,0,0,0,0,2H27a1,1,0,0,0,0-2Z" }), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-4", "d": "M15.89,9a1,1,0,0,0-1-1H10V3.21a1,1,0,0,0-2,0V8H2.89a1,1,0,0,0,0,2H8v5.21a1,1,0,0,0,2,0V10h4.89A1,1,0,0,0,15.89,9Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = AddTextLine;
