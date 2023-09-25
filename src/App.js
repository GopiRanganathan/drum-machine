import React from 'react';
import './App.css';
const firstKit = [{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}];


const secondKit = [{
  keyCode: 81,
  keyTrigger: "Q",
  id: "Chord-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
  keyCode: 87,
  keyTrigger: "W",
  id: "Chord-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
  keyCode: 69,
  keyTrigger: "E",
  id: "Chord-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
  keyCode: 65,
  keyTrigger: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
  keyCode: 83,
  keyTrigger: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
  keyCode: 68,
  keyTrigger: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
  keyCode: 90,
  keyTrigger: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
  keyCode: 88,
  keyTrigger: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
  keyCode: 67,
  keyTrigger: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}];

const soundsName = {
  heaterKit:"Heater Kit",
  smoothPianoKit:"Smooth Piano Kit"
}

const soundsGroup = {
  heaterKit: firstKit,
  smoothPianoKit: secondKit

}

const Keyboardkeys=({play,sound})=>{

  const handleKeyDown=(e)=>{
    if(e.keyCode === sound.keyCode){
      play(sound.keyTrigger,sound.id);
    }
  }
  React.useEffect(()=>{
    document.addEventListener("keydown",handleKeyDown);
  });


return <button className="drum-pad"  id={sound.id} onClick={()=> play(sound.keyTrigger,sound.id)}>
<audio src={sound.url} className="clip" id={sound.keyTrigger} ></audio>
{sound.keyTrigger}
</button>

}
const Keyboard=({play,sounds,power})=>{

  return power? sounds.map((sound)=>{
    return <Keyboardkeys play={play} sound={sound}/>
  })
  : sounds.map((sound)=>{
    return <Keyboardkeys play={play} sound={{...sound, url:"#" }} />
  })
}

const Drumcontrols=({changeSoundKit, kit,name, volume, handleVolumeChange, power, stop, powerKey})=>{
  return <div className="controls">
    <h2>Drum Machine</h2>
    <div className="button">
      <button className='power' onClick={stop} ref={powerKey}></button>
      <h3>Power</h3>
    </div>
    <div id="display">{name}</div>
    <input type="range" min="0" max="1" step="0.01" value={volume} onChange={handleVolumeChange} class="volume" />
    <div className="button">
    <button onClick={changeSoundKit} className="kit" ref={kit}></button>
    <h3>Band</h3>
    </div>
    
  </div>
}

function App() { 
const kit = React.useRef(null);
const powerKey = React.useRef(null);

  const [power,setPower] = React.useState(true);
  const [volume,setVolume] = React.useState(1);
  const [soundName,setSoundName]=React.useState("");
  const [soundType,setSoundType]= React.useState("heaterKit");
  const [sounds,setSounds]= React.useState(soundsGroup[soundType]);

  const play=(key,id)=>{
    const audio=document.getElementById(key);
    audio.currentTime=0;
    audio.play();
    setSoundName(id);

  }
  const stop=()=>{
    setPower(!power); 
    setSoundName("");
    if (powerKey.current) {
      powerKey.current.classList.toggle("select");
    }
  }
  const handleVolumeChange=(e)=>{
    setVolume(e.target.value);
    setSoundName(" volume : " + Math.floor(e.target.value * 100));
  }
  const setKeyVolume=()=>{
    const audios=sounds.map(sound => document.getElementById(sound.keyTrigger));
    audios.forEach(audio => {
      if(audio){
        audio.volume=volume;
      }
    });

  }
  const changeSoundKit=()=>{
  if(soundType ==="heaterKit"){
    setSoundType("smoothPianoKit");
    setSounds(soundsGroup.smoothPianoKit);
  }
  else{
    setSoundType("heaterKit");
    setSounds(soundsGroup.heaterKit);
  }
  console.log("buttonclicked");
setSoundName(soundsName[soundType]);
  if (kit.current) {
    kit.current.classList.toggle("select");
  }


  }

  return (
    <div className="App" id="drum-machine">
      {setKeyVolume()}
      <div class="keyboard"><Keyboard play={play} sounds={sounds} power={power}/></div>
      <Drumcontrols changeSoundKit={changeSoundKit} name={soundName} handleVolumeChange={handleVolumeChange} volume={volume} power={power} powerKey={powerKey} stop={stop} kit={kit}/>
    </div>
  );
}

export default App;
