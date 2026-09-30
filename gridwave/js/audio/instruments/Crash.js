import Instrument from './Instrument.js';
/** Prato de ruído filtrado com cauda longa. */
export default class Crash extends Instrument{play(t,p={},out){const c=this.ctx,n=c.createBufferSource(),f=c.createBiquadFilter(),g=c.createGain();n.buffer=this.noise.buffer;f.type='highpass';f.frequency.value=p.filter||5200;g.gain.setValueAtTime(.5,t);g.gain.exponentialRampToValueAtTime(.001,t+(p.decay||2.2));n.connect(f);f.connect(g);g.connect(out);n.start(t);n.stop(t+(p.decay||2.2))}}
