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
var FloppySolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "floppy-solid-alerted"), mithril_1.default("path", { "d": "M22.23,15.4A3.69,3.69,0,0,1,19.35,14H12a2,2,0,0,1-2-2V6h2v6h6.58A3.67,3.67,0,0,1,19,9.89L22.45,4H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V15.4ZM26,30H10V21.5A1.5,1.5,0,0,1,11.5,20h13A1.5,1.5,0,0,1,26,21.5Z", "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted" }), mithril_1.default("path", { "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted clr-i-alert" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FloppySolidAlerted;
