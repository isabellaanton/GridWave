/** Parâmetros 909: transientes brilhantes e graves firmes. */
export default class Kit909{getParams(id){return ({kick:{freq:190},snare:{filter:1900,body:205},clap:{filter:2100},chh:{filter:9000},ohh:{filter:8000,decay:.34},tom:{start:250,end:115},lowtom:{start:160,end:68},crash:{filter:6200,decay:1.8}})[id]||{}}}
