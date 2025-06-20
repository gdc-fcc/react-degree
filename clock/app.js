import "https://unpkg.com/react@16/umd/react.production.min.js";
import "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js";
const NumberInput = ({
  prefix,
  get,
  set,
  label
}) => {
  const ns = id => prefix + "-" + id;
  const inc = () => set(x => x < 60 ? x + 1 : x);
  const dec = () => set(x => x > 1 ? x - 1 : x);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    id: ns("label")
  }, label), /*#__PURE__*/React.createElement("button", {
    id: ns("decrement"),
    onClick: dec
  }, "Less"), /*#__PURE__*/React.createElement("div", {
    id: ns("length"),
    className: "input-value"
  }, get), /*#__PURE__*/React.createElement("button", {
    id: ns("increment"),
    onClick: inc
  }, "More"));
};
const ShowTime = ({
  remainingTime
}) => {
  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes < 10 ? "0" + minutes : minutes}:${secs < 10 ? "0" + secs : secs}`;
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "time-left"
  }, formatTime(remainingTime));
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
  const audio = React.useRef();
  React.useEffect(() => {
    setRemainingTime(sessionLength * sixty);
  }, [sessionLength]);
  const reset = () => {
    setBreakLength(5);
    setSessionLength(25);
    setIsRunning(false);
    setPhase("Session");
    audio.current.pause();
    audio.current.currentTime = 0;
  };
  const toggleTimer = () => {
    setIsRunning(prev => !prev);
  };
  React.useEffect(() => {
    clearInterval(timer);
    if (isRunning) {
      globals.phase = phase;
      const tmr = setInterval(() => {
        setRemainingTime(prev => {
          if (prev <= 0) {
            audio.current.play();
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
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "25 + 5 Clock"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(NumberInput, {
    prefix: "break",
    get: breakLength,
    set: setBreakLength,
    label: "Break Length"
  }), /*#__PURE__*/React.createElement(NumberInput, {
    prefix: "session",
    get: sessionLength,
    set: setSessionLength,
    label: "Session Length"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    id: "timer-label"
  }, phase), /*#__PURE__*/React.createElement(ShowTime, {
    remainingTime: remainingTime
  }), /*#__PURE__*/React.createElement("button", {
    id: "start_stop",
    onClick: toggleTimer
  }, "Start/Stop"), /*#__PURE__*/React.createElement("button", {
    id: "reset",
    onClick: reset
  }, "Reset")), /*#__PURE__*/React.createElement("audio", {
    id: "beep",
    preload: "auto",
    src: "https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav",
    ref: audio
  }));
};
ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
//# sourceMappingURL=app.js.map