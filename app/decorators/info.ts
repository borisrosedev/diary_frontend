export function info(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
      console.log('---------------------------------')
      console.log('target: ', target)
      console.log('---------------------------------')
      console.log('propertyKey: ', propertyKey)
      console.log('---------------------------------')
      console.log('descriptor: ', descriptor)
    };
}