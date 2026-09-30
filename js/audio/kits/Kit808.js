/** Parâmetros do kit 808: graves arredondados e caudas mais longas. */
export default class Kit808{getParams(id){return ({kick:{freq:145},snare:{filter:1150,body:170},clap:{filter:1300},chh:{filter:7500},ohh:{filter:6800,decay:.5},tom:{start:210,end:95},lowtom:{start:135,end:58},crash:{filter:5000,decay:2.3}})[id]||{}}}
