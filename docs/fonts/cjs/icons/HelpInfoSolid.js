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
var HelpInfoSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "help-info-solid"), mithril_1.default("circle", { "cx": 20.75, "cy": 6, "r": 4, "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("path", { "d": "M24.84,26.23a1,1,0,0,0-1.4.29,16.6,16.6,0,0,1-3.51,3.77c-.33.25-1.56,1.2-2.08,1-.36-.11-.15-.82-.08-1.12l.53-1.57c.22-.64,4.05-12,4.47-13.3.62-1.9.35-3.77-2.48-3.32-.77.08-8.58,1.09-8.72,1.1a1,1,0,0,0,.13,2s3-.39,3.33-.42a.88.88,0,0,1,.85.44,2.47,2.47,0,0,1-.07,1.71c-.26,1-4.37,12.58-4.5,13.25a2.78,2.78,0,0,0,1.18,3,5,5,0,0,0,3.08.83h0a8.53,8.53,0,0,0,3.09-.62c2.49-1,5.09-3.66,6.46-5.75A1,1,0,0,0,24.84,26.23Z", "class": "clr-i-solid clr-i-solid-path-2" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HelpInfoSolid;
