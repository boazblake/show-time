import m from 'mithril';
const EllipsisHorizontalLine = { view: ({ attrs }) => m("svg", Object.assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), m("title", {}, "ellipsis-horizontal-line"), m("circle", { "cx": 31.1, "cy": 18, "r": 2.9, "class": "clr-i-outline clr-i-outline-path-1" }), m("circle", { "cx": 18, "cy": 18, "r": 2.9, "class": "clr-i-outline clr-i-outline-path-2" }), m("circle", { "cx": 4.9, "cy": 18, "r": 2.9, "class": "clr-i-outline clr-i-outline-path-3" }), m("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 })) };
export default EllipsisHorizontalLine;
