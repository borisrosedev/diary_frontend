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
        console.log("propertyName", propertyName)
        let method = descriptor.value!;

        descriptor.value = function (...argv: any[]) {
      
            let parametersToFormatIndexes: number[] = Reflect.getOwnMetadata(formatMetadataKey, target, propertyName);
            
            for(const index of parametersToFormatIndexes){ 
                const valuesArray = {...argv[index]} 
                argv[index] = editSymbolicObject(valuesArray, "Symbol(state)", "email", "lower")  
            } 
            return method.apply(this, argv);
        };
    }
      
}


