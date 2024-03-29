type VNode = {
  type: string;
  props: Record<string, any>;
  children: string | VNode[];
};

const Component = (props: Record<string, any>) => {
  const { title, text } = props;
  return {
    type: "div",
    props: { class: "component" },
    children: [
      {
        type: "h2",
        props: { class: "component-title" },
        children: title,
      },
      {
        type: "p",
        props: { class: "component-text" },
        children: text,
      },
    ],
  };
};

const entry: HTMLElement | null = document.getElementById("root");

const dom: VNode = {
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
      children:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque.",
    },
    Component({ title: "Component Title", text: "Component Text" }),
  ],
};

// const render = (vdom, container) => {
function render(vdom: VNode, container: HTMLElement | null) {
  const createElement = (node: VNode) => {
    const { type, props = {}, children } = node;
    const el: HTMLElement = document.createElement(type);

    for (const [key, value] of Object.entries(props)) {
      if (key === "class") {
        el.className = value;
      } else if (value === true) {
        el.setAttribute(key, "");
      } else if (value !== false && value != null) {
        (el as any)[key] = value;
      }
    }

    if (typeof children === "string") {
      el.textContent = children;
    } else if (Array.isArray(children)) {
      children.forEach((child: VNode) => {
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
