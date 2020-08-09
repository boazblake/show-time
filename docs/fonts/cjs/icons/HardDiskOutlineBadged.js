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
var HardDiskOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "hard-disk-outline-badged"), mithril_1.default("rect", { "class": "clr-i-outline--badged clr-i-outline-path-1--badged", "x": 6, "y": 20, "width": 24, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline--badged clr-i-outline-path-2--badged", "x": 26, "y": 24, "width": 4, "height": 2 }), mithril_1.default("path", { "class": "clr-i-outline--badged clr-i-outline-path-3--badged", "d": "M34,21.08,32,13.21a7.49,7.49,0,0,1-2,.29l2,7.94V29H4V21.44L7.06,9H23.13a7.45,7.45,0,0,1-.55-2H7.06A2,2,0,0,0,5.13,8.47L2,21.08a1,1,0,0,0,0,.24V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V21.31A1,1,0,0,0,34,21.08Z" }), mithril_1.default("circle", { "class": "clr-i-outline--badged clr-i-outline-path-4--badged clr-i-badge", "cx": 30, "cy": 6, "r": 5 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HardDiskOutlineBadged;
