import { enumerable } from "~/decorators/enumerable"
import { info } from "~/decorators/info"




export default class FormatService {

    static checkName(name: string): boolean {
        const pattern = new RegExp(/^[a-z\-\ ]{2, 30}$/, 'gi')
        return pattern.test(name)
    }

    static checkPassword(password: any): boolean {
        const pattern = new RegExp(/^[a-z0-9]{12, 20}$/, 'gi')
        const isPasswordFormatValid = pattern.test(password)
        if(!isPasswordFormatValid){
            return false
        }

        let hasUpperCaseChar = false
        let hasSpecialChar = false

        for(const index in password) {
            if(password[index] == password[index].toUpperCase()){
                hasUpperCaseChar = true
            }

            if(password[index] == "?" || password[index] == "!" || password[index] == "*"  || password[index] == "$") {
                hasSpecialChar = false
            }

            if((Number(index) == password.length - 1) && !hasSpecialChar && !hasUpperCaseChar){
                return false
            }
        }

        return true
    
    }


    static checkEmail(email: string): boolean {
        const pattern = new RegExp(/^[a-z0-0\.]{2, 30}[@]{1}[a-z0-9]{2,6}[.]{1}[a-z]{3,6}$/, 'gi')
        return pattern.test(email)
    }


}