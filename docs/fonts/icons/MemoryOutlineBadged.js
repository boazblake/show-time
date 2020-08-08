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
var MemoryOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "memory-outline-badged"), mithril_1.default("rect", { "x": 8, "y": 12, "width": 4, "height": 8, "class": "clr-i-outline--badged clr-i-outline-path-1--badged" }), mithril_1.default("rect", { "x": 16, "y": 12, "width": 4, "height": 8, "class": "clr-i-outline--badged clr-i-outline-path-2--badged" }), mithril_1.default("path", { "d": "M15,27H4V17H2V27a2,2,0,0,0,2,2H16.61V25.55h2.26V24H15Z", "class": "clr-i-outline--badged clr-i-outline-path-3--badged" }), mithril_1.default("path", { "d": "M32,17V27H19v2H32a2,2,0,0,0,2-2V17Z", "class": "clr-i-outline--badged clr-i-outline-path-4--badged" }), mithril_1.default("path", { "d": "M28,13.22A7.46,7.46,0,0,1,25.51,12H24v8h4Z", "class": "clr-i-outline--badged clr-i-outline-path-5--badged" }), mithril_1.default("path", { "d": "M4,9H23.13a7.45,7.45,0,0,1-.55-2H4A2,2,0,0,0,2,9v4H4Z", "class": "clr-i-outline--badged clr-i-outline-path-6--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-outline--badged clr-i-outline-path-7--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = MemoryOutlineBadged;
