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
var ChatBubbleSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "chat-bubble-solid"), mithril_1.default("path", { "d": "M18,2.5c-8.82,0-16,6.28-16,14s7.18,14,16,14a18,18,0,0,0,4.88-.68l5.53,3.52a1,1,0,0,0,1.54-.84l0-6.73a13,13,0,0,0,4-9.27C34,8.78,26.82,2.5,18,2.5Zm8,14a1,1,0,0,1-1,1H11a1,1,0,0,1,0-2H25A1,1,0,0,1,26,16.5Zm-3.25,5a1,1,0,0,1-1,1h-7.5a1,1,0,0,1,0-2h7.5A1,1,0,0,1,22.75,21.5Zm-12.47-10a1,1,0,0,1,1-1H24.72a1,1,0,0,1,0,2H11.28A1,1,0,0,1,10.28,11.5Z", "class": "clr-i-solid clr-i-solid-path-1" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = ChatBubbleSolid;
