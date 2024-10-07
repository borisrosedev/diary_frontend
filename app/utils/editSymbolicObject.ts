
export default function editSymbolicObject(obj: any, symbol: string = 'Symbol(state)',targettedPropertyName: string, action: string){
  
      
      const stateSymbol = Object.getOwnPropertySymbols(obj).find(sym => sym.toString() === symbol);
      
      if (stateSymbol) {
        const stateArray = obj[stateSymbol];
        
        const field = stateArray.find((f:any) => f.name === targettedPropertyName);
        
        if (field) {
          if(action === "lower"){
            field.value = field.value.toLowerCase()
          }
        }
      }
      
     return { ...obj }
}
