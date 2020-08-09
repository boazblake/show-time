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
var FileShare2Line = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "file_share2_line"), mithril_1.default("g", { "id": "b3dc53c0-2517-4c2c-b033-b6ee3b39cce0", "data-name": "Layer 3" }, mithril_1.default("path", { "d": "M25,4H7.83A1.89,1.89,0,0,0,6,5.91V30.09A1.89,1.89,0,0,0,7.83,32H28.17A1.87,1.87,0,0,0,30,30.09V9ZM24,5.78,28.2,10H24ZM8,30V6H22v6h6V30Z" }), mithril_1.default("path", { "d": "M22,21.81a2.11,2.11,0,0,0-1.44.62l-5.72-2.66v-.44l5.66-2.65a2.08,2.08,0,1,0,.06-2.94h0a2.14,2.14,0,0,0-.64,1.48v.23l-5.64,2.66a2.08,2.08,0,1,0-.08,2.95l.08-.08,5.67,2.66v.3A2.09,2.09,0,1,0,22,21.84Z" })));
    } };
exports.default = FileShare2Line;
