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
var FileSettingsSolidBadged = { view: function (_a) {
        var attrs = _a.attrs;
        return mithril_1.default("svg", __assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), mithril_1.default("title", {}, "file-settings-solid-badged"), mithril_1.default("circle", { "cx": 30, "cy": 6, "r": 5, "class": "clr-i-solid--badged clr-i-solid-path-1--badged clr-i-badge" }), mithril_1.default("path", { "d": "M33.54,23.47l-2-.61a7.06,7.06,0,0,0-.58-1.41l1-1.86a.37.37,0,0,0-.07-.44L30.41,17.7a.37.37,0,0,0-.44-.07l-1.85,1A7,7,0,0,0,26.69,18l-.61-2a.37.37,0,0,0-.36-.25h-2a.37.37,0,0,0-.35.26l-.61,2a7,7,0,0,0-1.44.61l-1.82-1a.37.37,0,0,0-.44.07l-1.47,1.44a.37.37,0,0,0-.07.44l1,1.82a7,7,0,0,0-.61,1.44l-2,.61a.37.37,0,0,0-.26.35v2a.37.37,0,0,0,.26.35l2,.61a7,7,0,0,0,.61,1.41l-1,1.9a.37.37,0,0,0,.07.44L19,32a.37.37,0,0,0,.44.07l1.87-1a7.06,7.06,0,0,0,1.39.57l.61,2a.37.37,0,0,0,.35.26h2a.37.37,0,0,0,.35-.26l.61-2a7,7,0,0,0,1.38-.57l1.89,1a.37.37,0,0,0,.44-.07l1.45-1.45a.37.37,0,0,0,.07-.44l-1-1.88a7.06,7.06,0,0,0,.58-1.39l2-.61a.37.37,0,0,0,.26-.35V23.83A.37.37,0,0,0,33.54,23.47ZM24.7,28.19A3.33,3.33,0,1,1,28,24.86,3.33,3.33,0,0,1,24.7,28.19Z", "class": "clr-i-solid--badged clr-i-solid-path-2--badged" }), mithril_1.default("path", { "d": "M15.55,31H6V5H23.08a6.94,6.94,0,0,1,.6-2H6A2,2,0,0,0,4,5V31a2,2,0,0,0,2,2H17.16l-1-1A2.38,2.38,0,0,1,15.55,31Z", "class": "clr-i-solid--badged clr-i-solid-path-3--badged" }), mithril_1.default("path", { "d": "M28,15.36V12.71a7,7,0,0,1-2-1v2A2.37,2.37,0,0,1,28,15.36Z", "class": "clr-i-solid--badged clr-i-solid-path-4--badged" }), mithril_1.default("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 }));
    } };
exports.default = FileSettingsSolidBadged;
