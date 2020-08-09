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
var BackupSolidAlerted = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "backup-solid-alerted"), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-1--alerted", "d": "M16.58,21.26,10.2,14.91A3,3,0,0,1,9.44,12H7.07a1.92,1.92,0,0,0-1.9,1.32C2.86,19.68,2.24,21.43,2.07,22H17.33Z" }), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-2--alerted", "d": "M2,24v6a2,2,0,0,0,2,2H32a2,2,0,0,0,2-2V24Zm28,4H26V26h4Z" }), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-3--alerted", "d": "M18.66,22H33.93c-.15-.51-.65-1.93-2.35-6.6H25.3l-5.89,5.86Z" }), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-4--alerted", "d": "M18,19.84l4.47-4.44h-.23a3.64,3.64,0,0,1-2-.61L19,16V4a1,1,0,1,0-2,0V16l-4-3.95a1,1,0,0,0-1.41,1.42Z" }), mithril_1.default("path", { "class": "clr-i-solid--alerted clr-i-solid-path-5--alerted clr-i-alert", "d": "M26.85,1.14,21.13,11A1.28,1.28,0,0,0,22.23,13H33.68A1.28,1.28,0,0,0,34.78,11L29.06,1.14A1.28,1.28,0,0,0,26.85,1.14Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = BackupSolidAlerted;
