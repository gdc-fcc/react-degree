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

const DrumPad = ({ pad }) => {
    const { letter, ref, sampleId } = pad,
        src = getSrc(sampleId),
        audio = React.useRef(null);
    const handleClick = () => {
        pad.updateDisplay();
        audio.current.play();
    };
    return (
        <button className="drum-pad" id={sampleId} ref={ref} onClick={handleClick}>
            {letter}
            <audio className="clip" id={letter} src={src} ref={audio} />
        </button>
    );
};

const PadsContainer = ({ pads }) => (
    <div className="pads-container">
        {pads.map((pad) => (
            <DrumPad pad={pad} key={pad.letter}/>
        ))}
    </div>
);

const App = () => {
    const [text, setText] = React.useState("");
    const pads = Object.entries(audio_samples).map(([letter, sampleId]) => ({
        letter,
        sampleId,
        ref: React.createRef(),
        updateDisplay: () => setText(sampleId),
    }));
    const handleKeyDown = (event) => {
        const pad = pads.find((pad) => pad.letter === event.key.toUpperCase());
        pad ? pad.ref.current.click() : null;
    };
    return (
        <div id="drum-machine" onKeyDown={handleKeyDown} tabIndex="0">
            <PadsContainer pads={pads} />
            <div id="display">{text}</div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("app"));
