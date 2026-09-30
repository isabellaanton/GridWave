/** Parâmetros Linn: caixa suave, hats escuros e caudas curtas. */
export default class KitLinn{getParams(id){return ({kick:{freq:125},snare:{filter:900,body:155},clap:{filter:1000},chh:{filter:5600},ohh:{filter:5000,decay:.27},tom:{start:180,end:82},lowtom:{start:115,end:50},crash:{filter:4300,decay:1.4}})[id]||{}}}
