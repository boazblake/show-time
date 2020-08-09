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
var FilmStripSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "film-strip-solid"), mithril_1.default("path", { "class": "clr-i-solid clr-i-solid-path-1", "d": "M30,4H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H30a2,2,0,0,0,2-2V6A2,2,0,0,0,30,4ZM20,7h2v3H20ZM14,7h2v3H14ZM10,29H8V26h2Zm0-19H8V7h2Zm6,19H14V26h2Zm6,0H20V26h2Zm3.16-10.16L15.39,23.2A1,1,0,0,1,14,22.28V13.57a1,1,0,0,1,1.41-.91L25.16,17A1,1,0,0,1,25.16,18.84ZM28,29H26V26h2Zm0-19H26V7h2Z" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FilmStripSolid;
