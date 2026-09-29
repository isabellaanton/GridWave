import tracks from './config/tracks.js';
import {DEFAULT_BPM,MIN_BPM,MAX_BPM} from './config/constants.js';
import EventBus from './core/EventBus.js';import AudioEngine from './audio/AudioEngine.js';import KitRegistry from './audio/KitRegistry.js';import ChannelStrip from './audio/ChannelStrip.js';import Pattern from './sequencer/Pattern.js';import Scheduler from './sequencer/Scheduler.js';import Transport from './sequencer/Transport.js';import MixerState from './mixer/MixerState.js';import Recorder from './recording/Recorder.js';import LocalStorageAdapter from './storage/LocalStorageAdapter.js';import TopBarView from './ui/TopBarView.js';import MixerView from './ui/MixerView.js';import SequencerView from './ui/SequencerView.js';import TutorialView from './ui/TutorialView.js';import ShortcutsController from './ui/ShortcutsController.js';
import Kick from './audio/instruments/Kick.js';import Snare from './audio/instruments/Snare.js';import Clap from './audio/instruments/Clap.js';import ClosedHat from './audio/instruments/ClosedHat.js';import OpenHat from './audio/instruments/OpenHat.js';import Tom from './audio/instruments/Tom.js';import Crash from './audio/instruments/Crash.js';

/** Composition root: único ponto que instancia e conecta implementações concretas. */
const bus=new EventBus(),storage=new LocalStorageAdapter(),engine=new AudioEngine(),context=engine.context;
const pattern=new Pattern(tracks.map(t=>t.id));
// Demonstração: bumbo a cada quatro passos, caixa nos tempos 2 e 4, chimbal em contratempo.
for(const step of [0,4,8,12])pattern.toggle('kick',step);for(const step of [4,12])pattern.toggle('snare',step);for(const step of [2,6,10,14])pattern.toggle('chh',step);
const saved=storage.load('gridwave-state');if(saved?.pattern)pattern.load(saved.pattern);
const mixer=new MixerState(tracks.map(t=>t.id));mixer.load(saved?.mixer);
const strips=Object.fromEntries(tracks.map(t=>[t.id,new ChannelStrip(context,engine.masterGain)]));
const instruments={kick:new Kick(context,engine.noise),snare:new Snare(context,engine.noise),clap:new Clap(context,engine.noise),chh:new ClosedHat(context,engine.noise),ohh:new OpenHat(context,engine.noise),tom:new Tom(context,engine.noise),lowtom:new Tom(context,engine.noise),crash:new Crash(context,engine.noise)};
const kits=new KitRegistry();let kit=saved?.kit||'808',swing=saved?.swing||0;
const scheduler=new Scheduler({context,pattern,tracks,instruments,strips,kitRegistry:kits,getKit:()=>kit,getBpm:()=>transport.bpm,getSwing:()=>swing,onStep:event=>{stepQueue.push(event);bus.emit('step',event)},onChoke:time=>instruments.ohh.choke(time)});
const transport=new Transport(scheduler,bus);transport.setBpm(Math.max(MIN_BPM,Math.min(MAX_BPM,saved?.bpm||DEFAULT_BPM)));
const topbar=new TopBarView(document.querySelector('#topbar'),{
  play:async()=>{await engine.resume();transport.toggle()},stop:()=>{transport.stop();stepQueue.length=0;seq.setPlayhead(-1)},
  record:()=>{if(recorder.recorder?.state==='recording')recorder.stop();else{engine.resume().then(()=>recorder.start())}},
  clear:()=>{if(confirm('Limpar todos os passos do padrão?'))pattern.clear()},kit:value=>{kit=value;persist()},
  bpm:value=>{transport.setBpm(value);persist()},swing:value=>{swing=value;persist()},master:value=>{engine.masterGain.gain.value=value;persist()}
},{ });
const mixerView=new MixerView(document.querySelector('#mixer'),tracks,{
 mix:(id,key,value)=>{mixer.setMix(id,key,value);strips[id][key==='level'?'setLevel':'setPan'](value);applyAudibility();persist()},
 toggle:(id,kind,value)=>{kind==='mute'?mixer.setMute(id,value):mixer.setSolo(id,value);applyAudibility();persist()}
});
const seq=new SequencerView(document.querySelector('#sequencer'),tracks,pattern,{
 toggle:(id,step,value)=>{pattern.toggle(id,step,value);persist()},random:randomize
});
seq.sync();
const savedMix=saved?.mixer||{};for(const [id,c]of Object.entries(savedMix)){if(strips[id]){strips[id].setLevel(c.level??1);strips[id].setPan(c.pan??0)}}
applyAudibility();mixerView.setValues(mixer.serialize());
const stepQueue=[];let animationFrame=0;function animate(){if(!transport.playing){animationFrame=0;return}const now=context.currentTime;let latest=-1;while(stepQueue.length&&stepQueue[0].time<=now+.003)latest=stepQueue.shift().step;if(latest>=0){seq.setPlayhead(latest);transport.step=(latest+1)%16}animationFrame=requestAnimationFrame(animate)}
bus.on('transport:play',()=>{topbar.setPlaying(true);if(!animationFrame)animationFrame=requestAnimationFrame(animate)});bus.on('transport:pause',()=>topbar.setPlaying(false));bus.on('transport:stop',()=>{topbar.setPlaying(false);seq.setPlayhead(-1)});
const recorder=new Recorder(engine.recordingDestination,v=>topbar.setRecording(v));
const tutorial=new TutorialView(document.querySelector('#tutorial'),storage);tutorial.show();new ShortcutsController({play:async()=>{await engine.resume();transport.toggle()},clear:()=>{if(confirm('Limpar todos os passos do padrão?'))pattern.clear()},record:()=>{if(recorder.recorder?.state==='recording')recorder.stop();else{engine.resume().then(()=>recorder.start())}}});
pattern.onChange=()=>{seq.sync();persist()};
function applyAudibility(){for(const [id,c]of Object.entries(mixer.channels)){strips[id].setLevel(c.level);strips[id].setPan(c.pan);strips[id].setAudible(mixer.isAudible(id))}}
function randomize(){pattern.clear();for(const step of [0,4,8,12])if(Math.random()<.88)pattern.toggle('kick',step);for(const step of [4,12])if(Math.random()<.8)pattern.toggle('snare',step);for(let i=0;i<16;i++){if(i%2===1&&Math.random()<.78)pattern.toggle('chh',i);if(i%4===2&&Math.random()<.35)pattern.toggle('clap',i)}for(const step of [6,14])if(Math.random()<.35)pattern.toggle('ohh',step);persist()}
function persist(){storage.save('gridwave-state',{pattern:pattern.serialize(),bpm:transport.bpm,kit,swing,master:engine.masterGain.gain.value,mixer:mixer.serialize()})}
setInterval(()=>{for(const t of tracks)mixerView.setMeter(t.id,strips[t.id].getMeter())},70);
topbar.setValues({bpm:transport.bpm,kit,swing,master:saved?.master??.8});if(saved?.master!=null)engine.masterGain.gain.value=saved.master;
