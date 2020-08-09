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
var VmOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "vm-outline-badged"), mithril_1.default("path", { "d": "M11,5H22.57a7.45,7.45,0,0,1,.55-2H11A2,2,0,0,0,9,5v6.85h2Z", "class": "clr-i-outline--badged clr-i-outline-path-1--badged" }), mithril_1.default("path", { "d": "M30,13.5h0V26H22V17a2,2,0,0,0-2-2H6a2,2,0,0,0-2,2V31a2,2,0,0,0,2,2H20a2,2,0,0,0,2-2V28h8a2,2,0,0,0,2-2V13.22A7.49,7.49,0,0,1,30,13.5ZM6,31V17H20v9H16V20H14v6a2,2,0,0,0,2,2h4v3Z", "class": "clr-i-outline--badged clr-i-outline-path-2--badged" }), mithril_1.default("path", { "d": "M17,12h8v6h2V12.87A7.52,7.52,0,0,1,23.66,10H17Z", "class": "clr-i-outline--badged clr-i-outline-path-3--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-outline--badged clr-i-outline-path-4--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = VmOutlineBadged;
