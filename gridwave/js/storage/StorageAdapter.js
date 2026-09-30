/** Interface de persistência substituível. */
export default class StorageAdapter{load(key){throw new Error('load não implementado')}save(key,data){throw new Error('save não implementado')}}
