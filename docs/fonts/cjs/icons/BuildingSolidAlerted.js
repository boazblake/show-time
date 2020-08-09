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
var BuildingSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "building-solid-alerted"), mithril_1.default("path", { "d": "M17.88,3H6.12A2.12,2.12,0,0,0,4,5.12V33H9V30h6v3h5V14.64a3.67,3.67,0,0,1-1-4.76l1-1.65V5.12A2.12,2.12,0,0,0,17.88,3ZM9,25H7V23H9Zm0-5H7V18H9Zm0-5H7V13H9Zm0-5H7V8H9Zm4,15H11V23h2Zm0-5H11V18h2Zm0-5H11V13h2Zm0-5H11V8h2Zm4,15H15V23h2Zm0-5H15V18h2Zm0-5H15V13h2Zm0-5H15V8h2Z", "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted" }), mithril_1.default("path", { "d": "M22.23,15.4l-.23,0V33H33V15.4ZM26,25H24V23h2Zm0-5H24V18h2Zm4,5H28V23h2Zm0-5H28V18h2Z", "class": "clr-i-solid--alerted clr-i-solid-path-2--alerted" }), mithril_1.default("path", { "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "class": "clr-i-solid--alerted clr-i-solid-path-3--alerted clr-i-alert" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BuildingSolidAlerted;
