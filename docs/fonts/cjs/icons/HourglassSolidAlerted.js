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
var HourglassSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "hourglass-solid-alerted"), mithril_1.default("path", { "d": "M28.67,32h-22a1,1,0,0,0,0,2h22a1,1,0,1,0,0-2Z", "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted" }), mithril_1.default("path", { "d": "M6.67,4H22.45L23.6,2H6.67a1,1,0,1,0,0,2Z", "class": "clr-i-solid--alerted clr-i-solid-path-2--alerted" }), mithril_1.default("path", { "d": "M12.51,20.27a6.07,6.07,0,0,0-2.45,4.55v5.12H25V24.82a6.07,6.07,0,0,0-2.45-4.55,11.48,11.48,0,0,0-2.91-1.72V17.39a11.48,11.48,0,0,0,2.91-1.72l.3-.27h-.62A3.68,3.68,0,0,1,19,9.89L21.29,6H10.06v5.12a6.07,6.07,0,0,0,2.45,4.55,11.48,11.48,0,0,0,2.91,1.72v1.16A11.48,11.48,0,0,0,12.51,20.27Z", "class": "clr-i-solid--alerted clr-i-solid-path-3--alerted" }), mithril_1.default("path", { "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z", "class": "clr-i-solid--alerted clr-i-solid-path-4--alerted clr-i-alert" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = HourglassSolidAlerted;
