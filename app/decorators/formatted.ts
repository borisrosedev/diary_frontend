import "reflect-metadata";

import { formatMetadataKey } from "~/symbols";
import editSymbolicObject from "~/utils/editSymbolicObject";

 
export function formatted(target: Object, 
    propertyKey: string | symbol, 
    parameterIndex: number) {

    let existingCheckedParameters: number[] = Reflect.getOwnMetadata(formatMetadataKey, target, propertyKey) || [];
    existingCheckedParameters.push(parameterIndex as number);
    Reflect.defineMetadata( formatMetadataKey, existingCheckedParameters, target, propertyKey);
}

export function format(context:string){

    return function(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<any>) {
        let method = descriptor.value!;

        descriptor.value = function (...argv: any[]) {
      
            let parametersToFormatIndexes: number[] = Reflect.getOwnMetadata(formatMetadataKey, target, propertyName);
            
            for(const index of parametersToFormatIndexes){ 
                const valuesArray = {...argv[index]} 
                const result = editSymbolicObject(valuesArray, "Symbol(state)", "email", "lower") as { obj: any, symbol: Symbol}
                argv[index]["0"] = result
                console.log("argv", argv)
            } 
            return method.apply(this, argv);
        };
    }
      
}


