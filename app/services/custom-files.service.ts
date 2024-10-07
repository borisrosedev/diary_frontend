import tryCatch from "../utils/tryCatch"
import FormatService from "./format.service"
import convertSymbolicObject from "~/utils/convertSymbolicObject"

class CustomFilesService {

    static async postOne(formData:any) { 
        const result = await tryCatch(async() => {
            const result = await fetch("http://localhost:3001/api/v1/files/image", {
                method: "POST",
                body: formData  
            })
            const jsResponse = await result.json()
            return jsResponse
        }, "⛔️ Error while inserting data in the db")

        console.log("result", result)
        return result
    }

}
   


export default CustomFilesService