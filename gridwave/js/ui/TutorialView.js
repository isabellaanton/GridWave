/** Apresenta tutorial de boas-vindas apenas na primeira visita. */
export default class TutorialView{constructor(dialog,storage){this.dialog=dialog;this.storage=storage}show(){if(!this.storage.load('gridwave-tutorial')){this.dialog.showModal();this.dialog.addEventListener('close',()=>this.storage.save('gridwave-tutorial',true),{once:true})}}}
