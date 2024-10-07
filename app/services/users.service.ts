import tryCatch from "../utils/tryCatch"
import FormatService from "./format.service"
import convertSymbolicObject from "~/utils/convertSymbolicObject"

class UsersService {

    static async createOne(formData:any) {
        
        const convertedData = convertSymbolicObject(formData, "Symbol(state)")
    
        const { firstname, lastname, email, password } = convertedData

        console.log("converted data", convertedData)
        if(! (firstname && lastname && email && password)) {
            return "Données manquantes"
        }

        if( ! (FormatService.checkName(firstname) && FormatService.checkEmail(email) && FormatService.checkName(lastname) && FormatService.checkPassword(password) )) {
            return "Format des données invalide"
        }

        const result = await tryCatch(async() => {
            const result = await fetch("http://localhost:3001/api/v1/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email: email.toLowerCase(), password, firstname, lastname })   
            })
            const jsResponse = await result.json()
            return jsResponse
        }, "⛔️ Error while inserting data in the db")

        console.log("result", result)
        return result
    }

    static async getAllUsers() {
        const result = await tryCatch(async() => {
            const result = await fetch("http://localhost:3001/api/v1/users", {
                method: "GET",    
            })
            const users = await result.json()
            return users
        })

        return result
    }

    static async getUserById(id: string, token: string){
        console.log(id, token)
        const result = await tryCatch(async() => {
            const result = await fetch("http://localhost:3001/api/v1/users/"+id, {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            })
            const user = await result.json()
            return user
        })

        return result
    }
}

export default UsersService