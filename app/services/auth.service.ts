import tryCatch from "../utils/tryCatch"
import CustomStorageService from "./custom-storage.service"

class AuthService {

    static async login(data:any) {
       const result = await tryCatch(async() => {
            const result = await fetch("http://localhost:3000/api/v1/users/login")
            const jsResponse = await result.json()
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