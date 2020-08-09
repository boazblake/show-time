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
var GridChartOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "grid-chart-outline-badged"), mithril_1.default("path", { "class": "clr-i-outline--badged clr-i-outline-path-1--badged", "d": "M15,17H4a2,2,0,0,1-2-2V8A2,2,0,0,1,4,6H15a2,2,0,0,1,2,2v7A2,2,0,0,1,15,17ZM4,8v7H15V8Z" }), mithril_1.default("path", { "class": "clr-i-outline--badged clr-i-outline-path-2--badged", "d": "M 32 17 L 21 17 C 19.895 17 19 16.105 19 15 L 19 8 C 19 6.895 19.895 6 21 6 L 22.59 6 C 22.59 6.019 22.59 6.037 22.59 6.056 C 22.59 6.729 22.68 7.381 22.848 8 L 21 8 L 21 15 L 32 15 L 32 13.175 C 32.717 12.972 33.389 12.664 34 12.269 L 34 15 C 34 16.105 33.105 17 32 17 Z" }), mithril_1.default("path", { "class": "clr-i-outline--badged clr-i-outline-path-3--badged", "d": "M15,30H4a2,2,0,0,1-2-2V21a2,2,0,0,1,2-2H15a2,2,0,0,1,2,2v7A2,2,0,0,1,15,30ZM4,21v7H15V21Z" }), mithril_1.default("path", { "class": "clr-i-outline--badged clr-i-outline-path-4--badged", "d": "M32,30H21a2,2,0,0,1-2-2V21a2,2,0,0,1,2-2H32a2,2,0,0,1,2,2v7A2,2,0,0,1,32,30ZM21,21v7H32V21Z" }), mithril_1.default("circle", { "class": "clr-i-outline--badged clr-i-outline-path-5--badged clr-i-badge", "cx": 30, "cy": 6, "r": 5 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = GridChartOutlineBadged;
