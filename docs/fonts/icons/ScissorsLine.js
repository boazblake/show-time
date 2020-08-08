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
var ScissorsLine = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "scissors-line"), mithril_1.default("path", { "class": "clr-i-outline clr-i-outline-path-1", "d": "M24.06,18.18l9.61-8.77a1,1,0,0,0-.09-1.55l-2.24-1.6a3.57,3.57,0,0,0-4.28.12L15.88,15.3l-3.26-2.52a5.45,5.45,0,1,0-1,1.77l2.62,2L10,20a5.48,5.48,0,1,0,1.59,1.29L28.3,7.94a1.57,1.57,0,0,1,1.88-.05l1.23.88L21.1,18.19l10.31,9.4-1.23.88a1.57,1.57,0,0,1-1.88-.05l-9.81-7.85L17,21.93l10.06,8a3.57,3.57,0,0,0,4.29.12l2.24-1.6a1,1,0,0,0,.09-1.55ZM7.45,14.54a3.46,3.46,0,1,1,3.45-3.46A3.46,3.46,0,0,1,7.45,14.54Zm0,13.72A3.46,3.46,0,1,1,10.9,24.8,3.46,3.46,0,0,1,7.45,28.26Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ScissorsLine;
