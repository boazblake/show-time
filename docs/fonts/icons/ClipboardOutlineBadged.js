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
var ClipboardOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "clipboard-outline-badged"), mithril_1.default("rect", { "x": 11, "y": 14, "width": 14, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-1--badged" }), mithril_1.default("rect", { "x": 11, "y": 18, "width": 14, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-2--badged" }), mithril_1.default("rect", { "x": 11, "y": 22, "width": 14, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-3--badged" }), mithril_1.default("rect", { "x": 11, "y": 26, "width": 14, "height": 2, "class": "clr-i-outline--badged clr-i-outline-path-4--badged" }), mithril_1.default("path", { "d": "M23.13,9H12V7.33A.33.33,0,0,1,12.33,7H16V6a2,2,0,0,1,4,0V7h2.57a7.52,7.52,0,0,1-.07-1,7.52,7.52,0,0,1,.07-1h-.7a4,4,0,0,0-7.75,0H12.33A2.34,2.34,0,0,0,10,7.33V11H24.42A7.5,7.5,0,0,1,23.13,9Z", "class": "clr-i-outline--badged clr-i-outline-path-5--badged" }), mithril_1.default("path", { "d": "M30,13.5a7.52,7.52,0,0,1-1-.07V32H7V7H9V5H7A1.75,1.75,0,0,0,5,6.69V32.31A1.7,1.7,0,0,0,6.71,34H29.29A1.7,1.7,0,0,0,31,32.31V13.43A7.52,7.52,0,0,1,30,13.5Z", "class": "clr-i-outline--badged clr-i-outline-path-6--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-outline--badged clr-i-outline-path-7--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ClipboardOutlineBadged;
