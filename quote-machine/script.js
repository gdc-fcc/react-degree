import "https://unpkg.com/react@18/umd/react.development.js";
import "https://unpkg.com/react-dom@18/umd/react-dom.development.js";
const quotes = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json").then(x => x.json()).then(x => x.quotes).catch(e => console.error("Error fetching quotes:", e));
function TwitterQuote(quote) {
  const url = `https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote.text.replaceAll(" ", "%20")}%20-%20${quote.author.replaceAll(" ", "%20")}`;
  return /*#__PURE__*/React.createElement("a", {
    id: "tweet-quote",
    href: url,
    target: "_blank"
  }, "Tweet Quote");
}
const RandomQuoteButton = ({
  setState
}) => {
  const updateQuote = () => {
    const index = Math.floor(Math.random() * quotes.length);
    setState({
      quote: quotes[index].quote,
      author: quotes[index].author
    });
  };
  return /*#__PURE__*/React.createElement("button", {
    id: "new-quote",
    onClick: updateQuote
  }, "New Quote");
};
const QuoteMachine = ({}) => {
  const [state, setState] = React.useState({
    quote: quotes[0].quote,
    author: quotes[0].author
  });
  const nchar = state.quote.length;
  const style = nchar > 200 ? {
    fontSize: "1.5rem"
  } : {};
  const style2 = nchar > 200 ? {
    fontSize: "4rem"
  } : {};
  return /*#__PURE__*/React.createElement("div", {
    id: "background"
  }, /*#__PURE__*/React.createElement("div", {
    style: style2,
    id: "bg_text"
  }, state.quote), /*#__PURE__*/React.createElement("div", {
    id: "quote-box"
  }, /*#__PURE__*/React.createElement("div", {
    style: style,
    id: "text"
  }, state.quote), /*#__PURE__*/React.createElement("div", {
    id: "author"
  }, state.author), /*#__PURE__*/React.createElement(RandomQuoteButton, {
    setState: setState
  }), /*#__PURE__*/React.createElement(TwitterQuote, {
    author: state.author,
    text: state.quote
  })));
};
const domContainer = document.querySelector("#quote_container");
const root = ReactDOM.createRoot(domContainer);
root.render(/*#__PURE__*/React.createElement(QuoteMachine, null));
//# sourceMappingURL=script.js.map