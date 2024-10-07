import convertSymbolicObject from "~/utils/convertSymbolicObject"
import tryCatch from "../utils/tryCatch"
import CustomStorageService from "./custom-storage.service"

class AuthService {

    static async login(formData:any) {

    console.log("formData", formData)
       const result = await tryCatch(async() => {
            const result = await fetch("http://localhost:3001/api/v1/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",       
                },
                body: JSON.stringify(formData)
            })
            const jsResponse = await result.json()
            return jsResponse
        })

        if(!("token" in result && "id" in result)){
            return result
        } else {
            CustomStorageService.setSpecificItem("user", { token: result.token, id: result.id})
            return result
        }

    }

    static async logout(){
        CustomStorageService.remoteSpecificItem("user")
    }
}

export default AuthService