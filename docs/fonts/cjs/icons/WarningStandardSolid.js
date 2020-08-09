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
var WarningStandardSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "warning-standard-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M34.6,29.21,20.71,3.65a3.22,3.22,0,0,0-5.66,0L1.17,29.21A3.22,3.22,0,0,0,4,34H31.77a3.22,3.22,0,0,0,2.83-4.75ZM16.6,10a1.4,1.4,0,0,1,2.8,0v12a1.4,1.4,0,0,1-2.8,0ZM18,29.85a1.8,1.8,0,1,1,1.8-1.8A1.8,1.8,0,0,1,18,29.85Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = WarningStandardSolid;
