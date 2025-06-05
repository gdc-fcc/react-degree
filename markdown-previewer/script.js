import 'https://unpkg.com/react@16/umd/react.production.min.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js';
import 'https://cdnjs.cloudflare.com/ajax/libs/marked/15.0.7/marked.min.js';
const Editor = ({
  id,
  text,
  setText
}) => /*#__PURE__*/React.createElement("textarea", {
  id: id,
  onInput: e => setText(e.target.value),
  value: text
});
const Preview = ({
  id,
  text
}) => {
  const parsed = marked.parse(text, {
    breaks: true
  });
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    dangerouslySetInnerHTML: {
      __html: parsed
    }
  });
};
const defaultText = `# A Title

A [link](https://www.destination.url), some \`inlineCode\` and **bolded text**.

\`\`\`
codeBlock = (arg) => {}
\`\`\`

~~strikethrough~~, _italic_

## A Subtitle

* unordered
* list

> blockquote that
> spans 2 lines

1. ordered
2. list

![](https://picsum.photos/400/200)

A    | nice    | table |
---- | ------- |----   |
with | some    | data  |
and  | another | row   |
`;
function App() {
  const [text, setText] = React.useState(defaultText);
  return /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement(Editor, {
    id: "editor",
    text: text,
    setText: setText
  }), /*#__PURE__*/React.createElement(Preview, {
    id: "preview",
    text: text
  }));
}
ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById('app'));