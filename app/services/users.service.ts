import { format, formatted } from "~/decorators/formatted"
import tryCatch from "../utils/tryCatch"
import FormatService from "./format.service"
import { enumerable } from "~/decorators/enumerable"

class UsersService {

    @format("register")
    @enumerable(true)
    static async createOne(@formatted data:any) {
        
        const { firstname, lastname, email, password } = data
        
        if(! (firstname && lastname && email && password)) {
            return "Données manquantes"
        }

        if( ! (FormatService.checkName(firstname) && FormatService.checkEmail(email) && FormatService.checkName(lastname) )) {
            return "Format des données invalide"
        }

        const result = await tryCatch(async() => {
            const result = await fetch("http://localhost:3001/api/v1/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password, firstname, lastname })   
            })
            const jsResponse = await result.json()
            return jsResponse
        }, "⛔️ Error while inserting data in the db")

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

        const result = await tryCatch(async() => {
            const result = await fetch("http://localhost:3000/api/v1/users", {
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