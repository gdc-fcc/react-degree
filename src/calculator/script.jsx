import "https://unpkg.com/react@16/umd/react.production.min.js";
import "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js";

const buttons = [
    { symbol: "AC", width: 2, id: "clear" },
    { symbol: "x", width: 1, id: "multiply" },
    { symbol: "/", width: 1, id: "divide" },
    { symbol: "7", width: 1, id: "seven" },
    { symbol: "8", width: 1, id: "eight" },
    { symbol: "9", width: 1, id: "nine" },
    { symbol: "-", width: 1, id: "subtract" },
    { symbol: "4", width: 1, id: "four" },
    { symbol: "5", width: 1, id: "five" },
    { symbol: "6", width: 1, id: "six" },
    { symbol: "+", width: 1, id: "add" },
    { symbol: "1", width: 1, id: "one" },
    { symbol: "2", width: 1, id: "two" },
    { symbol: "3", width: 1, id: "three" },
    { symbol: ".", width: 1, id: "decimal" },
    { symbol: "0", width: 2, id: "zero" },
    { symbol: "=", width: 2, id: "equals" },
];

const Button = ({ set, num, width, id }) => {
    num = num.toString();
    const style = {
        height: "3rem",
        background: "grey",
        cursor: "pointer",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeigt: 800,
        fontSize: "2rem",
    };
    if (width === 2) {
        style.gridColumn = "span 2";
    }
    const handleClick = (_) => set(num);
    return (
        <div className="key" style={style} onClick={handleClick} id={id}>
            {num}
        </div>
    );
};

const Grid = ({ children }) => {
    const style = { display: "grid", gap: ".2rem", gridTemplateColumns: "repeat(4, 1fr)" };
    return <div style={style}>{children}</div>;
};

const App = () => {
    const [text, setText] = React.useState("0");
    const handleInput = (input) => {
        if (input === "=") return setText((text) => eval(text.replaceAll("x", "*")));
        if (input === "AC") setText((_) => "0");
        else
            setText((text) => {
                input = input === "*" ? "x" : input
                let ret = text === "0" ? input : text + input;
                const lastTwo = ret.slice(ret.length - 2);
                const last = ret[ret.length - 1];
                if (/[+\-x/]-[\-+x/]$/.test(ret)) {
                    ret = ret.slice(0, ret.length - 3) + last;
                } else if (lastTwo === ".." || lastTwo === "-+" || lastTwo === "+x"
                    || lastTwo === "x/" || lastTwo === "/x" || lastTwo == "++"
                ) {
                    ret = ret.slice(0, ret.length - 2) + last;
                } else if (/\.[0-9]*\.$/.test(ret)) {
                    ret = ret.slice(0, ret.length - 1);
                }
                return ret;
            });
    };
    return (
        <div id="calculator" style={{ marginTop: "4rem" }}>
            <div id="display" style={{ textAlign: "right" }}>
                {text}
            </div>
            <Grid>
                {buttons.map((el) => {
                    return <Button set={handleInput} num={el.symbol} width={el.width} id={el.id} />;
                })}
            </Grid>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
