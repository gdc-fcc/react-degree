import "https://unpkg.com/react@16/umd/react.production.min.js";
import "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js";
const audio_samples = {
  Q: "Heater-1",
  W: "Heater-2",
  E: "Heater-3",
  A: "Heater-4_1",
  S: "Heater-6",
  D: "Dsc_Oh",
  Z: "Kick_n_Hat",
  X: "RP4_KICK_1",
  C: "Cev_H2"
};
const getSrc = sample => "https://cdn.freecodecamp.org/testable-projects-fcc/audio/" + sample + ".mp3";
const DrumPad = ({
  pad
}) => {
  const {
      letter,
      ref,
      sampleId
    } = pad,
    src = getSrc(sampleId),
    audio = React.useRef(null);
  const handleClick = () => {
    pad.updateDisplay();
    audio.current.play();
  };
  return /*#__PURE__*/React.createElement("button", {
    className: "drum-pad",
    id: sampleId,
    ref: ref,
    onClick: handleClick
  }, letter, /*#__PURE__*/React.createElement("audio", {
    className: "clip",
    id: letter,
    src: src,
    ref: audio
  }));
};
const PadsContainer = ({
  pads
}) => /*#__PURE__*/React.createElement("div", {
  className: "pads-container"
}, pads.map(pad => /*#__PURE__*/React.createElement(DrumPad, {
  pad: pad,
  key: pad.letter
})));
const App = () => {
  const [text, setText] = React.useState("");
  const pads = Object.entries(audio_samples).map(([letter, sampleId]) => ({
    letter,
    sampleId,
    ref: React.createRef(),
    updateDisplay: () => setText(sampleId)
  }));
  const handleKeyDown = event => {
    const pad = pads.find(pad => pad.letter === event.key.toUpperCase());
    pad ? pad.ref.current.click() : null;
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "drum-machine",
    onKeyDown: handleKeyDown,
    tabIndex: "0"
  }, /*#__PURE__*/React.createElement(PadsContainer, {
    pads: pads
  }), /*#__PURE__*/React.createElement("div", {
    id: "display"
  }, text));
};
ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById("app"));
//# sourceMappingURL=script.js.map