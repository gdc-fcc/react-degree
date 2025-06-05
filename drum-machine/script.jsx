import 'https://unpkg.com/react@16/umd/react.production.min.js'
import 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js';

const prefix = "https://cdn.freecodecamp.org/testable-projects-fcc/audio/";

const audio_samples = {Q: "Heater-1",W: "Heater-2",E: "Heater-3",A: "Heater-4_1",
  S: "Heater-6",D: "Dsc_Oh",Z: "Kick_n_Hat",X: "RP4_KICK_1",C: "Cev_H2"}

const getSrc = sample => prefix + sample + ".mp3"

const DrumPad = ({letter = "C", setText}) => {
  const id = audio_samples[letter], src = getSrc(id)
  const handleClick = () => {
    setText(id)
    document.querySelector("#" + letter).play()
  }
  return <button class="drum-pad" id={id} 
                 onClick={handleClick}>
      {letter}
      <audio class="clip" id={letter} src={src}/>
    </button>
}

const PadsContainer = ({setText}) => (
  <div className="pads-container">{
    Object.keys(audio_samples).map(letter => {
      return <DrumPad letter={letter} setText = {setText}/>
    })
  }</div>
)

const App = () => {
  const [text, setText] = React.useState('')
  return <div id="drum-machine">
    <PadsContainer setText={setText}/>
    <div id="display">{text}</div>
  </div>
}

ReactDOM.render(<App/>, document.getElementById('app'));

document.addEventListener('keydown', function(event){
  const sample = audio_samples[event.key.toUpperCase()]
  sample ? document.querySelector("#" + sample).click() : null;
})
