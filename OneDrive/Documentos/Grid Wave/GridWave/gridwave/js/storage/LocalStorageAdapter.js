import StorageAdapter from './StorageAdapter.js';
/** Persistência local tolerante a bloqueio ou quota indisponível. */
export default class LocalStorageAdapter extends StorageAdapter{load(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch(error){console.warn('Não foi possível carregar dados locais.',error);return null}}save(key,data){try{localStorage.setItem(key,JSON.stringify(data));return true}catch(error){console.warn('Não foi possível salvar dados locais.',error);return false}}}
