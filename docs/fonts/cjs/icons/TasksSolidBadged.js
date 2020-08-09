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
var TasksSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "tasks-solid-badged"), mithril_1.default("path", { "class": "clr-i-solid--badged clr-i-solid-path-1--badged", "d": "M30,13.5a7.49,7.49,0,0,1-6.46-3.7H11.25V8a1,1,0,0,1,1-1h3.44V6.32a2.31,2.31,0,0,1,4.63,0V7h2.26a7.53,7.53,0,0,1-.07-1,7.53,7.53,0,0,1,.08-1.05h-.5a4.31,4.31,0,0,0-8.17,0H7A1.75,1.75,0,0,0,5,6.64V32.26a1.7,1.7,0,0,0,1.71,1.69H29.29A1.7,1.7,0,0,0,31,32.26V13.43A7.52,7.52,0,0,1,30,13.5Zm-4.23,3.71-9.12,9.12-5.24-5.24a1.4,1.4,0,0,1,2-2l3.26,3.26,7.14-7.14a1.4,1.4,0,1,1,2,2Z" }), mithril_1.default("circle", { "class": "clr-i-solid--badged clr-i-solid-path-2--badged clr-i-badge", "cx": 30, "cy": 6, "r": 5 }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = TasksSolidBadged;
