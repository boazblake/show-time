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
var TalkBubblesOutlineBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "talk-bubbles-outline-badged"), mithril_1.default("path", { "d": "M23,26a1,1,0,0,1-1,1H8c-.22,0-.43.2-.61.33L4,30V14a1,1,0,0,1,1-1H8.86V11H5a3,3,0,0,0-3,3V32a1,1,0,0,0,.56.89,1,1,0,0,0,1-.1L8.71,29H22.15A2.77,2.77,0,0,0,25,26.13V25H23Z", "class": "clr-i-outline--badged clr-i-outline-path-1--badged" }), mithril_1.default("path", { "d": "M32,13.22v9.72L28.5,20.21a1,1,0,0,0-.61-.21H14a1,1,0,0,1-1-1V7a1,1,0,0,1,1-1H22.5a7.49,7.49,0,0,1,.28-2H14a3,3,0,0,0-3,3V19a3,3,0,0,0,3,3H27.55l4.78,3.71a1,1,0,0,0,1,.11,1,1,0,0,0,.57-.9V12.37A7.45,7.45,0,0,1,32,13.22Z", "class": "clr-i-outline--badged clr-i-outline-path-2--badged" }), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-outline--badged clr-i-outline-path-3--badged clr-i-badge" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TalkBubblesOutlineBadged;
