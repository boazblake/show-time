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
var CalculatorSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "calculator-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M28,2H8A2,2,0,0,0,6,4V32a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V4A2,2,0,0,0,28,2ZM12,28H10V26h2Zm0-6H10V20h2Zm0-6H10V14h2Zm7,12H17V26h2Zm0-6H17V20h2Zm0-6H17V14h2Zm7,12H24V26h2Zm0-6H24V20h2Zm0-6H24V14h2Zm0-7H10V5H26Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = CalculatorSolid;
