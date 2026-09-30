import Kit808 from './kits/Kit808.js';import Kit909 from './kits/Kit909.js';import KitLinn from './kits/KitLinn.js';
/** Resolve kit pelo identificador, sem ramificações no mecanismo de áudio. */
export default class KitRegistry{constructor(){this.kits=new Map([['808',new Kit808()],['909',new Kit909()],['linn',new KitLinn()]])} /** Registra um kit compatível com getParams. */ register(id,kit){this.kits.set(id,kit)} /** Retorna parâmetros para a trilha. */ getParams(kitId,trackId){return this.kits.get(kitId)?.getParams(trackId)||{}}}
