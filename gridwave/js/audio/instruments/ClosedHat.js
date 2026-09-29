import Instrument from './Instrument.js';
/** Chimbal fechado metálico por seis osciladores inarmônicos. */
export default class ClosedHat extends Instrument{play(t,p={},out){const c=this.ctx,g=c.createGain(),hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=p.filter||7000;g.gain.setValueAtTime(.34,t);g.gain.exponentialRampToValueAtTime(.001,t+.075);hp.connect(g);g.connect(out);for(const hz of [205,311,420,511,624,743]){const o=c.createOscillator();o.type='square';o.frequency.value=hz*5.1;o.connect(hp);o.start(t);o.stop(t+.08)}}}
