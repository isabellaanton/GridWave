import Instrument from './Instrument.js';
/** Tom afinável por parâmetros para tom alto e grave. */
export default class Tom extends Instrument{play(t,p={},out){const c=this.ctx,o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(p.start||190,t);o.frequency.exponentialRampToValueAtTime(p.end||90,t+.22);g.gain.setValueAtTime(.72,t);g.gain.exponentialRampToValueAtTime(.001,t+.38);o.connect(g);g.connect(out);o.start(t);o.stop(t+.4)}}
