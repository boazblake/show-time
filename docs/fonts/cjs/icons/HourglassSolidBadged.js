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
var HourglassSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "hourglass-solid-badged"), mithril_1.default("path", { "d": "M28.67,32h-22a1,1,0,0,0,0,2h22a1,1,0,1,0,0-2Z", "class": "clr-i-solid--badged clr-i-solid-path-1--badged" }), mithril_1.default("path", { "d": "M6.67,4H22.78a7.45,7.45,0,0,1,.89-2h-17a1,1,0,1,0,0,2Z", "class": "clr-i-solid--badged clr-i-solid-path-2--badged" }), mithril_1.default("path", { "d": "M22.55,20.27a11.48,11.48,0,0,0-2.91-1.72V17.39a11.48,11.48,0,0,0,2.91-1.72A6.25,6.25,0,0,0,25,11.55,7.47,7.47,0,0,1,22.5,6H10.06v5.12a6.07,6.07,0,0,0,2.45,4.55,11.48,11.48,0,0,0,2.91,1.72v1.16a11.48,11.48,0,0,0-2.91,1.72,6.07,6.07,0,0,0-2.45,4.55v5.12H25V24.82A6.07,6.07,0,0,0,22.55,20.27Z", "class": "clr-i-solid--badged clr-i-solid-path-3--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-solid--badged clr-i-solid-path-4--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HourglassSolidBadged;
