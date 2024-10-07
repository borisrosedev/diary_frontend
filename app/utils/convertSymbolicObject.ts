
export default function convertSymbolicObject(symbolicObject: any, symbol: string = 'State(state)') {

    const stateSymbol = Object.getOwnPropertySymbols(symbolicObject).find(sym => sym.toString() === symbol) 
    if(stateSymbol){
        const stateArray = symbolicObject[stateSymbol]
        let obj = Object.assign({})
        for(const el of stateArray){
            obj[el.name] = el.value
        }
        return obj
    } else {
        return "symbol missing in the object"
    }
}
