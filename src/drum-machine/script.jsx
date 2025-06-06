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
    C: "Cev_H2",
};

const getSrc = (sample) => "https://cdn.freecodecamp.org/testable-projects-fcc/audio/" + sample + ".mp3";

const DrumPad = ({ letter = "C", setText, pads }) => {
    const id = audio_samples[letter],
        src = getSrc(id);
    const audio = React.useRef(null);
    const pad = React.useRef(null);
    pads[letter.toLowerCase()] = pad;
    const handleClick = () => {
        setText(id);
        audio.current.play();
    };
    return (
        <button class="drum-pad" id={id} ref={pad} onClick={handleClick}>
            {letter}
            <audio class="clip" id={letter} src={src} ref={audio} />
        </button>
    );
};

const PadsContainer = ({ setText, pads }) => (
    <div className="pads-container">
        {Object.keys(audio_samples).map((letter) => {
            return <DrumPad letter={letter} setText={setText} pads={pads} />;
        })}
    </div>
);

const App = () => {
    const pads = {};
    const handleKeyDown = (event) => {
        const pad = pads[event.key.toLowerCase()];
        pad ? pad.current.click() : null;
    };
    const [text, setText] = React.useState("");
    return (
        <div id="drum-machine" onKeyDown={handleKeyDown} tabIndex="1">
            <PadsContainer setText={setText} pads={pads} />
            <div id="display">{text}</div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));