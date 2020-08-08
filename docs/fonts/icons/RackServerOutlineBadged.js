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
var RackServerOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "rack-server-outline-badged"), mithril_1.default("rect", { "class": "clr-i-outline--badged clr-i-outline-path-1--badged", "x": 6, "y": 9, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline--badged clr-i-outline-path-2--badged", "x": 6, "y": 17, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline--badged clr-i-outline-path-3--badged", "x": 10, "y": 17, "width": 14, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline--badged clr-i-outline-path-4--badged", "x": 6, "y": 25, "width": 2, "height": 2 }), mithril_1.default("rect", { "class": "clr-i-outline--badged clr-i-outline-path-5--badged", "x": 10, "y": 25, "width": 14, "height": 2 }), mithril_1.default("path", { "class": "clr-i-outline--badged clr-i-outline-path-6--badged", "d": "M10,11H24v-.51A7.48,7.48,0,0,1,23.13,9H10Z" }), mithril_1.default("path", { "class": "clr-i-outline--badged clr-i-outline-path-7--badged", "d": "M30,13.5a7.47,7.47,0,0,1-2.68-.5H4V7H22.57a7.52,7.52,0,0,1-.07-1,7.52,7.52,0,0,1,.07-1H4A2,2,0,0,0,2,7V29a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V12.34A7.46,7.46,0,0,1,30,13.5ZM4,15H32v6H4ZM4,29V23H32v6Z" }), mithril_1.default("circle", { "class": "clr-i-outline--badged clr-i-outline-path-8--badged clr-i-badge", "cx": 30, "cy": 6, "r": 5 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = RackServerOutlineBadged;
