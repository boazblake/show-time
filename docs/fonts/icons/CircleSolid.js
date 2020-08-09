import m from 'mithril';
const CircleSolid = { view: ({ attrs }) => m("svg", Object.assign({ "version": 1.1, "width": 36, "height": 36, "viewBox": "0 0 36 36", "preserveAspectRatio": "xMidYMid meet", "xmlns": "http://www.w3.org/2000/svg", "xmlns:xlink": "http://www.w3.org/1999/xlink" }, attrs), m("title", {}, "circle-solid"), m("path", { "d": "M18,4A14,14,0,1,0,32,18,14,14,0,0,0,18,4Z", "class": "clr-i-solid clr-i-solid-path-1" }), m("rect", { "x": 0, "y": 0, "width": 36, "height": 36, "fill-opacity": 0 })) };
export default CircleSolid;
