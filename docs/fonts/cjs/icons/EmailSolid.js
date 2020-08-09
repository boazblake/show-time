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
var EmailSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "email-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M32.33,6a2,2,0,0,0-.41,0h-28a2,2,0,0,0-.53.08L17.84,20.47Z" }), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-2", "d": "M33.81,7.39,19.25,21.89a2,2,0,0,1-2.82,0L2,7.5a2,2,0,0,0-.07.5V28a2,2,0,0,0,2,2h28a2,2,0,0,0,2-2V8A2,2,0,0,0,33.81,7.39ZM5.3,28H3.91V26.57l7.27-7.21,1.41,1.41Zm26.61,0H30.51l-7.29-7.23,1.41-1.41,7.27,7.21Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = EmailSolid;
