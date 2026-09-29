/** Contrato mínimo dos instrumentos sintetizados. */
export default class Instrument{constructor(context,noise){this.ctx=context;this.noise=noise} /** Agenda um som no tempo absoluto informado. */ play(time,params={},destination){throw new Error('Instrument.play deve ser implementado')}}
