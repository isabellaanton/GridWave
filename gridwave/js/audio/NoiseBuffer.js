/** Cria uma única fonte de ruído reutilizável por instrumento. */
export default class NoiseBuffer{constructor(context){this.buffer=context.createBuffer(1,context.sampleRate*2,context.sampleRate);const d=this.buffer.getChannelData(0);for(let i=0;i<d.length;i++)d[i]=Math.random()*2-1}}
