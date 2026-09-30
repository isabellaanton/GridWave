import Instrument from './Instrument.js';
/** Palmas compostas de rajadas curtas de ruído filtrado. */
export default class Clap extends Instrument{play(t,p={},out){const c=this.ctx;for(let i=0;i<4;i++){const n=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();n.buffer=this.noise.buffer;f.type='bandpass';f.frequency.value=p.filter||1500;g.gain.setValueAtTime(.38,t+i*.012);g.gain.exponentialRampToValueAtTime(.001,t+i*.012+.045);n.connect(f);f.connect(g);g.connect(out);n.start(t+i*.012);n.stop(t+i*.012+.05)}}}
