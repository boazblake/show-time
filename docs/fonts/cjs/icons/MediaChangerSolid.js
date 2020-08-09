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
var MediaChangerSolid = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "xmlns": "http://www.w3.org/2000/svg", "width": 36, "height": 36, "viewBox": "0 0 36 36" }, attrs), mithril_1.default("title", {}, "media-changer-solid"), mithril_1.default("g", { "id": "ba0b2497-6307-45b6-9686-1edaacea4644", "data-name": "Layer 4" }, mithril_1.default("path", { "d": "M30,4H6A2,2,0,0,0,4,6V30a2,2,0,0,0,2,2H7.88v1.57a1,1,0,0,0,2,0V32h16v1.57a1,1,0,0,0,2,0V32H30a2,2,0,0,0,2-2V6A2,2,0,0,0,30,4ZM17,28H8.81V26H17Zm0-4H8.81V22H17Zm0-4H8.81V18H17Zm0-4H8.81V14H17Zm0-4H8.81V10H17ZM22,24H20V22h2Zm0-4H20V18h2Zm4,4H24V22h2Zm0-4H24V18h2Zm0-6H20V10h6Z" })));
    } };
exports.default = MediaChangerSolid;
