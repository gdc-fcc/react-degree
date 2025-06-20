import "https://unpkg.com/react@16/umd/react.production.min.js";
import "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js";

const NumberInput = ({ prefix, get, set, label }) => {
    const ns = (id) => prefix + "-" + id;
    const inc = () => set((x) => (x < 60 ? x + 1 : x));
    const dec = () => set((x) => (x > 1 ? x - 1 : x));
    return (
        <div>
            <label id={ns("label")}>{label}</label>
            <button id={ns("decrement")} onClick={dec}>
                Less
            </button>
            <div id={ns("length")} className="input-value">
                {get}
            </div>
            <button id={ns("increment")} onClick={inc}>
                More
            </button>
        </div>
    );
};

const ShowTime = ({ remainingTime }) => {
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes < 10 ? "0" + minutes : minutes}:${secs < 10 ? "0" + secs : secs}`;
    };
    return <div id="time-left">{formatTime(remainingTime)}</div>;
};

const sixty = 60;
const globals = {};

const App = () => {
    const [breakLength, setBreakLength] = React.useState(5);
    const [sessionLength, setSessionLength] = React.useState(25);
    const [remainingTime, setRemainingTime] = React.useState(25 * sixty);
    const [isRunning, setIsRunning] = React.useState(false);
    const [timer, setTimer] = React.useState(null);
    const [phase, setPhase] = React.useState("Session");

    React.useEffect(() => {
        setRemainingTime(sessionLength * sixty);
    }, [sessionLength]);

    const reset = () => {
        setBreakLength(5);
        setSessionLength(25);
        setIsRunning(false);
        setPhase("Session");
    };

    const toggleTimer = () => {
        setIsRunning((prev) => !prev);
    };

    React.useEffect(() => {
        clearInterval(timer);
        if (isRunning) {
            globals.phase = phase;
            const tmr = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 0) {
                        if (globals.phase === "Session") {
                            globals.phase = "Break";
                            setPhase(globals.phase);
                            return breakLength * sixty;
                        } else {
                            globals.phase = "Session";
                            setPhase(globals.phase);
                            return sessionLength * sixty;
                        }
                    }
                    return prev - 1;
                });
            }, 1000);
            setTimer(tmr);
        }
    }, [isRunning]);

    return (
        <div>
            <h1>25 + 5 Clock</h1>
            <div>
                <NumberInput prefix="break" get={breakLength} set={setBreakLength} label="Break Length" />
                <NumberInput prefix="session" get={sessionLength} set={setSessionLength} label="Session Length" />
            </div>
            <div>
                <label id="timer-label">{phase}</label>
                <ShowTime remainingTime={remainingTime} />
                <button id="start_stop" onClick={toggleTimer}>
                    Start/Stop
                </button>
                <button id="reset" onClick={reset}>
                    Reset
                </button>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
