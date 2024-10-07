import { useParams } from "@remix-run/react";
import { useEffect } from "react";
import invariant from "tiny-invariant";
import CustomStorage from "~/services/custom-storage.service";
import UsersService from "~/services/users.service";



const DashboardIndex = () => {
   
    const params = useParams()
    invariant(params.id, "Missing userId param");

    useEffect(() => {

        const apiCall = async() => {
            const user = await UsersService.getUserById(params.id as string, CustomStorage.getSpecificItem("user").token)
            if (!user._id) {
                throw new Response("User Not Found", { status: 404 });
            }
        }

        apiCall()
       
    }, [])
  


    return(
        <main className="app-main dashboard__main">
            <h1>Bienvenue</h1>
        </main>
    )

}

export default DashboardIndex