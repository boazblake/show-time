import m from 'mithril';
const MinusLine = { view: ({ attrs }) => m("svg", Object.assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), m("title", {}, "minus-line"), m("path", { "d": "M26,17H10a1,1,0,0,0,0,2H26a1,1,0,0,0,0-2Z", "class": "clr-i-outline clr-i-outline-path-1" }), m("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 })) };
export default MinusLine;
