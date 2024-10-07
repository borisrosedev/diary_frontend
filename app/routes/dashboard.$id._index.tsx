import { Form, redirect, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import invariant from "tiny-invariant";
import CustomButton from "~/components/CustomButton";
import CustomForm from "~/components/CustomForm";
import AuthService from "~/services/auth.service";
import CustomFilesService from "~/services/custom-files.service";
import CustomStorage from "~/services/custom-storage.service";
import UsersService from "~/services/users.service";
import WebsocketService from "~/services/websocket.service";



const DashboardIndex = () => {
    const params = useParams()
    const navigate = useNavigate()
    invariant(params.id, "Missing userId param");
    const [user, setUser] = useState({} as any) 
    const [counter, setCounter] = useState(0)
    const [errorMessage, setErrorMessage] = useState("")
    const [fileFormData, setFileFormData] = useState() as any
    useEffect(() => {

        if(counter < 1){
            const apiCall = async() => {
                const userFromDB = await UsersService.getUserById(params.id as string, CustomStorage.getSpecificItem("user").token)
                const wsService = WebsocketService.getInstance()
                if (!userFromDB._id) {
                    setErrorMessage("Erreur lors de la communication avec le base de données")
                    setErrorMessage("Redirection...")
                    AuthService.logout()
                    setTimeout(() => {
                        redirect("/connection")
                    }, 3000)
             
                } else {
                    setUser({...userFromDB})
                    wsService.sendEvent("users", { message: `${user.firstname.charAt(0).toUpperCase()}${user.firstname.slice(1)}  ${user.lastname} is online` })    
                    setCounter(1)
                }

           
            }
            apiCall()

        }
     
    }, [])
  

    const submitPhotoFormHandler = (e: any) => {
        e.preventDefault()
        CustomFilesService.postOne(fileFormData)
    }

    const changeFileHandler = (e:any) => {
        console.log(e.target.files[0])
        const formData = new FormData()  
        formData.append("singleFile", e.target.files[0])
        setFileFormData(formData)
    }



    return(
        <main className="app-main dashboard__main">
            {user._id ?
                
            <section className="dashboard__section">
                <section className="dashboard__news-section">
                    <h1>Bienvenue {user.firstname.charAt(0).toUpperCase()}{user.firstname.slice(1)} </h1> 
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet sequi praesentium nihil debitis incidunt, harum fuga beatae maiores dolores maxime consequuntur magnam molestias assumenda nesciunt quisquam officiis. Id, ullam inventore. </p>
                    <section className="dashboard__photo-section">
                        <form encType='multipart/form-data' onSubmit={submitPhotoFormHandler}>
                            <input className="file-input" type="file" name="singleFile" accept="image/png,image/jpeg,image/jpg,image/webp" onChange={changeFileHandler}/>
                            <button>Sauvegarder</button>
                        </form>    
                    </section>  
                </section>
                <section className="dashboard__profile-section">
                    <h2>Compléter votre profil</h2> 
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eveniet sequi praesentium nihil debitis incidunt, harum fuga beatae maiores dolores maxime consequuntur magnam molestias assumenda nesciunt quisquam officiis. Id, ullam inventore. </p> 
                    <section className="dashboard__profile-form-section">
                        <Form action="" method="POST" className="dashboard__profile-form">
                            <section className="dashboard-form__fields-section">
                                <article className="dasboard__profile-field">
                                    <label htmlFor="firstname"></label>
                                    <input type="firsntname" placeholder={user.firstname} />
                                </article>
                                <article className="dasboard__profile-field">
                                    <label htmlFor="lastname"></label>
                                    <input type="lastname" placeholder={user.lastname} />
                                </article>
                                <article className="dasboard__profile-field">
                                    <label htmlFor="email"></label>
                                    <input type="email" placeholder={user.email} />
                                </article>
                                <article className="dasboard__profile-field">
                                    <label htmlFor="password"></label>
                                    <input type="password" placeholder="Nouveau mot de passe" />
                                </article>
                                <article className="dasboard__profile-field">
                                    <label htmlFor="confirmed-password"></label>
                                    <input type="confirmed-password" placeholder="Confirmez le mot de passe" />
                                </article>
                               
                            </section>
                            <section className="dashboard-form__buttons-section">
                                <CustomButton styles={"button"} key={0} textContent="Sauvergarder" type="submit" />
                                <CustomButton styles={"button"} key={1} textContent="Annuler" type="reset" />
                            </section>

                        </Form>
                    </section>

                </section>

            </section>
            :<section className="dashboard__error-section">
                {errorMessage}
            </section>}
        </main>
    )

}

export default DashboardIndex