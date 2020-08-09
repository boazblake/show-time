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
var ClipboardSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "clipboard-solid-badged"), mithril_1.default("path", { "d": "M30,13.5A7.49,7.49,0,0,1,23.66,10H11.31V8a1,1,0,0,1,1-1h3.44V6.31a2.31,2.31,0,1,1,4.63,0V7h2.19a7.54,7.54,0,0,1-.07-1,7.52,7.52,0,0,1,.07-1h-.4a4.45,4.45,0,0,0-4.11-3A4.46,4.46,0,0,0,14,5H7A1.75,1.75,0,0,0,5,6.69V32.31A1.7,1.7,0,0,0,6.71,34H29.29A1.7,1.7,0,0,0,31,32.31V13.43A7.52,7.52,0,0,1,30,13.5ZM25,28H11V26H25Zm0-4H11V22H25Zm0-4H11V18H25Zm0-4H11V14H25Z", "class": "clr-i-solid--badged clr-i-solid-path-1--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-solid--badged clr-i-solid-path-2--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ClipboardSolidBadged;
