import { Link, redirect, useNavigate, useNavigation } from "@remix-run/react"
import { useState } from "react";
import ClientSideForm from "~/components/ClientSideForm";
import AuthService from "~/services/auth.service";
import WebsocketService from "~/services/websocket.service";


export default function ConnectionLogin () {

  const [formFields, setFormFields] = useState({}) as any
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState("")

  const submitHandler = async(e:any) => {
    e.preventDefault()
    console.log("handling")
    const response = await AuthService.login(formFields)
    if(response.id) {
      const wsService = WebsocketService.getInstance()
      wsService.sendEvent("users", {message: "➕ 1 utilisateur connecté"})
      navigate(`/dashboard/${response.id}`)
    } else {
        setErrorMessage("⛔️ Erreur lors de la connexion : " + response.message)
    }
  }

  const resetHandler = (e:any) => {
    setFormFields({})
  }

  const inputHandler = (e:any, name:string) => {
    setFormFields({ ...formFields, [name]: e.target.value})
  }

  
  const formData = {
      id: "login-form",
      action : "",
      fields: [
        {
          id: "email",
          placeholder: "Entrer votre email"
        },
        {
          id: "password",
          placeholder: "Entrez votre mot de passe"
        }
      ],
      buttons: [
        {
          id: "login-submit-button",
          type: "submit",
          styles: "button form-button",
          textContent: "Valider"
        },
        {
          type: "reset",
          styles: "button form-button",
          textContent: "Réinitialiser"
        }
      ]
  }



  return (
    <main className="app-main login__main">
      <section className="login__form-section">
        <ClientSideForm id={formData.id} fields={formData.fields} buttons={formData.buttons} submitHandler={submitHandler}  inputHandler={inputHandler} resetHandler={resetHandler} />
        <small>Pas encore inscrit(e) - Cliquez <Link to={"/connection/register"}>ici</Link></small>
        {errorMessage ? <small>{errorMessage} </small> : ""}
      </section>
    </main> 
  )
}