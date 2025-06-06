import 'https://unpkg.com/react@16/umd/react.production.min.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js';
const prefix = "https://cdn.freecodecamp.org/testable-projects-fcc/audio/";
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
const getSrc = sample => prefix + sample + ".mp3";
const DrumPad = ({
  letter = "C",
  setText,
  pads
}) => {
  const id = audio_samples[letter],
    src = getSrc(id);
  const audio = React.useRef(null);
  const pad = React.useRef(null);
  pads[id] = pad;
  const handleClick = () => {
    setText(id);
    audio.current.play();
  };
  return /*#__PURE__*/React.createElement("button", {
    class: "drum-pad",
    id: id,
    ref: pad,
    onClick: handleClick
  }, letter, /*#__PURE__*/React.createElement("audio", {
    class: "clip",
    id: letter,
    src: src,
    ref: audio
  }));
};
const PadsContainer = ({
  setText,
  pads
}) => /*#__PURE__*/React.createElement("div", {
  className: "pads-container"
}, Object.keys(audio_samples).map(letter => {
  return /*#__PURE__*/React.createElement(DrumPad, {
    letter: letter,
    setText: setText,
    pads: pads
  });
}));
const App = () => {
  const pads = {};
  const handleClick = event => {
    console.log('event!key', event.key);
    const sample = audio_samples[event.key.toUpperCase()];
    sample ? pads[sample].current.click() : null;
  };
  const [text, setText] = React.useState('');
  return /*#__PURE__*/React.createElement("div", {
    id: "drum-machine",
    onKeyDown: handleClick,
    tabIndex: "1"
  }, /*#__PURE__*/React.createElement(PadsContainer, {
    setText: setText,
    pads: pads
  }), /*#__PURE__*/React.createElement("div", {
    id: "display"
  }, text));
};
ReactDOM.render(/*#__PURE__*/React.createElement(App, null), document.getElementById('app'));
//# sourceMappingURL=script.js.map