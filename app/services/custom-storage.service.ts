
class CustomStorage {

    static getSpecificItem(key:string){
        const item = localStorage.getItem(key)
        if(!item){
            return null
        } 
        return JSON.parse(item)
    }

    static remoteSpecificItem(key:string){
        localStorage.removeItem(key)
        return "item removed"

    }

    static setSpecificItem(key:string, value: any){
        localStorage.setItem(key, JSON.stringify(value))
        return "item set"
    }
}

export default CustomStorage