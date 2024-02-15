var entry = document.getElementById("root");
var dom = {
    type: "div",
    props: { id: "hello", class: "foo" },
    children: [
        {
            type: "h1",
            props: { class: "title" },
            children: "Hello World",
        },
        {
            type: "p",
            props: { class: "bar" },
            children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
        },
    ],
};
// const render = (vdom, container) => {
function render(vdom, container) {
    var createElement = function (node) {
        var type = node.type, _a = node.props, props = _a === void 0 ? {} : _a, children = node.children;
        var el = document.createElement(type);
        for (var _i = 0, _b = Object.entries(props); _i < _b.length; _i++) {
            var _c = _b[_i], key = _c[0], value = _c[1];
            if (key === "class") {
                el.className = value;
            }
            else if (value === true) {
                el.setAttribute(key, "");
            }
            else if (value !== false && value != null) {
                el[key] = value;
            }
        }
        if (typeof children === "string") {
            el.textContent = children;
        }
        else if (Array.isArray(children)) {
            children.forEach(function (child) {
                if (child) {
                    el.appendChild(createElement(child));
                }
            });
        }
        return el;
    };
    if (!vdom || !container) {
        console.error("Invalid virtual DOM or container element");
        return;
    }
    container.appendChild(createElement(vdom));
}
render(dom, entry);
